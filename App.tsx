import React, { useState, useEffect } from 'react';
import SetupForm from './components/SetupForm';
import CameraScanner from './components/CameraScanner';
import SafetyDashboard from './components/SafetyDashboard';
import Loader from './components/ui/Loader';
import { ContactInfo, AppState, AnalysisResult, GeoLocation } from './types';
import { analyzeSafety } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.SETUP);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Setup geolocation watcher on mount if not in setup
  useEffect(() => {
    if (appState !== AppState.SETUP) {
      if ('geolocation' in navigator) {
         setLocationStatus('Acquiring Signal...');
         const watchId = navigator.geolocation.watchPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: position.timestamp
            });
            setLocationStatus('GPS Locked');
          },
          (error) => {
            console.error("Geo Error", error);
            setLocationStatus('GPS Signal Lost');
          }
        );
        return () => navigator.geolocation.clearWatch(watchId);
      } else {
        setLocationStatus('GPS Unavailable');
      }
    }
  }, [appState]);

  const handleSetupComplete = (info: ContactInfo) => {
    setContact(info);
    setAppState(AppState.CAMERA);
  };

  const handleScan = async (base64Image: string) => {
    setAppState(AppState.ANALYZING);
    
    // Simulate Location Sharing Notification
    if (contact && location) {
      console.log(`Sending coordinates ${location.latitude}, ${location.longitude} to ${contact.name} (${contact.phone})`);
      // In a real app, this would trigger an SMS/API call
    }

    try {
      const result = await analyzeSafety(base64Image);
      setAnalysisResult(result);
      setAppState(AppState.RESULTS);
    } catch (error) {
      console.error("Analysis failed", error);
      // Revert to camera on critical failure logic could go here, 
      // but analyzeSafety handles errors gracefully returning a fallback object.
      setAppState(AppState.CAMERA); 
    }
  };

  const handleRestart = () => {
    setAnalysisResult(null);
    setAppState(AppState.CAMERA);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Application States */}
      {appState === AppState.SETUP && (
        <SetupForm onComplete={handleSetupComplete} />
      )}

      {appState === AppState.CAMERA && (
        <CameraScanner 
          onScan={handleScan} 
          locationStatus={locationStatus}
        />
      )}

      {appState === AppState.ANALYZING && (
        <Loader />
      )}

      {appState === AppState.RESULTS && analysisResult && contact && (
        <SafetyDashboard 
          result={analysisResult} 
          onRestart={handleRestart}
          contactName={contact.name}
        />
      )}
    </div>
  );
};

export default App;