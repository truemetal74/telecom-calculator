import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 text-sm text-white bg-gray-900 rounded-lg shadow-lg w-80 max-w-sm">
          <div className="text-left leading-relaxed">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;