import React from 'react';
import { AnalysisResult } from '../types';
import { RefreshCw, ShieldCheck, AlertTriangle, Users, Sun, CheckCircle } from 'lucide-react';

interface SafetyDashboardProps {
  result: AnalysisResult;
  onRestart: () => void;
  contactName: string;
}

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  // SVG Gauge calculations
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-green-500";
  if (score < 50) colorClass = "text-red-500";
  else if (score < 80) colorClass = "text-yellow-400";

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={colorClass}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-4xl font-bold font-tech ${colorClass}`}>{score}</span>
        <span className="text-xs text-slate-400 uppercase tracking-wider">SafeScore</span>
      </div>
    </div>
  );
};

const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ result, onRestart, contactName }) => {
  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden animate-fade-in relative">
        {/* Sticky Header Actions */}
      <div className="absolute bottom-6 right-6 z-50">
        <button
          onClick={onRestart}
          className="bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all transform hover:scale-105"
        >
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Section */}
        <div className="p-6 pb-0 flex flex-col items-center">
          <h2 className="text-2xl font-tech text-white mb-6 tracking-widest">ANALYSIS COMPLETE</h2>
          <ScoreGauge score={result.safeScore} />
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
              result.riskLevel === 'Safe' ? 'border-green-500/50 bg-green-500/10 text-green-400' :
              result.riskLevel === 'Critical' ? 'border-red-500/50 bg-red-500/10 text-red-400' :
              'border-yellow-500/50 bg-yellow-500/10 text-yellow-400'
            }`}>
              {result.riskLevel.toUpperCase()} RISK
            </span>
             <span className="px-4 py-1.5 rounded-full text-sm border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
               Loc Shared: {contactName}
            </span>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs uppercase tracking-wider">
              <Users size={14} /> Crowd
            </div>
            <div className="text-white font-medium">{result.crowdDensity}</div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs uppercase tracking-wider">
              <Sun size={14} /> Lighting
            </div>
            <div className="text-white font-medium">{result.lightingCondition}</div>
          </div>
        </div>

        {/* Threats Analysis */}
        <div className="px-6 mb-6">
          <h3 className="text-slate-400 text-sm font-tech uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-500" /> Detected Risks
          </h3>
          <div className="space-y-3">
            {result.threats.length > 0 ? (
              result.threats.map((threat, idx) => (
                <div key={idx} className="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r-lg">
                  <p className="text-red-200 text-sm">{threat}</p>
                </div>
              ))
            ) : (
               <div className="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r-lg">
                  <p className="text-green-200 text-sm">No immediate threats detected.</p>
                </div>
            )}
          </div>
        </div>

        {/* Safe Zones */}
        <div className="px-6 mb-6">
          <h3 className="text-slate-400 text-sm font-tech uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-500" /> Safe Zones & Paths
          </h3>
           <div className="space-y-2">
            {result.safeZones.length > 0 ? (
              result.safeZones.map((zone, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <CheckCircle size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                  <p className="text-slate-300 text-sm">{zone}</p>
                </div>
              ))
            ) : (
               <p className="text-slate-500 italic text-sm">No specific safe zones highlighted.</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 mb-8">
            <h3 className="text-slate-400 text-sm font-tech uppercase tracking-wider mb-2">AI Summary</h3>
            <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/30 p-4 rounded-xl border border-slate-800">
                {result.summary}
            </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyDashboard;