import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
  width?: 'small' | 'medium' | 'large' | 'full';
  largeNumbers?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  unit,
  description,
  tooltip,
  required = false,
  width = 'full',
  largeNumbers = false,
  disabled = false,
}) => {
  const [displayValue, setDisplayValue] = useState('');

  const getWidthClass = () => {
    switch (width) {
      case 'small': return 'w-24';
      case 'medium': return 'w-32';
      case 'large': return 'w-48';
      default: return 'w-full';
    }
  };

  const formatNumberWithSeparators = (num: number): string => {
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const parseNumberFromDisplay = (str: string): number => {
    const cleanStr = str.replace(/[,\s]/g, '');
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
  };

  useEffect(() => {
    if (largeNumbers) {
      setDisplayValue(formatNumberWithSeparators(value));
    } else {
      setDisplayValue(value.toString());
    }
  }, [value, largeNumbers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (largeNumbers) {
      // Allow typing numbers and commas, update display immediately
      setDisplayValue(inputValue);
      
      // Parse and validate the actual number
      const numericValue = parseNumberFromDisplay(inputValue);
      
      // Only call onChange if the value is valid
      if (!isNaN(numericValue) && inputValue !== '') {
        onChange(numericValue);
      } else if (inputValue === '') {
        onChange(0);
      }
    } else {
      setDisplayValue(inputValue);
      const numericValue = parseFloat(inputValue);
      onChange(isNaN(numericValue) ? 0 : numericValue);
    }
  };

  const handleBlur = () => {
    if (largeNumbers) {
      // Reformat the display value on blur to ensure proper formatting
      setDisplayValue(formatNumberWithSeparators(value));
    }
  };

  const inputClassName = `${getWidthClass()} px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
    largeNumbers ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''
  }`;

  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && (
          <Tooltip content={tooltip} className="ml-2">
            <span className="text-gray-400 hover:text-gray-600 cursor-help">ℹ️</span>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center">
        <input
          type={largeNumbers ? "text" : "number"}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          min={largeNumbers ? undefined : min}
          max={largeNumbers ? undefined : max}
          step={largeNumbers ? undefined : step}
          inputMode={largeNumbers ? "numeric" : "decimal"}
          pattern={largeNumbers ? "[0-9,]*" : undefined}
          className={inputClassName}
          disabled={disabled}
        />
        {unit && <span className="ml-2 text-gray-500 text-sm">{unit}</span>}
      </div>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default InputField;