import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-blue-600 mr-2">TC</span>
            <span className="font-semibold text-gray-900 hidden sm:inline">TELECOM CALCULATOR</span>
          </Link>
          
          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`text-gray-600 hover:text-gray-900 ${
                location.pathname === '/' ? 'text-gray-900 font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/calculators"
              className={`text-gray-600 hover:text-gray-900 ${
                location.pathname.startsWith('/calculators') ? 'text-gray-900 font-medium' : ''
              }`}
            >
              Calculators
            </Link>
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900"
            >
              About
            </a>
            <Link
              to="/help"
              className="text-gray-600 hover:text-gray-900"
            >
              Help
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;