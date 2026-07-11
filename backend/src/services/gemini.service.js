import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Fallback response generator when AI API is unavailable
 * Uses rule-based matching for common queries
 */
function getFallbackResponse(message) {
  const q = message.toLowerCase();

  if (q.includes('action 6') || q.includes('osmo 6')) {
    return `About DJI Osmo Action 6:

DJI has not officially released Osmo Action 6 yet.

You can refer to DJI Osmo Action 5 Pro - the latest model:

Key specifications:
- 1/1.3-inch CMOS sensor
- 4K/120fps video recording
- 1950mAh battery (4 hours recording)
- Waterproof to 18m (no dive case needed)
- RockSteady 3.0 + HorizonSteady stabilization

Reference prices:
- Standard Combo: 8,360,000 VND - 9,190,000 VND
- Adventure Combo: 10,870,000 VND - 11,690,000 VND

Please try again later for more detailed information.`;
  }

  if (q.includes('action 5') || q.includes('action5')) {
    return `DJI Osmo Action 5 Pro:

Technical specifications:
- 1/1.3-inch CMOS sensor
- 4K/120fps video recording
- 2.0-inch OLED display
- 1950mAh battery (4 hours recording)
- Waterproof to 18m
- RockSteady 3.0 + HorizonSteady stabilization
- Wi-Fi 6, Bluetooth 5.0 connectivity

Pricing:
- Standard Combo: 8,360,000 VND - 9,190,000 VND
- Adventure Combo: 10,870,000 VND - 11,690,000 VND

This is DJI's current flagship action camera.`;
  }

  if (q.includes('price') || q.includes('how much') || q.includes('gia') || q.includes('bao nhieu')) {
    return `Action camera reference prices:

DJI Osmo Action 5 Pro:
- Standard: 8,360,000 VND - 9,190,000 VND
- Adventure: 10,870,000 VND - 11,690,000 VND

GoPro Hero 13 Black:
- Standard: 9,990,000 VND - 10,990,000 VND

Insta360 X5:
- Standard: 10,490,000 VND - 11,490,000 VND

Prices may vary during promotional periods.`;
  }

  return `Hello! I am the NextTech AI assistant.

The AI system is currently experiencing high demand (daily quota exhausted).

I can still provide information about:
- DJI Osmo Action 5 Pro
- Product comparisons
- Pricing and bundles
- Accessories

Please try again in a few minutes or contact our hotline at 1900 1234 for immediate support.`;
}

/**
 * Main function to handle chat requests using Gemini API
 * Falls back to rule-based responses when API is unavailable
 */
export async function askGemini(message) {
  try {
    console.log('[Gemini] Processing:', message.substring(0, 50));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
You are the NextTech AI assistant specializing in DJI action cameras.

Rules:

1. Detect the language of the user's question.
- If the user writes in Vietnamese, reply ONLY in Vietnamese.
- If the user writes in English, reply ONLY in English.
- Never mix languages.

2. Answer ONLY what the user asks.
- Do not add extra specifications, recommendations, or marketing information unless requested.
- Keep the answer concise.

3. Always use Google Search for:
- product specifications
- firmware versions
- prices
- compatibility
- release dates
- factual information

4. Never guess or fabricate information.

5. If you cannot verify the information from Google Search or official DJI sources, reply:
- Vietnamese:
"Tôi không thể xác minh thông tin này từ nguồn chính thức."
- English:
"I couldn't verify this information from official sources."

6. Clearly distinguish between:
- Officially released products
- Rumors or unreleased products.

7. If the user asks about an unreleased product, explicitly state that DJI has not officially announced it and recommend the closest released model.

User question:
${message}
`,
      config: {
        temperature: 0,
        topP: 0.1,
        topK: 1,
        maxOutputTokens: 900,
        tools: [
          {
            googleSearch: {}
          }
        ]
      }
    });

    return response.text;

  } catch (error) {
    console.error('[Gemini] Error:', error.message);

    // Rate limit exceeded - fallback
    if (error.status === 429) {
      console.warn('[Gemini] Quota exceeded, using fallback');
      return getFallbackResponse(message);
    }

    // Server overload - fallback
    if (error.status === 503) {
      console.warn('[Gemini] Server overloaded, using fallback');
      return getFallbackResponse(message);
    }

    // Generic error - fallback
    return getFallbackResponse(message);
  }
}
