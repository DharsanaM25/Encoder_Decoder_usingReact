import React from 'react';

interface InputOutputProps {
  input: string;
  output: string;
  error: string | null;
  mode: 'encode' | 'decode';
  onInputChange: (value: string) => void;
}

const InputOutput: React.FC<InputOutputProps> = ({ 
  input, 
  output, 
  error, 
  mode, 
  onInputChange 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {mode === 'encode' ? 'Plain Text' : 'Encoded Text'}
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={
            mode === 'encode'
              ? 'Enter text to encode...'
              : 'Enter text to decode...'
          }
          className={`w-full h-40 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          } font-mono text-sm resize-none transition-all duration-200`}
        />
      </div>
      
      <div>
        <label
          htmlFor="output"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
        </label>
        <textarea
          id="output"
          value={output}
          readOnly
          placeholder="Result will appear here..."
          className="w-full h-40 p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm font-mono text-sm resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
      </div>
    </div>
  );
};

export default InputOutput;