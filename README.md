# 🛡️ AuraShield — AI-Powered Personal Safety Assistant

AuraShield is an AI-driven personal safety application that analyzes real-world environments using computer vision and provides instant risk assessments. Built using advanced multimodal AI, the app helps users stay aware of their surroundings and make safer decisions.

---

## 🚀 Features

- 📷 **Real-time Image Analysis**
  - Scan surroundings using camera input
  - Detect environmental and safety risks instantly

- ⚠️ **AI Safety Assessment**
  - SafeScore (0–100)
  - Risk Level: Safe / Moderate / High / Critical

- 🌍 **Environmental Insights**
  - Crowd density detection
  - Lighting condition analysis

- 🧠 **Smart Threat Detection**
  - Identifies potential hazards
  - Suggests safer zones nearby

- 📡 **Live Location Sharing**
  - Share real-time location with trusted contacts

---

## 🧩 Tech Stack

- AI Model: Google Gemini (Multimodal)
- Frontend: Web/Mobile Interface
- Backend: API-based architecture
- Computer Vision + Structured Prompt Engineering

---

## 🧠 How It Works

1. User captures or uploads an image
2. Image is processed by AI model
3. Structured prompt enforces:
   - Risk scoring
   - Threat identification
   - Safety recommendations
4. Results are displayed in real-time

---

## 📊 Example Output

- **SafeScore:** 72  
- **Risk Level:** Moderate  
- **Environmental Factors:** Low lighting, medium crowd  
- **Threats:** Isolated area, poor visibility  
- **Recommendations:** Move to well-lit area

---

## 🎯 Use Cases

- Night-time travel safety
- Solo commuting
- Unknown location awareness
- Emergency preparedness

---

## ⚠️ Disclaimer

AuraShield provides AI-generated insights and should not replace real-world judgment or emergency services.

---

## 👨‍💻 Author

Developed as an AI-powered safety solution project.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1BXYZtlp681r8X6eUZPyv9_nETdOkJMid

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
