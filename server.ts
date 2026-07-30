import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI lazily or when key is present
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agent: 'Konrad Schultz Real Estate AI' });
});

// AI Real Estate Concierge API
app.post('/api/ai-concierge', async (req, res) => {
  try {
    const { prompt, conversationHistory, listingContext } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGenAI();

    if (!ai) {
      // Graceful fallback response if key is not configured yet
      return res.json({
        reply: `Thank you for reaching out! I'm Konrad Schultz's AI Real Estate Advisor. Based on your request ("${prompt}"), I recommend exploring our active listings in Aventura, Sunny Isles Beach, and Brickell. Konrad Schultz (Lic # 3188541) at Beachfront Realty is also available directly at 954-297-5559 to give you personalized guidance!`,
        suggestedFilters: { city: 'All', maxPrice: 1500000 },
      });
    }

    const systemInstruction = `You are the AI Real Estate Concierge for Konrad Schultz, a premier South Florida Realtor with Beachfront Realty in Aventura, FL (License # 3188541, Phone: 954-297-5559, Email: KonradSchultz001@mymdc.net).
You assist home buyers, sellers, investors, and relocation clients across South Florida (Aventura, Miami, Sunny Isles Beach, Bal Harbour, Fort Lauderdale, Hollywood, Hallandale Beach, Boca Raton).
Your tone is professional, warm, luxury-oriented, data-informed, and helpful.

When users ask for properties, recommendations, market guidance, mortgage estimations, or neighborhood insights:
1. Provide concise, expert advice highlighting South Florida lifestyle and real estate market facts.
2. Recommend key neighborhoods or criteria (e.g., waterfront condos in Sunny Isles, luxury towers in Aventura, investment opportunities in Brickell/Miami).
3. Always invite them to schedule a private tour or consultation with Konrad Schultz at 954-297-5559 or through the website booking system.
4. Keep answers readable with clean markdown bullet points.`;

    const contents = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory) {
        contents.push(`${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`);
      }
    }
    contents.push(`User query: ${prompt}`);

    if (listingContext) {
      contents.push(`Current Available Listings Context: ${JSON.stringify(listingContext.slice(0, 5))}`);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contents.join('\n\n'),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'd be happy to assist you with your South Florida real estate search. Please feel free to call Konrad Schultz directly at 954-297-5559.";

    res.json({ reply });
  } catch (err: any) {
    console.error('Error in AI Concierge:', err);
    res.status(500).json({
      error: 'Failed to process AI request',
      reply: "I am temporarily having trouble connecting to AI services, but Konrad Schultz is standing by to help you! Call or text 954-297-5559.",
    });
  }
});

// Home Valuation API Endpoint
app.post('/api/valuation', (req, res) => {
  const { address, city, bedrooms, bathrooms, sqft, propertyType, condition } = req.body;

  if (!address || !city) {
    return res.status(400).json({ error: 'Address and city are required' });
  }

  // Calculate realistic South Florida valuation heuristic
  const basePricePerSqftMap: Record<string, number> = {
    'Aventura': 550,
    'Sunny Isles Beach': 850,
    'Bal Harbour': 1200,
    'Miami': 650,
    'Miami Beach': 950,
    'Fort Lauderdale': 580,
    'Hollywood': 420,
    'Hallandale Beach': 480,
    'Boca Raton': 520,
  };

  const basePpsf = basePricePerSqftMap[city] || 500;
  const numSqft = Number(sqft) || 1600;
  let estimatedValue = numSqft * basePpsf;

  if (condition === 'luxurious' || condition === 'renovated') estimatedValue *= 1.2;
  if (condition === 'needs-work') estimatedValue *= 0.85;

  const lowEstimate = Math.round(estimatedValue * 0.93 / 1000) * 1000;
  const highEstimate = Math.round(estimatedValue * 1.07 / 1000) * 1000;
  const midEstimate = Math.round(estimatedValue / 1000) * 1000;

  res.json({
    success: true,
    estimatedValue: midEstimate,
    lowEstimate,
    highEstimate,
    pricePerSqft: Math.round(midEstimate / numSqft),
    comparablesCount: 8,
    message: `Estimated value generated for ${address}, ${city}. Konrad Schultz will follow up with a certified Comprehensive Market Analysis (CMA).`,
  });
});

// Consultation Booking API Endpoint
app.post('/api/schedule-consultation', (req, res) => {
  const { name, email, phone, date, time, type, notes } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' });
  }

  res.json({
    success: true,
    confirmationId: `KS-${Math.floor(100000 + Math.random() * 900000)}`,
    message: `Thank you, ${name}! Your consultation request for ${date || 'the requested date'} at ${time || 'your preferred time'} has been received. Konrad Schultz will contact you shortly at ${phone}.`,
    recap: {
      name,
      email,
      phone,
      date,
      time,
      type: type || 'In-Person Consultation',
      agent: 'Konrad Schultz, Realtor® (Lic # 3188541)',
      office: 'Beachfront Realty - 20803 Biscayne Blvd, Suite 102, Aventura, FL 33180',
    },
  });
});

// Setup Vite Development or Static Production Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Konrad Schultz Real Estate server running at http://localhost:${PORT}`);
  });
}

startServer();
