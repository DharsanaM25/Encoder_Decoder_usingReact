import React, { useState, useEffect } from 'react';
import { Copy, FileUp, RotateCcw, Check, AlertCircle } from 'lucide-react';
import MethodSelector from './MethodSelector';
import InputOutput from './InputOutput';
import HistoryPanel from './HistoryPanel';
import { encodeText, decodeText } from '../utils/cipherUtils';
import { CipherMethod, HistoryItem } from '../types';

const EncoderDecoder: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [method, setMethod] = useState<CipherMethod>('base64');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shift, setShift] = useState<number>(3); // For Caesar cipher

  useEffect(() => {
    try {
      if (input.trim()) {
        setError(null);
        if (mode === 'encode') {
          const result = encodeText(input, method, shift);
          setOutput(result);
        } else {
          const result = decodeText(input, method, shift);
          setOutput(result);
        }
      } else {
        setOutput('');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  }, [input, method, mode, shift]);

  const handleMethodChange = (newMethod: CipherMethod) => {
    setMethod(newMethod);
    // Clear input/output when changing methods to avoid confusion
    if (input) {
      // Add current state to history before clearing
      addToHistory();
      setInput('');
      setOutput('');
    }
  };

  const handleModeToggle = () => {
    // Swap input and output when toggling mode
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    if (output) {
      addToHistory();
      setInput(output);
    }
  };

  const addToHistory = () => {
    if (input && output) {
      const historyItem: HistoryItem = {
        id: Date.now(),
        input,
        output,
        method,
        mode,
        shift: method === 'caesar' ? shift : undefined,
        timestamp: new Date().toISOString(),
      };
      setHistory((prev) => [historyItem, ...prev].slice(0, 10)); // Keep last 10 items
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    if (input || output) {
      addToHistory();
    }
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setInput(content);
      }
    };
    reader.readAsText(file);
  };

  const restoreFromHistory = (item: HistoryItem) => {
    setMethod(item.method);
    setMode(item.mode);
    setInput(item.input);
    if (item.shift !== undefined) {
      setShift(item.shift);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {mode === 'encode' ? 'Encoder' : 'Decoder'}
            </h2>
            
            <MethodSelector 
              method={method} 
              onChange={handleMethodChange} 
              mode={mode} 
              onModeToggle={handleModeToggle}
              shift={shift}
              onShiftChange={(value) => setShift(value)}
            />
            
            <div className="mt-6">
              <InputOutput
                input={input}
                output={output}
                error={error}
                mode={mode}
                onInputChange={setInput}
              />
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={handleClear}
                  className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm transition-colors duration-200"
                >
                  <RotateCcw size={16} className="mr-1" />
                  Clear
                </button>
                <label className="flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md text-sm cursor-pointer transition-colors duration-200">
                  <FileUp size={16} className="mr-1" />
                  Upload File
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <button
                onClick={handleCopy}
                disabled={!output}
                className={`flex items-center px-4 py-2 rounded-md text-sm transition-all duration-200 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : output
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} className="mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-1" />
                    Copy Result
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-start">
                <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {history.length > 0 && (
        <HistoryPanel history={history} onRestore={restoreFromHistory} />
      )}
    </div>
  );
};

export default EncoderDecoder;