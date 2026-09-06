import express from 'express';

const router = express.Router();

const BOT_RESPONSES = {
  en: {
    segregation: "Segregate your waste into 3 streams: Green Bin for Organic/Wet kitchen waste, Blue Bin for Dry recyclables (plastic, paper, glass), and Red Bag for Hazardous/Sanitary waste.",
    penalty: "Under Solid Waste Management (SWM) Rules 2016, handing over unsegregated mixed waste or open dumping carries a spot-fine ranging from ₹200 to ₹1,000 for households and up to ₹10,000 for commercial units, plus loss of civic property tax rebate points.",
    ewaste: "E-waste (broken phones, wiring, electronic boards) should NOT be placed in regular bins. Book a municipal e-waste pickup or drop it at Ward 12 MRF to earn EPR Green Credits.",
    tubelight: "⚡ Tube lights, CFL bulbs, and batteries contain toxic heavy metals (mercury & lead). They MUST be put in the 🔴 RED / BLACK BIN (Domestic Hazardous Waste). Never mix them with dry recyclables or kitchen waste! You can also book a dedicated hazardous pickup in the app.",
    coconut: "🥥 Coconut shells and husks are classified as organic/wet waste (Green Bin). In municipal processing, dry coconut husks are shredded into eco-coir or routed to biomass briquette processing to make clean fuel!",
    mixed_waste: "🟡 If you cannot segregate today, declare 'Mixed Waste' in the app! It will receive an Amber/Yellow digital tag and will be routed directly to our High-Tech Material Recovery Facility (MRF), where automated rotary trommel screens and magnetic separators safely recover recyclables before organics enter Bio-CNG digestion.",
    timing: "Doorstep municipal compactor trucks visit Ward 12 (Indiranagar) daily between 06:30 AM and 09:30 AM. You can track your truck's live GPS radar in real-time on the citizen home screen!",
    fallback: "I am Swachhta AI. You can ask me about wet/dry waste segregation, coconut shells, tube lights/batteries, mixed waste MRF routing, penalty rules, or live truck tracking!"
  },
  hi: {
    segregation: "कचरे को 3 भागों में अलग करें: गीले रसोई कचरे के लिए हरा डस्टबिन, सूखे रीसाइक्लेबल के लिए नीला डस्टबिन, और खतरनाक/सैनिटरी कचरे के लिए लाल बैग।",
    penalty: "ठोस अपशिष्ट प्रबंधन नियम 2016 के तहत खुले में या मिश्रित कचरा फेंकने पर ₹200 से ₹1,000 (व्यावसायिक के लिए ₹10,000 तक) का जुर्माना लग सकता है।",
    ewaste: "ई-कचरे को सामान्य कूड़ेदान में न डालें। ऐप से ई-कचरा पिकअप बुक करें या वार्ड 12 MRF केंद्र पर जमा करें।",
    tubelight: "⚡ ट्यूबलाइट, सीएफएल और बैटरी में पारा और जहरीली धातुएं होती हैं। इन्हें केवल 🔴 लाल डिब्बे (खतरनाक कचरा) में रखें।",
    coconut: "🥥 नारियल के छिलके और जटा गीले/जैविक कचरे (हरा डिब्बा) में जाते हैं। नगर निगम इन्हें बायो-मास और कॉयर में बदलता है।",
    mixed_waste: "🟡 यदि कचरा अलग नहीं हो सका, तो ऐप में 'मिक्स्ड वेस्ट' चुनें। यह हमारी हाई-टेक MRF सुविधा में जाएगा जहां ऑटोमैटिक मशीनों से रीसाइक्लेबल छांटे जाते हैं।",
    timing: "घर-घर कचरा संग्रहण प्रतिदिन सुबह 6:30 से 9:30 बजे के बीच होता है। आप होम स्क्रीन पर लाइव वाहन रडार देख सकते हैं।",
    fallback: "मैं स्वच्छता एआई हूँ। आप मुझसे गीले/सूखे कचरे के पृथक्करण, जुर्माने के नियमों या वाहन ट्रैकिंग के बारे में पूछ सकते हैं!"
  },
  kn: {
    segregation: "ತ್ಯಾಜ್ಯವನ್ನು 3 ಭಾಗಗಳಾಗಿ ವಿಂಗಡಿಸಿ: ಹಸಿ ಕಸಕ್ಕೆ ಹಸಿರು ಬುಟ್ಟಿ, ಒಣ ಕಸಕ್ಕೆ ನೀಲಿ ಬುಟ್ಟಿ ಮತ್ತು ಅಪಾಯಕಾರಿ ಕಸಕ್ಕೆ ಕೆಂಪು ಬ್ಯಾಗ್ ಬಳಸಿ.",
    penalty: "ಘನತ್ಯಾಜ್ಯ ನಿರ್ವಹಣಾ ನಿಯಮಾವಳಿ 2016ರ ಪ್ರಕಾರ ರಸ್ತೆಯಲ್ಲಿ ಕಸ ಎಸೆದರೆ ₹200 ರಿಂದ ₹1,000 ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ.",
    ewaste: "ಇ-ತ್ಯಾಜ್ಯವನ್ನು ಸಾಮಾನ್ಯ ಕಸದ ತೊಟ್ಟಿಗೆ ಹಾಕಬೇಡಿ. ವಿಶೇಷ ಇ-ತ್ಯಾಜ್ಯ ಪಿಕಪ್ ಕಾಯ್ದಿರಿಸಿ ಗ್ರೀನ್ ಪಾಯಿಂಟ್ಸ್ ಪಡೆಯಿರಿ.",
    tubelight: "⚡ ಟ್ಯೂಬ್ ಲೈಟ್‌ಗಳು ಮತ್ತು ಬ್ಯಾಟರಿಗಳನ್ನು ಕೆಂಪು ಬ್ಯಾಗ್‌ನಲ್ಲಿ ಇರಿಸಿ.",
    coconut: "🥥 ತೆಂಗಿನ ಚಿಪ್ಪುಗಳು ಹಸಿರು ಬುಟ್ಟಿಗೆ ಸೇರುತ್ತವೆ.",
    mixed_waste: "🟡 ಮಿಶ್ರ ತ್ಯಾಜ್ಯವನ್ನು ಹೈಟೆಕ್ MRF ಸೌಲಭ್ಯದಲ್ಲಿ ಯಂತ್ರಗಳಿಂದ ಬೇರ್ಪಡಿಸಲಾಗುತ್ತದೆ.",
    timing: "ಮನೆ-ಮನೆ ಕಸ ಸಂಗ್ರಹಣೆಯು ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 6:30 ರಿಂದ 9:30 ರವರೆಗೆ ನಡೆಯುತ್ತದೆ. ಲೈವ್ ವಾಹನವನ್ನು ರೇಡಾರ್‌ನಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    fallback: "ನಾನು ಸ್ವಚ್ಛತಾ AI. ತ್ಯಾಜ್ಯ ವಿಂಗಡಣೆ, ದಂಡದ ನಿಯಮಗಳು ಮತ್ತು ವಾಹನ ಟ್ರ್ಯಾಕಿಂಗ್ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಬಹುದು!"
  },
  ta: {
    segregation: "குப்பையை 3 வகைகளாகப் பிரிக்கவும்: ஈரக்கழிவுக்கு பச்சைத் தொட்டி, உலர் கழிவுக்கு நீலத் தொட்டி, அபாயகரமான கழிவுக்கு சிவப்பு பை.",
    penalty: "கழிவு மேலாண்மை விதிகளின்படி பொது இடங்களில் குப்பை கொட்டினால் ₹200 முதல் ₹1,000 வரை அபராதம் விதிக்கப்படும்.",
    ewaste: "மின்னணுக் கழிவுகளை சாதாரண தொட்டிகளில் போடாதீர்கள். செயலியில் பதிவு செய்து மறுசுழற்சி மையத்தில் ஒப்படைக்கவும்.",
    tubelight: "⚡ டியூப் லைட்டுகள் மற்றும் பேட்டரிகளை சிவப்பு பையில் போடவும்.",
    coconut: "🥥 தேங்காய் ஓடுகள் பச்சை தொட்டிக்கு உரியவை.",
    mixed_waste: "🟡 கலப்பு கழிவுகள் உயர் தொழில்நுட்ப MRF மையத்தில் பிரிக்கப்படும்.",
    timing: "வீட்டு குப்பை சேகரிப்பு தினமும் காலை 6:30 முதல் 9:30 வரை நடைபெறும். நேரடி வாகன ரேடாரை முகப்பு திரையில் பார்க்கலாம்.",
    fallback: "நான் ஸ்வச்சதா AI. குப்பை பிரித்தல், அபராத விதிகள் அல்லது வாகன கண்காணிப்பு பற்றி கேட்கலாம்!"
  },
  te: {
    segregation: "చెత్తను 3 విభాగాలుగా వేరు చేయండి: తడి చెత్తకు ఆకుపచ్చ డస్ట్‌బిన్, పొడి చెత్తకు నీలం డస్ట్‌బిన్, హానికరమైన వ్యర్థాలకు ఎరుపు బ్యాగ్.",
    penalty: "నిబంధనల ప్రకారం బహిరంగ ప్రదేశాల్లో చెత్త వేస్తే ₹200 నుండి ₹1,000 వరకు జరిమానా విధించబడుతుంది.",
    ewaste: "ఇ-వ్యర్థాలను సాధారణ చెత్తబుట్టలో వేయవద్దు. యాప్ ద్వారా ప్రత్యేక పికప్ బుక్ చేయండి.",
    tubelight: "⚡ ట్యూబ్ లైట్లు మరియు బ్యాటరీలను ఎరుపు సంచిలో వేయండి.",
    coconut: "🥥 కొబ్బరి చిప్పలు ఆకుపచ్చ డస్ట్‌బిన్‌కు చెందుతాయి.",
    mixed_waste: "🟡 మిశ్రమ వ్యర్థాలను హైటెక్ MRF ప్లాంట్‌లో వేరు చేస్తారు.",
    timing: "డోర్‌స్టెప్ చెత్త సేకరణ ప్రతిరోజూ ఉదయం 6:30 నుండి 9:30 వరకు జరుగుతుంది. లైవ్ రాడార్‌ను వీక్షించండి.",
    fallback: "నేను స్వచ్ఛతా AI. చెత్త విభజన, జరిమానా నిబంధనలు లేదా వాహన ట్రాకింగ్ గురించి అడగండి!"
  }
};

router.post('/chat', (req, res) => {
  const { message = '', language = 'en' } = req.body;
  const langKey = BOT_RESPONSES[language] ? language : 'en';
  const dict = BOT_RESPONSES[langKey];
  const query = message.toLowerCase();

  let reply = dict.fallback;
  if (query.includes('coconut') || query.includes('shell') || query.includes('नारियल') || query.includes('ತೆಂಗಿನ') || query.includes('தேங்காய்')) {
    reply = dict.coconut;
  } else if (query.includes('tube') || query.includes('light') || query.includes('cfl') || query.includes('bulb') || query.includes('battery') || query.includes('batteries') || query.includes('बैटरी') || query.includes('டூப்')) {
    reply = dict.tubelight;
  } else if (query.includes('fine') || query.includes('penalty') || query.includes('rule') || query.includes('जुर्माना') || query.includes('ದಂಡ') || query.includes('அபராதம்')) {
    reply = dict.penalty;
  } else if (query.includes('mix') || query.includes('unsegregat') || query.includes('mrf') || query.includes('मिश्रित') || query.includes('ಮಿಶ್ರ') || query.includes('கலப்பு')) {
    reply = dict.mixed_waste;
  } else if (query.includes('electronic') || query.includes('e-waste') || query.includes('phone') || query.includes('फोन') || query.includes('ಇ-ತ್ಯಾಜ್ಯ')) {
    reply = dict.ewaste;
  } else if (query.includes('truck') || query.includes('time') || query.includes('arrive') || query.includes('ward 12') || query.includes('vehicle') || query.includes('गाड़ी') || query.includes('ವಾಹನ')) {
    reply = dict.timing;
  } else if (query.includes('segregat') || query.includes('separate') || query.includes('wet') || query.includes('dry') || query.includes('गीला') || query.includes('सूखा')) {
    reply = dict.segregation;
  }

  return res.json({
    success: true,
    language: langKey,
    reply
  });
});

export default router;
