import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import EncoderDecoder from './components/EncoderDecoder';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-gray-800" />
            ) : (
              <Sun size={20} className="text-yellow-300" />
            )}
          </button>
        </div>
        <EncoderDecoder />
      </main>
      <Footer />
    </div>
  );
}

export default App;