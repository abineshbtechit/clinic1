
import { GoogleGenAI, Type } from "@google/genai";

// Always use the API key directly from process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getClinicInsights = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following clinic data and provide 3 key executive insights and 1 recommendation for improvement. Data: ${JSON.stringify(data)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Key insights about clinic performance'
            },
            recommendation: {
              type: Type.STRING,
              description: 'Actionable recommendation'
            }
          },
          required: ['insights', 'recommendation']
        }
      }
    });

    // Access the .text property directly as it is a getter, not a method
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      insights: ["Unable to fetch real-time insights.", "Please check your network connection.", "System load might be high."],
      recommendation: "Review the wait times manually to identify bottlenecks."
    };
  }
};
