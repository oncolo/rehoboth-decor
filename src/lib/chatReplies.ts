export type Lang = "en" | "am" | "om" | "ti";

interface Reply {
  keywords: string[];
  response: Record<Lang, string>;
}

const replies: Reply[] = [
  {
    keywords: ["hello", "hi", "hey", "selam", "salam", "ሰላም", "akkam", "nagaa"],
    response: {
      en: "👋 Welcome to Rehoboth Decor! How can we help you today?",
      am: "👋 ወደ ሀበሻ ዲኮር እንኳን ደህና መጡ! ዛሬ እንዴት ልንረዳዎ እንችላለን?",
      om: "👋 Baga Rehoboth Decor dhuftan! Maal gochuu dandeenyaa?",
      ti: "👋 ናብ ሃበሻ ዲኮር እንኳን ብደሓን! ብኸመይ ክንሕግዘኩም ንኽእል?",
    },
  },
  {
    keywords: ["wedding", "bride", "mels", "melse", "nikaah", "ሰርግ", "ሜልስ", "heeruma", "ሰርጋት"],
    response: {
      en: "💍 We offer full wedding decoration:\n\n• European Style Weddings\n• Traditional Mels / Melse\n• Nikaah ceremonies\n\nPackages from $1,000. Book a free consultation?",
      am: "💍 ሙሉ የሰርግ አስጌጥ:\n\n• ዩሮፒያን ስታይል\n• ባህላዊ ሜልስ / ሜልሴ\n• ኒካህ\n\nዋጋ ከ$1,000 ይጀምራል። ነፃ ምክር ያስይዙ?",
      om: "💍 Miidhagina heerumaa:\n\n• European Style\n• Mels / Melse\n• Nikaah\n\nGatiin $1,000 irraa. Marihatii bilisaa?",
      ti: "💍 ናይ ሰርግ ዝርዝር:\n\n• European Style\n• ሜልስ / ሜልሴ\n• ኒካህ\n\nዋጋ ካብ $1,000. ናይ ብዳዊ ምኽሪ?",
    },
  },
  {
    keywords: ["price", "cost", "how much", "budget", "ዋጋ", "ስንት", "gatii", "ክንደይ"],
    response: {
      en: "💰 Pricing:\n\n• Small: $1,000–$3,000\n• Weddings: $3,000–$10,000+\n• Corporate: custom quote\n\nBook a free consultation for exact pricing!",
      am: "💰 ዋጋ:\n\n• ትንሽ: $1,000–$3,000\n• ሰርግ: $3,000–$10,000+\n• ድርጅት: ልዩ ዋጋ\n\nለትክክለኛ ዋጋ ነፃ ምክር ያስይዙ!",
      om: "💰 Gatii:\n\n• Xixiqqaa: $1,000–$3,000\n• Heeruma: $3,000–$10,000+\n• Dhaabbata: addaa\n\nMarihatii bilisaa qabadhu!",
      ti: "💰 ዋጋ:\n\n• ንእሽቶ: $1,000–$3,000\n• ሰርጋት: $3,000–$10,000+\n• ትካል: ፍሉይ\n\nናይ ብዳዊ ምኽሪ ሓዝ!",
    },
  },
  {
    keywords: ["enkutatash", "new year", "እንቁጣጣሽ", "አዲስ ዓመት", "bara haaraa", "ሓዲሽ ዓመት"],
    response: {
      en: "🌸 Enkutatash is our specialty!\n\n• Adey Abeba flowers\n• Traditional Habesha fabrics\n• Gold & green arrangements\n\nBook early — dates fill fast!",
      am: "🌸 እንቁጣጣሽ ስፔሻሊቲያችን ነው!\n\n• አደይ አበባ\n• ሀበሻ ጨርቆች\n• ወርቃማ አቀናጃዎች\n\nቀን ቶሎ ይሞላል!",
      om: "🌸 Enkutatash addaa keenya!\n\n• Adey Abeba\n• Uffata Habesha\n• Warqee fi magariisaa\n\nDafii qabadhu!",
      ti: "🌸 እንቁጣጣሽ ፍሉይ ስፔሻሊቲና!\n\n• Adey Abeba\n• ሀበሻ ጨርቂ\n• ወርቂ ዝርዝር\n\nቀዲምካ ሓዝ!",
    },
  },
  {
    keywords: ["genna", "christmas", "ገና", "timkat", "ጥምቀት", "fasika", "ፋሲካ", "meskel", "መስቀል", "holiday", "eid", "ዒድ", "ayyaana"],
    response: {
      en: "🎉 We decorate for all Ethiopian holidays:\n\n• Genna 🕯️  • Timkat 💧\n• Fasika 🌿  • Meskel ✝️  • Eid 🌙\n\nCulturally authentic & stunning!",
      am: "🎉 ለሁሉም በዓላት:\n\n• ገና 🕯️  • ጥምቀት 💧\n• ፋሲካ 🌿  • መስቀል ✝️  • ዒድ 🌙",
      om: "🎉 Ayyaana hundaaf:\n\n• Genna 🕯️  • Timkat 💧\n• Fasika 🌿  • Meskel ✝️  • Eid 🌙",
      ti: "🎉 ናይ ኩሉ ቅዱሳት:\n\n• ገና 🕯️  • ጥምቀት 💧\n• ፋሲካ 🌿  • መስቀል ✝️  • ዒድ 🌙",
    },
  },
  {
    keywords: ["graduation", "corporate", "baby shower", "birthday", "ምሩቅ", "ልደት", "eebbifamuu", "ምሩቓን"],
    response: {
      en: "🎓 We handle all events:\n\n• Graduation parties\n• Baby showers 👶\n• Corporate galas\n• Birthday celebrations 🎂\n\nContact us for a custom quote!",
      am: "🎓 ሁሉም ዝግጅቶች:\n\n• ምርቃት\n• የልጅ ሻወር 👶\n• ድርጅት ጋላ\n• ልደት 🎂\n\nለልዩ ዋጋ ያነጋግሩን!",
      om: "🎓 Sagantaa hundaa:\n\n• Eebbifamuu\n• Baby shower 👶\n• Galaa dhaabbataa\n• Dhalootaa 🎂",
      ti: "🎓 ኩሉ ዝርዝር:\n\n• ምሩቓን\n• Baby shower 👶\n• ናይ ትካል ጋላ\n• ልደት 🎂",
    },
  },
  {
    keywords: ["book", "appointment", "consultation", "reserve", "ቀጠሮ", "አስይዝ", "qabadhu", "marihatii", "ቆጸራ"],
    response: {
      en: "📅 Book a FREE consultation!\n\n📞 +1 (484) 840-6162\n⏰ Mon–Sat, 9 AM – 6 PM EST\n\nWe respond within 24 hours!",
      am: "📅 ነፃ ምክር ያስይዙ!\n\n📞 +1 (484) 840-6162\n⏰ ሰኞ–ቅዳሜ፣ 9–6 PM\n\nበ24 ሰዓት ውስጥ እናነጋግርዎታለን!",
      om: "📅 Marihatii BILISAA!\n\n📞 +1 (484) 840-6162\n⏰ Wiixata–Sanbata, 9–6 PM",
      ti: "📅 ናይ ብዳዊ ምኽሪ!\n\n📞 +1 (484) 840-6162\n⏰ ሰኑይ–ቀዳም, 9–6 PM",
    },
  },
  {
    keywords: ["location", "where", "address", "philadelphia", "ቦታ", "የት", "iddoo", "ኣበይ"],
    response: {
      en: "📍 Based in Philadelphia, PA.\n\nWe serve:\n• Greater Philadelphia\n• NJ, DE, DC, MD\n• Nationwide events\n\nWe travel to you!",
      am: "📍 ፊላደልፊያ፣ ፔ ላይ ነን.\n\n• ታላቁ ፊላደልፊያ\n• NJ, DE, DC, MD\n• ሀገር አቀፍ\n\nወደ እርስዎ እንመጣለን!",
      om: "📍 Philadelphia, PA.\n\n• Naannoo Philadelphia\n• NJ, DE, DC, MD\n\nSi bira dhufna!",
      ti: "📍 Philadelphia, PA.\n\n• ዓቢ Philadelphia\n• NJ, DE, DC, MD\n\nናባኹም ንመጽእ!",
    },
  },
  {
    keywords: ["phone", "call", "whatsapp", "number", "ስልክ", "bilbila", "ስልኪ"],
    response: {
      en: "📞 +1 (484) 840-6162\n⏰ Mon–Sat, 9 AM – 6 PM EST\n\nTap WhatsApp below to chat instantly! 👇",
      am: "📞 +1 (484) 840-6162\n⏰ ሰኞ–ቅዳሜ፣ 9–6 PM\n\nWhatsApp ይጫኑ! 👇",
      om: "📞 +1 (484) 840-6162\n\nWhatsApp cuqaasi! 👇",
      ti: "📞 +1 (484) 840-6162\n\nWhatsApp ጠውቕ! 👇",
    },
  },
  {
    keywords: ["process", "how does it work", "steps", "ሂደት", "akkamitti", "tartiiba"],
    response: {
      en: "✨ Simple process:\n\n1️⃣ Free Consultation\n2️⃣ Custom Design\n3️⃣ Setup Day\n4️⃣ We clean up after\n\nYou relax, we handle it all!",
      am: "✨ ቀላል ሂደት:\n\n1️⃣ ነፃ ምክር\n2️⃣ ልዩ ዲዛይን\n3️⃣ የዝግጅት ቀን\n4️⃣ ማጽዳት\n\nእርስዎ ይዝናኑ!",
      om: "✨ Tartiiba salphaa:\n\n1️⃣ Marihatii Bilisaa\n2️⃣ Dizaayinii Addaa\n3️⃣ Guyyaa Sagantaa\n4️⃣ Qulqulleessuu",
      ti: "✨ ቀሊል ሂደት:\n\n1️⃣ ናይ ብዳዊ ምኽሪ\n2️⃣ ፍሉይ ዲዛይን\n3️⃣ ናይ ዝርዝር መዓልቲ\n4️⃣ ምጽራይ",
    },
  },
  {
    keywords: ["faq", "deposit", "cancel", "refund", "payment", "ክፍያ", "kaffaltii", "ክፍሊት"],
    response: {
      en: "❓ FAQ:\n\n💳 Deposit: 30% to reserve\n❌ Cancel 14+ days = full refund\n💰 Cash, Zelle, CashApp, Card\n⏱️ Setup: 3–5 hrs before event",
      am: "❓ ጥያቄዎች:\n\n💳 ቅድሚያ: 30%\n❌ 14+ ቀናት = ሙሉ ተመላሽ\n💰 ጥሬ፣ Zelle፣ CashApp፣ ካርድ",
      om: "❓ FAQ:\n\n💳 Duraa: 30%\n❌ Guyyaa 14+ = deebii guutuu\n💰 Cash, Zelle, CashApp",
      ti: "❓ ሕቶታት:\n\n💳 ቅድሚ: 30%\n❌ 14+ መዓልቲ = ምምላስ\n💰 Cash, Zelle, CashApp",
    },
  },
  {
    keywords: ["thank", "thanks", "አመሰግናለሁ", "galatoomi", "ነመስግን"],
    response: {
      en: "🙏 Thank you for choosing Rehoboth Decor! Feel free to ask anything else.",
      am: "🙏 ስለመረጡን እናመሰግናለን! ሌላ ጥያቄ ካለዎ ይጠይቁ።",
      om: "🙏 Filattaniif galatoomi! Gaaffii biraa gaafadhu.",
      ti: "🙏 ስለዝረጻኹም ነመስግን! ካልእ ሕቶ ሕተቱ።",
    },
  },
];

const fallback: Record<Lang, string> = {
  en: "Thank you! 😊\n\n📞 +1 (484) 840-6162\n⏰ Mon–Sat, 9 AM – 6 PM EST\n\nOr visit our Booking page.",
  am: "እናመሰግናለን! 😊\n\n📞 +1 (484) 840-6162\n⏰ ሰኞ–ቅዳሜ፣ 9–6 PM",
  om: "Galatoomi! 😊\n\n📞 +1 (484) 840-6162",
  ti: "ነመስግን! 😊\n\n📞 +1 (484) 840-6162",
};

export function getBotReply(input: string, lang: Lang = "en"): string {
  const lower = input.toLowerCase();
  for (const reply of replies) {
    if (reply.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return reply.response[lang];
    }
  }
  return fallback[lang];
}
