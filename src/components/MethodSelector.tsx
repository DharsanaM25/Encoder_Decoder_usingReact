import React from 'react';
import { CipherMethod } from '../types';

interface MethodSelectorProps {
  method: CipherMethod;
  onChange: (method: CipherMethod) => void;
  mode: 'encode' | 'decode';
  onModeToggle: () => void;
  shift: number;
  onShiftChange: (value: number) => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  onChange,
  mode,
  onModeToggle,
  shift,
  onShiftChange,
}) => {
  const methods: { value: CipherMethod; label: string }[] = [
    { value: 'base64', label: 'Base64' },
    { value: 'url', label: 'URL' },
    { value: 'html', label: 'HTML' },
    { value: 'caesar', label: 'Caesar Cipher' },
    { value: 'binary', label: 'Binary' },
    { value: 'hex', label: 'Hexadecimal' },
    { value: 'json', label: 'JSON' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {methods.map((m) => (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              method === m.value
                ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-800'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-md p-1">
          <button
            onClick={onModeToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Encode
          </button>
          <button
            onClick={onModeToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Decode
          </button>
        </div>

        {method === 'caesar' && (
          <div className="flex items-center space-x-2">
            <label htmlFor="shift" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Shift:
            </label>
            <input
              id="shift"
              type="number"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => onShiftChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MethodSelector;