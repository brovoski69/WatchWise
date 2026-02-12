import React, { useEffect, useState } from 'react';
import { getFavourites } from '../services/api';
import { Heart, Film } from 'lucide-react';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const data = await getFavourites();
      setFavourites(data);
    } catch (error) {
      console.error("Error fetching favourites", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Heart className="w-8 h-8 text-netflix-red fill-current" />
        <h2 className="text-3xl font-bold text-white">My Library</h2>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading library...</div>
      ) : favourites.length === 0 ? (
        <div className="text-center py-20 opacity-50">
          <Film className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-xl">No favourites saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favourites.map((fav, index) => (
            <div key={index} className="glass-panel rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="aspect-[2/3] relative">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${fav.posterPath || fav.poster_path}`} 
                  alt={fav.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <div>
                    <h3 className="font-bold text-lg">{fav.title}</h3>
                    <p className="text-sm text-netflix-red mt-2">{fav.genre}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;