import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { getRecommendations } from '../services/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [mood, setMood] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (movies.length > 0 && !loading) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [movies, loading]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      // 1.5 second artificial delay to show off the cool scanner animation
      const [data] = await Promise.all([
        getRecommendations(mood),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
      setMovies(data.movies || []);
      setGenres(data.genres || []);
    } catch (err) {
      setError('Connection interrupted. Retrying satellite link...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-netflix-red selection:text-white">
      {/* Cinematic Grain Overlay */}
      <div className="bg-grain"></div>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-netflix-red/20 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 px-6 max-w-5xl mx-auto text-center space-y-8">
          
          {/* REMOVED: The "AI-Powered Curation" badge was here */}
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Your Mood. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-netflix-red via-red-500 to-orange-500">
              Our Masterpiece.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Break free from the algorithm. Describe your exact vibe, and let our AI director curate a personalized cinema lineup just for you.
          </p>

          {/* Modern Input Field */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mt-12 group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-netflix-red to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-black rounded-lg p-2 border border-white/10">
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="Ex: 'thrilling movies...'"
                className="flex-1 bg-transparent text-white px-4 py-3 text-lg placeholder-gray-500 focus:outline-none"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-netflix-red hover:bg-red-600 text-white px-8 py-3 rounded-md font-bold transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                {loading ? 'Analyzing...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* THE "BIG RED SCROLLER" (Scanner Effect) */}
      {loading && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="relative w-full max-w-3xl h-64 border-x border-netflix-red/30 bg-gradient-to-b from-transparent via-netflix-red/5 to-transparent overflow-hidden">
            {/* The Laser Line */}
            <div className="w-full h-1 bg-netflix-red shadow-[0_0_30px_rgba(229,9,20,0.8)] animate-scan absolute top-0"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-netflix-red font-mono text-xl tracking-[0.5em] animate-pulse">
                SCANNING DATABASE...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div ref={resultsRef} className="relative z-20 max-w-[1800px] mx-auto px-6 py-20 min-h-screen">
        {movies.length > 0 && !loading && (
          <div className="space-y-12">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Curated For You</h2>
                <p className="text-gray-400">Based on: <span className="text-white italic">"{mood}"</span></p>
              </div>
              <div className="flex gap-2">
                {genres.map((g, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-bold text-netflix-red border border-netflix-red/30 rounded-full bg-netflix-red/10 uppercase tracking-wider">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Movies Grid with Staggered Animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {movies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${index * 100}ms` }} // Stagger effect
                >
                  <MovieCard movie={movie} genres={genres} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;