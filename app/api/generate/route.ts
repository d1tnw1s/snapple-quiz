import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// --- MOCK LOGIC (Fallback) ---
function calculateMockResult(answers: any) {
  let scores = { Fire: 0, Rain: 0, Air: 0, Earth: 0 };
  
  // Calculate scores safely
  if (answers?.mood === 'fire') scores.Fire += 20;
  if (answers?.mood === 'rain') scores.Rain += 20;
  if (answers?.mood === 'air') scores.Air += 20;
  if (answers?.mood === 'earth') scores.Earth += 20;

  if (answers?.social === 'life') scores.Fire += 10;
  if (answers?.social === 'deep') scores.Rain += 10;
  if (answers?.social === 'organizer') scores.Earth += 10;

  let element = 'Fire';
  try {
     // @ts-ignore
     element = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  } catch (e) {}

  const sliderVal = parseInt(answers?.flavor || "50");
  let product = "Snapple Elements";
  if (sliderVal < 40) product = "Snapple Peach Tea";
  else if (sliderVal > 70) product = "Snapple Kiwi Strawberry";
  else product = "Snapple Lemon Tea";

  const tags = [];
  if (answers?.sustainability === 'yes') tags.push("Eco Warrior");
  if (parseInt(answers?.variety || "0") > 70) tags.push("Flavor Adventurer");
  
  // Handle array check safely
  const values = Array.isArray(answers?.values) ? answers.values : [];
  if (values.includes('taste')) tags.push("Taste Seeker");

  return {
    element,
    product,
    desc: `Based on your vibe, this is your perfect match.`,
    tags,
    avatarUrl: null 
  };
}

// --- MAIN API HANDLER ---
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers } = body;
    const apiKey = process.env.OPENAI_API_KEY;

    // 1. If no API Key, use Mock Data
    if (!apiKey) {
      // Simulate delay
      await new Promise(r => setTimeout(r, 1000)); 
      return NextResponse.json(calculateMockResult(answers));
    }

    // 2. If API Key exists, use OpenAI
    const openai = new OpenAI({ apiKey });
    const baseResult = calculateMockResult(answers);

    // Only generate 1 image
    const imagePrompt = `A flat vector art avatar of a character representing the ${baseResult.element} element. Style: Gen Z modern, vibrant colors. Holding a bottle of ${baseResult.product}.`;

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });

    return NextResponse.json({
      ...baseResult,
      avatarUrl: imageResponse.data[0].url
    });

  } catch (error) {
    console.error("API Error:", error);
    // Fallback to mock data if anything fails
    return NextResponse.json(calculateMockResult({}));
  }
}
