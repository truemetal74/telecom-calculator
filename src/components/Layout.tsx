import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CalculatorType } from '../types/calculator';
import { trackCalculatorNavigation } from '../utils/gtm';

interface LayoutProps {
  children: React.ReactNode;
  activeCalculator: CalculatorType;
}

const Layout: React.FC<LayoutProps> = ({ children, activeCalculator }) => {
  const navigate = useNavigate();
  
  const onCalculatorChange = (type: CalculatorType) => {
    if (type !== activeCalculator) {
      trackCalculatorNavigation(activeCalculator, type);
    }
    navigate(`/calculators/${type}`);
  };
  
  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">Telecom Calculator</h1>
            <p className="text-sm text-gray-600 mt-1">
              Calculate technical parameters for telecom projects
            </p>
          </div>
          
          <nav className="flex space-x-6 mt-4 overflow-x-auto">
            <button
              onClick={() => onCalculatorChange('subscriber')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeCalculator === 'subscriber'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              MVNO/MNO: Transaction Load by Subscribers
            </button>
            <button
              onClick={() => onCalculatorChange('voip-subscriber')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeCalculator === 'voip-subscriber'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              VoIP Operator: Transaction Load by Subscribers
            </button>
            <button
              onClick={() => onCalculatorChange('concurrent-calls')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeCalculator === 'concurrent-calls'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transaction Load: CPS and Concurrent Calls
            </button>
          </nav>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;