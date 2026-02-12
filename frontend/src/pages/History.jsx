import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import { Clock, Search } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Clock className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold text-white">Search History</h2>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading history...</p>
        ) : history.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No search history found.</div>
        ) : (
          history.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/10 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-lg text-white">"{item.mood}"</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.genres.map((g, i) => (
                    <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-400 whitespace-nowrap">
                {formatDate(item.searchedAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;