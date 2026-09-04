import express from 'express';

const router = express.Router();

const BOT_RESPONSES = {
  en: {
    segregation: "Segregate your waste into 3 streams: Green Bin for Organic/Wet kitchen waste, Blue Bin for Dry recyclables (plastic, paper, glass), and Red Bag for Hazardous/Sanitary waste.",
    penalty: "Under Solid Waste Management Rules 2016, littering or open dumping carries a spot-fine ranging from ₹200 to ₹1,000 for households and up to ₹10,000 for commercial units.",
    ewaste: "E-waste (broken phones, batteries, wiring) should NOT be placed in regular bins. Book a municipal e-waste pickup or drop it at Ward 12 MRF to earn EPR Green Credits.",
    timing: "Doorstep municipal collection operates daily between 06:30 AM and 09:30 AM in all urban sectors. You can track your truck's live GPS radar on the home screen.",
    fallback: "I am Swachhta AI. You can ask me about wet/dry waste segregation, penalty rules, e-waste disposal, or live truck tracking!"
  },
  hi: {
    segregation: "कचरे को 3 भागों में अलग करें: गीले रसोई कचरे के लिए हरा डस्टबिन, सूखे रीसाइक्लेबल के लिए नीला डस्टबिन, और खतरनाक/सैनिटरी कचरे के लिए लाल बैग।",
    penalty: "ठोस अपशिष्ट प्रबंधन नियम 2016 के तहत खुले में कचरा फेंकने पर ₹200 से ₹1,000 तक का जुर्माना लग सकता है।",
    ewaste: "ई-कचरे को सामान्य कूड़ेदान में न डालें। ऐप से ई-कचरा पिकअप बुक करें या वार्ड 12 MRF केंद्र पर जमा करें।",
    timing: "घर-घर कचरा संग्रहण प्रतिदिन सुबह 6:30 से 9:30 बजे के बीच होता है। आप होम स्क्रीन पर लाइव वाहन रडार देख सकते हैं।",
    fallback: "मैं स्वच्छता एआई हूँ। आप मुझसे गीले/सूखे कचरे के पृथक्करण, जुर्माने के नियमों या वाहन ट्रैकिंग के बारे में पूछ सकते हैं!"
  },
  kn: {
    segregation: "ತ್ಯಾಜ್ಯವನ್ನು 3 ಭಾಗಗಳಾಗಿ ವಿಂಗಡಿಸಿ: ಹಸಿ ಕಸಕ್ಕೆ ಹಸಿರು ಬುಟ್ಟಿ, ಒಣ ಕಸಕ್ಕೆ ನೀಲಿ ಬುಟ್ಟಿ ಮತ್ತು ಅಪಾಯಕಾರಿ ಕಸಕ್ಕೆ ಕೆಂಪು ಬ್ಯಾಗ್ ಬಳಸಿ.",
    penalty: "ಘನತ್ಯಾಜ್ಯ ನಿರ್ವಹಣಾ ನಿಯಮಾವಳಿ 2016ರ ಪ್ರಕಾರ ರಸ್ತೆಯಲ್ಲಿ ಕಸ ಎಸೆದರೆ ₹200 ರಿಂದ ₹1,000 ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ.",
    ewaste: "ಇ-ತ್ಯಾಜ್ಯವನ್ನು ಸಾಮಾನ್ಯ ಕಸದ ತೊಟ್ಟಿಗೆ ಹಾಕಬೇಡಿ. ವಿಶೇಷ ಇ-ತ್ಯಾಜ್ಯ ಪಿಕಪ್ ಕಾಯ್ದಿರಿಸಿ ಗ್ರೀನ್ ಪಾಯಿಂಟ್ಸ್ ಪಡೆಯಿರಿ.",
    timing: "ಮನೆ-ಮನೆ ಕಸ ಸಂಗ್ರಹಣೆಯು ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 6:30 ರಿಂದ 9:30 ರವರೆಗೆ ನಡೆಯುತ್ತದೆ. ಲೈವ್ ವಾಹನವನ್ನು ರೇಡಾರ್‌ನಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    fallback: "ನಾನು ಸ್ವಚ್ಛತಾ AI. ತ್ಯಾಜ್ಯ ವಿಂಗಡಣೆ, ದಂಡದ ನಿಯಮಗಳು ಮತ್ತು ವಾಹನ ಟ್ರ್ಯಾಕಿಂಗ್ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಬಹುದು!"
  },
  ta: {
    segregation: "குப்பையை 3 வகைகளாகப் பிரிக்கவும்: ஈரக்கழிவுக்கு பச்சைத் தொட்டி, உலர் கழிவுக்கு நீலத் தொட்டி, அபாயகரமான கழிவுக்கு சிவப்பு பை.",
    penalty: "கழிவு மேலாண்மை விதிகளின்படி பொது இடங்களில் குப்பை கொட்டினால் ₹200 முதல் ₹1,000 வரை அபராதம் விதிக்கப்படும்.",
    ewaste: "மின்னணுக் கழிவுகளை சாதாரண தொட்டிகளில் போடாதீர்கள். செயலியில் பதிவு செய்து மறுசுழற்சி மையத்தில் ஒப்படைக்கவும்.",
    timing: "வீட்டு குப்பை சேகரிப்பு தினமும் காலை 6:30 முதல் 9:30 வரை நடைபெறும். நேரடி வாகன ரேடாரை முகப்பு திரையில் பார்க்கலாம்.",
    fallback: "நான் ஸ்வச்சதா AI. குப்பை பிரித்தல், அபராத விதிகள் அல்லது வாகன கண்காணிப்பு பற்றி கேட்கலாம்!"
  },
  te: {
    segregation: "చెత్తను 3 విభాగాలుగా వేరు చేయండి: తడి చెత్తకు ఆకుపచ్చ డస్ట్‌బిన్, పొడి చెత్తకు నీలం డస్ట్‌బిన్, హానికరమైన వ్యర్థాలకు ఎరుపు బ్యాగ్.",
    penalty: "నిబంధనల ప్రకారం బహిరంగ ప్రదేశాల్లో చెత్త వేస్తే ₹200 నుండి ₹1,000 వరకు జరిమానా విధించబడుతుంది.",
    ewaste: "ఇ-వ్యర్థాలను సాధారణ చెత్తబుట్టలో వేయవద్దు. యాప్ ద్వారా ప్రత్యేక పికప్ బుక్ చేయండి.",
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
  if (query.includes('segregat') || query.includes('separate') || query.includes('wet') || query.includes('dry') || query.includes('गीला') || query.includes('ಸೂಕ್ತ') || query.includes('பிரி')) {
    reply = dict.segregation;
  } else if (query.includes('fine') || query.includes('penalty') || query.includes('rule') || query.includes('जुर्माना') || query.includes('ದಂಡ') || query.includes('அபராதம்')) {
    reply = dict.penalty;
  } else if (query.includes('electronic') || query.includes('battery') || query.includes('e-waste') || query.includes('फोन') || query.includes('ಇ-ತ್ಯಾಜ್ಯ')) {
    reply = dict.ewaste;
  } else if (query.includes('truck') || query.includes('time') || query.includes('arrive') || query.includes('vehicle') || query.includes('गाड़ी') || query.includes('ವಾಹನ')) {
    reply = dict.timing;
  }

  return res.json({
    success: true,
    language: langKey,
    reply
  });
});

export default router;
