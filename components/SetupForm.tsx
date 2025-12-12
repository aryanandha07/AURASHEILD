import React, { useState } from 'react';
import { ContactInfo } from '../types';
import { Shield, ChevronRight } from 'lucide-react';

interface SetupFormProps {
  onComplete: (contact: ContactInfo) => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onComplete({ name, phone });
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center p-6 text-center animate-fade-in">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 rounded-full"></div>
        <Shield className="w-24 h-24 text-cyan-400 relative z-10" strokeWidth={1.5} />
      </div>
      
      <h1 className="text-4xl font-bold mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        AURA<span className="text-white">SHIELD</span>
      </h1>
      <p className="text-slate-400 mb-8 max-w-xs">
        AI-Powered Personal Safety Assistant. Configure your emergency contact to begin.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Emergency Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-lg py-3 px-4 text-white outline-none transition-colors"
            required
          />
        </div>
        <div className="relative">
          <input
            type="tel"
            placeholder="Emergency Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-lg py-3 px-4 text-white outline-none transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!name || !phone}
          className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]"
        >
          ACTIVATE SYSTEM <ChevronRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default SetupForm;