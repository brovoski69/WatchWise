import React, { useState } from 'react';
import { Star, Plus, Check, Play } from 'lucide-react';
import { addToFavourites } from '../services/api';

const MovieCard = ({ movie, genres }) => {
  const [added, setAdded] = useState(false);
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleFavourite = async (e) => {
    e.stopPropagation();
    if(added) return;
    try {
      const genreString = Array.isArray(genres) ? genres.join(', ') : 'Unknown';
      await addToFavourites({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        genre: genreString
      });
      setAdded(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group relative w-full bg-[#181818] rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-netflix-red/20">
      
      {/* Poster Image */}
      <div className="aspect-[2/3] w-full relative overflow-hidden">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg leading-tight mb-2 drop-shadow-md">{movie.title}</h3>
            
            <div className="flex items-center gap-3 text-xs font-medium text-gray-300 mb-4">
              <span className="flex items-center gap-1 text-green-400">
                <Star className="w-3 h-3 fill-current" /> {movie.vote_average?.toFixed(1)}
              </span>
              <span>{movie.release_date?.split('-')[0]}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white text-black py-2 rounded font-bold text-sm flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
                <Play className="w-3 h-3 fill-current" /> Trailer
              </button>
              <button 
                onClick={handleFavourite}
                className={`px-3 py-2 rounded border border-gray-500 hover:border-white text-white transition-colors ${added ? 'bg-green-600 border-green-600' : 'bg-black/50'}`}
              >
                {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieCard;