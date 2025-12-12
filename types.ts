export interface ContactInfo {
  name: string;
  phone: string;
}

export interface AnalysisResult {
  safeScore: number;
  riskLevel: 'Safe' | 'Moderate' | 'High' | 'Critical';
  crowdDensity: string;
  lightingCondition: string;
  threats: string[];
  safeZones: string[];
  summary: string;
}

export enum AppState {
  SETUP = 'SETUP',
  CAMERA = 'CAMERA',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  timestamp: number;
}