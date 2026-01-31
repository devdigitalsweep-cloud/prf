
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use process.env.API_KEY directly in the initialization object as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEnhancedBiotechContent = async (context: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Act as a Chief Medical Strategy Officer for FAHM Biotech. 
      Rewrite the content for the 'FAHIS' product profile.
      
      Key Strategic Pillars:
      1. **Sovereign Health Security**: Emphasize Saudi IP and 100% in-Kingdom data hosting (PDPL).
      2. **The Clinical Gap**: Explicitly mention solving the screening gap for 'Dense Breast Tissue' and 'Women Under 40' not covered by mammography.
      3. **The Workflow**: Describe FAHIS as a Clinical Decision Support System (CDSS) with a contactless self-scan.
      4. **Regulatory Transparency**: Position as 'Pre-SFDA Accreditation' but ready for Ministry of Health pilot validation based on international success.
      
      Context: ${context}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            summary: { type: Type.STRING },
            visionAlignment: { type: Type.STRING },
            keyInsights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            investorPitch: { type: Type.STRING },
            marketOpportunity: { type: Type.STRING }
          },
          required: ["headline", "summary", "keyInsights", "investorPitch", "marketOpportunity", "visionAlignment"]
        }
      }
    });

    // Fix: Access the .text property directly instead of calling it as a function
    const responseText = response.text;
    if (responseText) {
      return JSON.parse(responseText.trim());
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Error enhancing content:", error);
    return null;
  }
};
