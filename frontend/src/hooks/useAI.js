import { useState, useCallback } from 'react';
import { chatSystemPrompt } from '../data/mockData';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const isTamilText = (text = '') => /[\u0B80-\u0BFF]/.test(text);

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const getIntentReply = (userText = '') => {
  const normalized = userText.trim().toLowerCase();
  if (!normalized) return null;

  const tamil = isTamilText(normalized);

  const riceIntent =
    includesAny(normalized, ['rice', 'arisi', 'அரிசி']) &&
    includesAny(normalized, ['available', 'stock', 'have', 'in stock', 'கிடைக்க', 'இருக்க']);

  const sugarPriceIntent =
    includesAny(normalized, ['sugar', 'சர்க்கரை']) &&
    includesAny(normalized, ['price', 'rate', 'cost', 'விலை']);

  const oilStockIntent =
    includesAny(normalized, ['cooking oil', 'oil', 'எண்ணெய்']) &&
    includesAny(normalized, ['stock', 'available', 'have', 'in stock', 'கிடைக்க', 'இருக்க']);

  const wheatOrderIntent =
    includesAny(normalized, ['wheat flour', 'flour', 'atta', 'கோதுமை மாவு', 'ஆட்டா']) &&
    includesAny(normalized, ['order', 'place an order', 'book', 'ஆர்டர்', 'பதிவு']);

  const offersIntent = includesAny(normalized, [
    'offer',
    'offers',
    'deal',
    'deals',
    'today special',
    'todays offers',
    'இன்றைய சலுகை',
    'இன்றைய சலுகைகள்',
    'ஆஃபர்',
    'ஆஃபர்கள்',
  ]);

  const breadAvailabilityIntent =
    includesAny(normalized, ['fresh bread', 'bread']) &&
    includesAny(normalized, ['available', 'have', 'stock', 'in stock']);

  const cakePriceIntent =
    includesAny(normalized, ['birthday cake', 'cake']) &&
    includesAny(normalized, ['how much', 'price', 'cost', 'rate']);

  const muffinPreOrderIntent =
    includesAny(normalized, ['muffin', 'muffins']) &&
    includesAny(normalized, ['pre-order', 'preorder', 'order', 'book']);

  const egglessIntent = includesAny(normalized, ['eggless', 'without egg', 'no egg']);

  const specialsIntent = includesAny(normalized, [
    "today's specials",
    'todays specials',
    "today's special",
    'specials',
    'today special',
  ]);

  if (riceIntent) {
    return tamil
      ? 'ஆம், அரிசி கிடைக்கும். Rice 5kg பை ஒன்றின் விலை ₹320. தற்போது 5 பைகள் மட்டுமே உள்ளன, எனவே உடனே ஆர்டர் செய்வது நல்லது.'
      : 'Yes, rice is available. Rice 5kg is priced at ₹320 per bag. We currently have only 5 bags left, so ordering soon is recommended.';
  }

  if (sugarPriceIntent) {
    return tamil
      ? 'Sugar 1kg விலை ₹48. ஆனால் ஸ்டாக்கில் 2 பாக்கெட் மட்டுமே உள்ளது, விரைவாக ஆர்டர் செய்யவும்.'
      : 'Sugar 1kg is ₹48. Only 2 packets are left in stock, so please order soon.';
  }

  if (oilStockIntent) {
    return tamil
      ? 'ஆம், Cooking Oil 1L ஸ்டாக்கில் உள்ளது. விலை ₹180, தற்போது 20 பாட்டில்கள் கிடைக்கின்றன.'
      : 'Yes, Cooking Oil 1L is in stock. The price is ₹180, and 20 bottles are currently available.';
  }

  if (wheatOrderIntent) {
    return tamil
      ? 'கோதுமை மாவு (Wheat Flour 5kg) ஆர்டர் செய்யலாம். ஒரு பையின் விலை ₹280; தற்போது 8 பைகள் உள்ளன. தயவுசெய்து உங்கள் பெயர் மற்றும் டெலிவரி முகவரியை பகிரவும்.'
      : 'Sure, I can place an order for Wheat Flour 5kg. It costs ₹280 per bag and 8 bags are available. Please share your name and delivery address.';
  }

  if (offersIntent) {
    return tamil
      ? 'இன்றைய சலுகைகள்: Rice 5kg - ₹320, Cooking Oil 1L - ₹180, Tea Powder 500g - ₹190. புதிய ஆஃபர்கள் வந்தால் உடனே தெரிவிக்கலாம்.'
      : "Today's offers: Rice 5kg at ₹320, Cooking Oil 1L at ₹180, and Tea Powder 500g at ₹190. I can also notify you about new offers anytime.";
  }

  if (breadAvailabilityIntent) {
    return 'Yes, fresh bread is available right now. Bread loaf is ₹40, and we baked a fresh batch this morning. Would you like to reserve a few loaves?';
  }

  if (cakePriceIntent) {
    return 'Our birthday cake starts at ₹1,200. You can customize flavor, size, and message. Share your preferred pickup date and we can confirm the final quote.';
  }

  if (muffinPreOrderIntent) {
    return 'Yes, you can pre-order muffins. Muffins (4-pack) are ₹120, and we can keep them ready for your pickup slot. Please share your name and preferred pickup time.';
  }

  if (egglessIntent) {
    return 'Yes, we do have eggless options, including eggless birthday cakes and select muffins. Tell me what you need, and I will confirm availability for today.';
  }

  if (specialsIntent) {
    return "Today's bakery specials: Fresh Bread Loaf at ₹40, Buns (6-pack) at ₹55, and Croissants (4-pack) at ₹160. We also have custom cake slots open for evening pickup.";
  }

  return null;
};

// Fallback responses when API key is missing or fails
const chatFallbacks = [
  "Yes! Cooking Oil 1L is available for ₹180. We have 20 bottles in stock. Would you like to place an order? 🛒",
  "Rice 5kg is currently ₹320 per bag. Please note we're running low (only 5 bags left). I'd recommend ordering soon! 📦",
  "We're open from 8 AM to 10 PM daily. Our store is located at MG Road, Bangalore. Feel free to visit or order online!",
  "Sugar 1kg is available for ₹48, but we're almost out — only 2 packets remain. Order quickly before it's gone! ⚠️",
  "Today's best deals: Rice 5kg at ₹320 and Cooking Oil at ₹180. We also have Tea Powder 500g at ₹190. Need help ordering? 😊",
];

let fallbackIndex = 0;
const getFallback = () => {
  const response = chatFallbacks[fallbackIndex % chatFallbacks.length];
  fallbackIndex++;
  return response;
};

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendChatMessage = useCallback(async (conversationHistory, options = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const latestUserMessage = [...conversationHistory].reverse().find((msg) => msg.role === 'user')?.content || '';
      const intentReply = getIntentReply(latestUserMessage);

      if (intentReply) {
        await new Promise(r => setTimeout(r, 450));
        return intentReply;
      }

      if (!ANTHROPIC_API_KEY) {
        // Use fallback for demo without key
        await new Promise(r => setTimeout(r, 1200));
        return intentReply || options.fallback || getFallback();
      }
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 400,
          system: options.systemPrompt || chatSystemPrompt,
          messages: conversationHistory,
        }),
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      return data.content[0].text;
    } catch (err) {
      setError(err.message);
      await new Promise(r => setTimeout(r, 800));
      const latestUserMessage = [...conversationHistory].reverse().find((msg) => msg.role === 'user')?.content || '';
      const intentReply = getIntentReply(latestUserMessage);
      return intentReply || options.fallback || getFallback();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateMarketing = useCallback(async (formData, options = {}) => {
    setIsLoading(true);
    setError(null);

    const businessName = options.businessName || 'Sharma General Store';

    const fallbackContent = {
      instagram: `🎉 Big savings on ${formData.productName}! Get ${formData.offerPercent}% OFF this ${formData.occasion}. Limited stock available at ${businessName}! 🛒`,
      whatsapp: `Namaste! 🙏 Exciting offer from ${businessName}!\n\n✨ ${formData.offerPercent}% OFF on ${formData.productName}!\n📅 ${formData.occasion} Special\n⏰ Limited time offer!\n\nOrder now: 98765 43210`,
      facebook: `🎊 Celebrating ${formData.occasion} with amazing offers!\n\n💰 ${formData.offerPercent}% discount on ${formData.productName}\n🏪 Visit ${businessName}\n📍 Bangalore\n📞 Call: 98765 43210`,
      hashtags: [`#${formData.occasion?.replace(/\s/g, '')}Sale`, "#SharmaBangalore", "#MSMEIndia", "#LocalStore", "#Deals"],
      callToAction: "Order Now & Save Big! 🛍️",
    };

    try {
      if (!ANTHROPIC_API_KEY) {
        await new Promise(r => setTimeout(r, 2000));
        return fallbackContent;
      }
      const prompt = `Generate promotional marketing content for a small Indian business called "${businessName}".

Product: ${formData.productName}
Offer: ${formData.offerPercent}% discount
Occasion: ${formData.occasion}
Platform focus: ${formData.platform}

Return ONLY valid JSON (no markdown, no explanation):
{
  "instagram": "Instagram post text with emojis (max 150 chars, energetic)",
  "whatsapp": "WhatsApp message (friendly, conversational, max 200 chars, use line breaks)",
  "facebook": "Facebook post (engaging, include store details, max 180 chars)",
  "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "callToAction": "Short CTA phrase (max 8 words)"
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 600,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const text = data.content[0].text.replace(/```json|```/g, "").trim();
      return JSON.parse(text);
    } catch (err) {
      setError(err.message);
      await new Promise(r => setTimeout(r, 1000));
      return fallbackContent;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendChatMessage, generateMarketing, isLoading, error };
}

