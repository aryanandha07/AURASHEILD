import React from 'react';
import { Radio } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-950 p-8 text-center animate-fade-in relative overflow-hidden">
      
      {/* Background Matrix Effect (Simulated) */}
      <div className="absolute inset-0 opacity-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(6,182,212,.3)_25%,rgba(6,182,212,.3)_26%,transparent_27%,transparent_74%,rgba(6,182,212,.3)_75%,rgba(6,182,212,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(6,182,212,.3)_25%,rgba(6,182,212,.3)_26%,transparent_27%,transparent_74%,rgba(6,182,212,.3)_75%,rgba(6,182,212,.3)_76%,transparent_77%,transparent)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-40 animate-pulse"></div>
          <Radio size={64} className="text-cyan-400 animate-bounce relative z-10" />
        </div>
        
        <h2 className="text-2xl font-tech text-white mb-2 tracking-widest">
          SCANNING<span className="animate-pulse">...</span>
        </h2>
        <p className="text-cyan-300/70 text-sm font-mono uppercase">
          Analysing environment vectors
        </p>
        
        <div className="w-64 h-1 bg-slate-800 mt-8 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 animate-[width_2s_ease-in-out_infinite] w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;