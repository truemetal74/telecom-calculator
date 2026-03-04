import React from 'react';
import Tooltip from './Tooltip';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  tooltip?: string;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  description,
  tooltip,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={disabled}
          />
          <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
        </label>
        {tooltip && (
          <Tooltip content={tooltip} className="ml-2">
            <span className="text-gray-400 hover:text-gray-600 cursor-help">ℹ️</span>
          </Tooltip>
        )}
      </div>
      {description && (
        <p className="mt-1 ml-6 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default CheckboxField;