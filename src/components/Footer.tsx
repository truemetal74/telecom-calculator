import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">TELECOM CALCULATOR</h3>
            <p className="text-gray-400">
              Professional capacity planning tools for telecom engineers
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/calculators/subscriber" className="hover:text-white transition duration-200">
                  • Subscriber Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/concurrent-calls" className="hover:text-white transition duration-200">
                  • Concurrent Calls Calculator
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition duration-200">
                  • Help & Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Formula Explanations</li>
              <li>• Industry Standards</li>
              <li>• Best Practices Guide</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Contact: hello@telecomcalculator.com</p>
          <p className="mt-2">© 2025 Telecom Calculator. Free tool for telecom professionals.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;