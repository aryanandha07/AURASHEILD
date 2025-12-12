import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

// Define the response schema for structured output
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    safeScore: {
      type: Type.INTEGER,
      description: "A safety score from 0 to 100, where 100 is perfectly safe and 0 is extremely dangerous.",
    },
    riskLevel: {
      type: Type.STRING,
      enum: ["Safe", "Moderate", "High", "Critical"],
      description: "Overall assessment of the risk level.",
    },
    crowdDensity: {
      type: Type.STRING,
      description: "Description of crowd density (e.g., Empty, Sparse, Crowded, Packed).",
    },
    lightingCondition: {
      type: Type.STRING,
      description: "Assessment of lighting (e.g., Well-lit, Dim, Dark, Flickering).",
    },
    threats: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of potential threats or risks identified in the scene.",
    },
    safeZones: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of identified safer areas or paths within the view.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise summary of the safety situation.",
    },
  },
  required: ["safeScore", "riskLevel", "crowdDensity", "lightingCondition", "threats", "safeZones", "summary"],
};

export const analyzeSafety = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Using gemini-2.5-flash for multimodal analysis (images + text).
    // gemini-3-pro-image-preview is for image GENERATION, not analysis, which caused the 403.
    const modelId = "gemini-2.5-flash"; 

    const prompt = "You are AuraShield, a personal safety AI. Analyze this image for potential safety risks, environmental hazards, and security concerns. Provide a detailed safety assessment.";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more objective analysis
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return a fallback/error state if API fails
    return {
      safeScore: 0,
      riskLevel: 'Critical',
      crowdDensity: 'Unknown',
      lightingCondition: 'Unknown',
      threats: ['System Error: Could not analyze environment.'],
      safeZones: [],
      summary: 'AI analysis failed. Please verify your connection or API key and try again.',
    };
  }
};