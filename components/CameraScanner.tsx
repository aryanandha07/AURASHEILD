import React, { useRef, useEffect, useState } from 'react';
import { Camera, MapPin, ScanLine } from 'lucide-react';

interface CameraScannerProps {
  onScan: (imageSrc: string) => void;
  locationStatus: string;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onScan, locationStatus }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera Error:", err);
        setError("Unable to access camera. Please allow permissions.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // Match canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get base64 string (remove prefix for API)
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        const base64Data = imageData.split(',')[1];
        
        onScan(base64Data);
      }
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-red-500 mb-4 font-bold text-xl">Camera Access Denied</div>
        <p className="text-slate-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Hidden Canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Holographic Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        
        {/* Scanning Line Animation */}
        <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-scan opacity-80"></div>
        
        {/* Corner Brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-cyan-500 rounded-tl-xl opacity-60"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-cyan-500 rounded-tr-xl opacity-60"></div>
        <div className="absolute bottom-24 left-8 w-16 h-16 border-l-4 border-b-4 border-cyan-500 rounded-bl-xl opacity-60"></div>
        <div className="absolute bottom-24 right-8 w-16 h-16 border-r-4 border-b-4 border-cyan-500 rounded-br-xl opacity-60"></div>
      </div>

      {/* Status Indicators */}
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-start z-10">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs font-tech tracking-wider flex items-center gap-2">
           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
           LIVE FEED
        </div>
        
        {locationStatus && (
          <div className="bg-black/60 backdrop-blur-md border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-tech tracking-wider flex items-center gap-2">
            <MapPin size={12} />
            {locationStatus}
          </div>
        )}
      </div>

      {/* Control Area */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center z-20">
        <button
          onClick={handleCapture}
          className="group relative flex items-center justify-center"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300"></div>
          <div className="absolute inset-0 border border-cyan-500/50 rounded-full scale-125 group-hover:scale-150 transition-transform duration-500 border-dashed animate-[spin_10s_linear_infinite]"></div>
          
          {/* Button */}
          <div className="w-20 h-20 bg-cyan-500/10 backdrop-blur-sm border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
            <ScanLine size={32} />
          </div>
          
          <span className="absolute -bottom-10 text-cyan-300 text-sm font-tech tracking-widest opacity-80">INITIATE SCAN</span>
        </button>
      </div>
    </div>
  );
};

export default CameraScanner;