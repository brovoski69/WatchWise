import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clapperboard } from 'lucide-react'; // Import the icon

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper component for the animated link
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        className={`relative group text-lg font-medium transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
        }`}
      >
        {children}
        {/* The Animated Red Line */}
        <span className={`absolute -bottom-1 left-0 h-[2px] bg-netflix-red transition-all duration-300 ease-in-out
          ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
        `}></span>
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-netflix-dark/95 shadow-2xl py-2' : 'bg-gradient-to-b from-black/80 to-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            {/* We use the SVG Icon here instead of the emoji.
                'text-white' makes it pure white.
                'fill-current' can optionally fill it if you want solid white.
            */}
            <Clapperboard className="w-10 h-10 text-white transform group-hover:rotate-12 group-hover:text-netflix-red transition-all duration-300" />
            
            <span className="text-netflix-red text-4xl font-black tracking-tighter uppercase drop-shadow-md group-hover:text-white transition-colors duration-300">
              WATCHWISE
            </span>
          </Link>
          
          {/* Navigation */}
          <div className="flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favourites">My List</NavLink>
            <NavLink to="/history">History</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;