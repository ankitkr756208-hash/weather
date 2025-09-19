import React, { useState, FormEvent } from 'react';
import { KeyRound, Save } from 'lucide-react';

interface ApiKeyInputProps {
  onSetApiKey: (key: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSetApiKey }) => {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSetApiKey(key.trim());
      setKey(''); // Clear input after saving
      setSaved(true);
      setTimeout(() => setSaved(false), 2000); // Hide message after 2s
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="apiKey" className="sr-only">WeatherAPI Key</label>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
          <KeyRound size={20} />
        </span>
        <input
          id="apiKey"
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter & Save WeatherAPI Key"
          className="w-full pl-12 pr-12 py-3 bg-white/10 text-white rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
          aria-label="WeatherAPI Key Input"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition-colors p-2"
          aria-label="Save API Key"
        >
          <Save size={20} />
        </button>
      </form>
      {saved && <p className="text-center text-green-400 mt-2 text-sm">API Key saved successfully!</p>}
    </div>
  );
};

export default ApiKeyInput;
