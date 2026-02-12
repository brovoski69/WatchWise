import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import History from './pages/History';
import Cursor from './components/Cursor'; // Import the cursor

function App() {
  return (
    <Router>
      <div className="antialiased selection:bg-netflix-red selection:text-white">
        <Cursor /> {/* Add the Custom Cursor Here */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;