import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  X,
  Volume2,
  VolumeX,
  User,
  HardHat,
  ShieldCheck,
  Building2,
  Landmark,
  Wheat,
  Globe,
  Lightbulb
} from 'lucide-react';

export const PortalUserGuideModal = ({ isOpen, onClose }) => {
  const {
    currentUser,
    language,
    setLanguage,
    speakText,
    stopSpeaking,
    isSpeaking,
    fontSize,
    setFontSize
  } = useApp();

  const currentRole = currentUser?.role || 'citizen';
  const [activeTab, setActiveTab] = useState(
    currentRole === 'epr' ? 'epr' :
    currentRole === 'supervisor' ? 'supervisor' :
    currentRole === 'worker' ? 'worker' :
    currentRole === 'municipality' ? 'municipality' : 'citizen'
  );

  useEffect(() => {
    if (currentUser?.role) {
      setActiveTab(currentUser.role);
    }
  }, [currentUser]);

  // Lock body scroll on modal open
  useEffect(() => {
    if (!isOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
      stopSpeaking();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Multilingual Guide Content for 6 Personas across 6 Indian Languages
  const guideData = {
    en: {
      title: "Interactive User Guide & Walkthrough",
      subtitle: "Select a portal below to see step-by-step instructions. Click 'Listen' to hear spoken instructions.",
      listenBtn: "Listen Guide",
      stopBtn: "Stop Audio",
      fontSizeLabel: "Text Size:",
      tabs: {
        citizen: "Citizen",
        worker: "Sanitation Hero",
        supervisor: "Ward Supervisor",
        epr: "Paid Corporate EPR",
        farmer: "Farmer (Agro-Stubble)",
        municipality: "MRF & Municipality"
      },
      citizen: {
        heading: "Citizen Portal — Simple 2-Bin Waste Reporting & Live Tracking",
        steps: [
          { title: "1. 2-Bin Source Segregation", desc: "Separate waste at home into Dry Recyclables (plastic, paper, metal) and Wet Organic waste. No complicated plastic sorting required." },
          { title: "2. Report Dump / Littering", desc: "Click 'Report Garbage Dump', snap a photo, confirm GPS location, and submit. The system routes it directly to your ward compactor truck." },
          { title: "3. Live Vehicle Radar", desc: "Track municipal waste collection compactor trucks live on the GPS radar. Ring the arrival bell when the truck approaches your gate." },
          { title: "4. Earn & Redeem Green Points", desc: "Receive civic Green Points in your wallet for timely reporting and verifying cleanups. Redeem points for grocery coupons or municipal tax discounts." }
        ]
      },
      worker: {
        heading: "Sanitation Hero Portal — Route Navigation & Verified Cleanups",
        steps: [
          { title: "1. Shift Attendance & PPE Check", desc: "Punch your digital shift attendance. Confirm wearing mandatory safety gloves, reflective vest, and face mask." },
          { title: "2. GPS Optimized Pickup Route", desc: "View dynamic pickup route optimized to avoid traffic and save fuel. Turn-by-turn navigation directly to assigned garbage spots." },
          { title: "3. Geostamped Photo Verification", desc: "After clearing waste, upload a timestamped photo of the clean curb. AI and ward supervisor verify the clean condition." },
          { title: "4. Mechanized Escalation", desc: "For hazardous or bulky debris, click 'Escalate for JCB/Tipper' with one tap. Zero manual touching of dangerous waste." }
        ]
      },
      supervisor: {
        heading: "Ward Supervisor Hub — Real-Time Triage & Fleet Audit",
        steps: [
          { title: "1. Triage Incoming Reports", desc: "Review incoming citizen complaints with photo evidence and GPS coordinates. Assign to the nearest sanitation hero crew." },
          { title: "2. Automated Weighbridge Slips", desc: "Audit electronic load-cell weighbridge slips. Verify gross and tare weight logged automatically with zero operator tampering." },
          { title: "3. SLA & Escalation Ladder", desc: "Monitor complaints against the 8-hour SLA deadline. Automated escalation flags overdue items to the Zonal Executive Engineer." },
          { title: "4. Hotspot Elimination", desc: "Transform recurrent garbage spots into clean zones by deploying community bins, CCTV surveillance, or green planters." }
        ]
      },
      epr: {
        heading: "Paid Corporate EPR Portal — CPCB Quotas & Worker Funding",
        steps: [
          { title: "1. Strict B2B Rule (Paid Companies Only)", desc: "EPR credits are purchased exclusively by FMCG corporate brands and importers to satisfy CPCB recycling mandates. Zero connection with citizen waste." },
          { title: "2. Purchase Certified Plastic Credits", desc: "Browse available Category I (PET), II (HDPE), and III (MLP) recycled bales from certified municipal MRF facilities." },
          { title: "3. Cryptographic CPCB Certificates", desc: "Download tamper-proof compliance certificates backed by SHA-256 blockchain circular ledger hashes for annual audit filing." },
          { title: "4. 100% Worker Salary Funding", desc: "Corporate credit purchase fees directly fund the baseline monthly wages of frontline municipal sanitation heroes." }
        ]
      },
      farmer: {
        heading: "Farmer Portal — Zero Stubble Burning & 40% DBT Profit Share",
        steps: [
          { title: "1. Book Free Municipal Stubble Transport", desc: "Instead of burning crop residue in the field, book a free municipal collection truck on the app. Enter land acres and crop type." },
          { title: "2. Automated Field Pickup", desc: "Municipal transport collects bundled paddy/wheat parali directly from the farm gate and weighs it at the MRF entrance." },
          { title: "3. Bio-Methanation Conversion", desc: "Harvested crop stubble is shredded and processed in industrial anaerobic digesters into clean Compressed Biogas (CBG) and organic compost." },
          { title: "4. 40% Net Profit Share via DBT", desc: "When biogas and organic fertilizer are sold on the marketplace, 40% of net profits are credited directly into your bank account via Direct Benefit Transfer." }
        ]
      },
      municipality: {
        heading: "MRF & Municipality Office — 5-Step Secondary Sorting Pipeline",
        steps: [
          { title: "Step 1: Automated Weighbridge", desc: "Electronic dual load-cell scales record gross and tare weights automatically, generating an anti-tamper digital slip." },
          { title: "Step 2: Trommel & Air Density Split", desc: "60mm revolving trommel eliminates fine grit/dust; ballistic air classifier splits 2D light films from 3D rigid plastics/cans." },
          { title: "Step 3: Magnetic & Eddy Current", desc: "Overband electromagnet continuously captures steel cans; high-speed eddy current ejects 98%+ pure aluminium beverage cans." },
          { title: "Step 4: Optical NIR & AI Sensors", desc: "Near-Infrared lasers detect polymer chemistry, blasting pure PET, HDPE, and MLP into dedicated chutes with 99.5% purity." },
          { title: "Step 5: Hydraulic 400kg Baling", desc: "Sorted scrap is compressed into dense 400kg QR-coded export cubes for corporate EPR allocation and transparent B2B auctions." }
        ]
      }
    },
    hi: {
      title: "उपयोगकर्ता मार्गदर्शिका (User Guide)",
      subtitle: "पोर्टल कैसे काम करता है जानने के लिए नीचे टैब चुनें। आवाज़ में सुनने के लिए 'आवाज़ में सुनें' पर क्लिक करें।",
      listenBtn: "आवाज़ में सुनें",
      stopBtn: "आवाज़ बंद करें",
      fontSizeLabel: "अक्षर आकार:",
      tabs: {
        citizen: "नागरिक (Citizen)",
        worker: "सफाई मित्र (Worker)",
        supervisor: "वार्ड सुपरवाइजर",
        epr: "कॉर्पोरेट ईपीआर (EPR)",
        farmer: "किसान (पराली प्रबंधन)",
        municipality: "एमआरएफ व नगर पालिका"
      },
      citizen: {
        heading: "नागरिक पोर्टल — 2-बिन कचरा रिपोर्टिंग और लाइव ट्रैकिंग",
        steps: [
          { title: "1. घर पर गीला और सूखा कचरा अलग करें", desc: "घर पर सिर्फ दो हिस्से बनाएं: सूखा कचरा (प्लास्टिक, कागज़, धातु) और गीला कचरा। प्लास्टिक के प्रकार छांटने की कोई जरूरत नहीं।" },
          { title: "2. कचरे के ढेर की फोटो खींचें", desc: "'कचरा रिपोर्ट करें' बटन दबाएं, फोटो खींचें, लोकेशन पुष्टि करें। सूचना तुरंत आपके वार्ड की गाड़ी को भेज दी जाती है।" },
          { title: "3. लाइव गाड़ी रडार ट्रैक करें", desc: "कचरा उठाने वाली गाड़ी को जीपीएस पर लाइव देखें। गाड़ी पास आने पर घंटी बजाकर सूचना पाएं।" },
          { title: "4. ग्रीन पॉइंट्स कमाएं", desc: "सफाई रिपोर्ट करने और पुष्टि करने पर अपने वॉलेट में ग्रीन पॉइंट्स पाएं। इन्हें छूट और कूपन में बदलें।" }
        ]
      },
      worker: {
        heading: "सफाई मित्र पोर्टल — दैनिक कार्य और सुरक्षित सफाई",
        steps: [
          { title: "1. हाजिरी व सुरक्षा किट (PPE)", desc: "अपनी डिजिटल हाजिरी लगाएं। दस्ताने, मास्क और सुरक्षा जैकेट पहनना सुनिश्चित करें।" },
          { title: "2. जीपीएस द्वारा रूट देखें", desc: "कचरा उठाने के लिए सबसे आसान और कम दूरी वाला रास्ता देखें, जिससे समय और ईंधन दोनों बचें।" },
          { title: "3. सफाई के बाद फोटो अपलोड करें", desc: "जगह साफ करने के बाद साफ सड़क की फोटो अपलोड करें। सुपरवाइजर तुरंत इसे सत्यापित करेंगे।" },
          { title: "4. भारी कचरे के लिए मशीनरी मांगें", desc: "खतरनाक या भारी मलबे के लिए एक क्लिक पर जेसीबी/टिपर बुलाएं। हाथ से छूने की जरूरत नहीं।" }
        ]
      },
      supervisor: {
        heading: "वार्ड सुपरवाइजर हब — शिकायतों का निपटारा और वजन जांच",
        steps: [
          { title: "1. शिकायतों की समीक्षा", desc: "नागरिकों द्वारा भेजी गई फोटो और लोकेशन देखकर नजदीकी सफाई टीम को तुरंत काम सौंपें।" },
          { title: "2. स्वचालित धर्मकांटा पर्ची जांच", desc: "इलेक्ट्रॉनिक धर्मकांटे की स्वचालित पर्ची देखें। बिना मानवीय हस्तक्षेप के सही वजन दर्ज होता है।" },
          { title: "3. समय सीमा (SLA) निगरानी", desc: "8 घंटे के भीतर काम पूरा करने की निगरानी करें। देरी होने पर मामला उच्च अधिकारी को जाता है।" },
          { title: "4. स्थायी समाधान", desc: "बार-बार कचरा फेंकने वाली जगहों पर डस्टबिन लगाएं, पेड़ लगाएं या निगरानी कैमरे लगाएं।" }
        ]
      },
      epr: {
        heading: "कॉर्पोरेट ईपीआर पोर्टल — केवल कंपनियों के लिए (नागरिकों से कोई संबंध नहीं)",
        steps: [
          { title: "1. केवल पंजीकृत कंपनियों के लिए", desc: "ईपीआर क्रेडिट केवल बड़ी कंपनियां (FMCG) अपने कानूनी लक्ष्य पूरे करने के लिए खरीदती हैं। नागरिकों को ईपीआर क्रेडिट नहीं मिलते।" },
          { title: "2. प्रमाणित प्लास्टिक क्रेडिट खरीदें", desc: "सरकारी मान्यता प्राप्त एमआरएफ से रिसाइकिल किए गए पीईटी, एचडीपीई और प्लास्टिक के बंडल खरीदें।" },
          { title: "3. सरकारी CPCB प्रमाण पत्र प्राप्त करें", desc: "सालाना ऑडिट व फाइलिंग के लिए डिजिटल SHA-256 प्रमाण पत्र डाउनलोड करें।" },
          { title: "4. सफाई कर्मियों का वेतन भुगतान", desc: "कंपनियों द्वारा जमा की गई फीस से हमारे सफाई मित्रों का मासिक मूल वेतन दिया जाता है।" }
        ]
      },
      farmer: {
        heading: "किसान पोर्टल — पराली जलाना बंद और 40% सीधा मुनाफा",
        steps: [
          { title: "1. मुफ्त सरकारी पराली गाड़ी बुक करें", desc: "खेत में पराली जलाने के बजाय ऐप पर मुफ्त गाड़ी बुक करें। अपनी जमीन का रकबा दर्ज करें।" },
          { title: "2. खेत से सीधी लोडिंग", desc: "नगर निगम की गाड़ी आपके खेत के पास आकर पराली लोड करेगी और धर्मकांटे पर वजन करेगी।" },
          { title: "3. बायोगैस और जैविक खाद निर्माण", desc: "पराली को फैक्ट्री में कंप्रेस्ड बायोगैस (CBG) और उत्तम जैविक खाद में बदला जाता है।" },
          { title: "4. 40% मुनाफा सीधे बैंक खाते में (DBT)", desc: "गैस और खाद की बिक्री से होने वाले शुद्ध मुनाफे का 40% हिस्सा सीधे आपके बैंक खाते में DBT द्वारा भेजा जाता है।" }
        ]
      },
      municipality: {
        heading: "एमआरएफ व नगर पालिका — 5-चरणीय स्वचालित कचरा छंटाई",
        steps: [
          { title: "चरण 1: स्वचालित धर्मकांटा", desc: "इलेक्ट्रॉनिक लोड सेल से गाड़ियों का सही वजन दर्ज होता है और बिना छेड़छाड़ वाली पर्ची बनती है।" },
          { title: "चरण 2: ट्रोमेल व एयर सेपरेटर", desc: "60mm की जाली से धूल-मिट्टी अलग होती है और हवा के झोंके से हल्की पन्नी भारी बोतलों से अलग होती है।" },
          { title: "चरण 3: चुंबक द्वारा धातु छंटाई", desc: "विशाल चुंबक लोहे के डिब्बे खींचता है और एडी करंट मशीन एल्युमिनियम कैन बाहर फेंकती है।" },
          { title: "चरण 4: ऑप्टिकल एनआईआर व एआई सेंसर", desc: "लेजर किरणें प्लास्टिक के प्रकार (PET, HDPE, MLP) पहचानकर 99.5% शुद्धता से अलग करती हैं।" },
          { title: "चरण 5: 400 किग्रा हाइड्रोलिक बंडल", desc: "कचरे को 400 किलो के बंडलों में दबाकर क्यूआर कोड लगाया जाता है, जिसे कंपनियों को बेचा जाता है।" }
        ]
      }
    },
    kn: {
      title: "ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ (User Guide)",
      subtitle: "ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳನ್ನು ನೋಡಲು ಕೆಳಗಿನ ಟ್ಯಾಬ್ ಆಯ್ಕೆಮಾಡಿ. ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಲು 'ಕೇಳಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
      listenBtn: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ",
      stopBtn: "ನಿಲ್ಲಿಸಿ",
      fontSizeLabel: "ಅಕ್ಷರ ಗಾತ್ರ:",
      tabs: {
        citizen: "ನಾಗರಿಕರು (Citizen)",
        worker: "ಸ್ವಚ್ಛತಾ ಮಿತ್ರರು (Worker)",
        supervisor: "ಮೇಲ್ವಿಚಾರಕರು (Supervisor)",
        epr: "ಕಾರ್ಪೊರೇಟ್ ಇಪಿಆರ್ (EPR)",
        farmer: "ರೈತರು (ಕೃಷಿ ತ್ಯಾಜ್ಯ)",
        municipality: "ಎಂಆರ್‌ಎಫ್ ಕೇಂದ್ರ"
      },
      citizen: {
        heading: "ನಾಗರಿಕ ಪೋರ್ಟಲ್ — ತ್ಯಾಜ್ಯ ವರದಿ ಮತ್ತು ವಾಹನ ಟ್ರ್ಯಾಕಿಂಗ್",
        steps: [
          { title: "1. ಒಣ ಮತ್ತು ಹಸಿ ಕಸ ಬೇರ್ಪಡಿಸಿ", desc: "ಮನೆಯಲ್ಲಿ ಒಣ ಕಸ ಮತ್ತು ಹಸಿ ಕಸವನ್ನು ಬೇರೆ ಬೇರೆಯಾಗಿ ಇರಿಸಿ. ಯಾವುದೇ ಸಂಕೀರ್ಣ ಪ್ಲಾಸ್ಟಿಕ್ ವಿಂಗಡಣೆ ಅಗತ್ಯವಿಲ್ಲ." },
          { title: "2. ಕಸದ ಫೋಟೋ ತೆಗೆದು ವರದಿ ಮಾಡಿ", desc: "'ಕಸ ವರದಿ ಮಾಡಿ' ಕ್ಲಿಕ್ ಮಾಡಿ, ಫೋಟೋ ತೆಗೆದು ಕಳುಹಿಸಿ. ನಿಮ್ಮ ವಾರ್ಡ್‌ನ ಕಾಂಪ್ಯಾಕ್ಟರ್ ವಾಹನಕ್ಕೆ ತಕ್ಷಣ ಮಾಹಿತಿ ತಲುಪುತ್ತದೆ." },
          { title: "3. ಕಸದ ಗಾಡಿ ಲೈವ್ ರೇಡಾರ್", desc: "ಕಸ ಸಂಗ್ರಹ ವಾಹನವನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ನೇರವಾಗಿ ನೋಡಿ. ಗಾಡಿ ಹತ್ತಿರ ಬಂದಾಗ ಬೆಲ್ ಸದ್ದು ಕೇಳಿ ಕಸ ನೀಡಿ." },
          { title: "4. ಗ್ರೀನ್ ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಗಳಿಸಿ", desc: "ಸಮರ್ಪಕ ತ್ಯಾಜ್ಯ ನೀಡುವಿಕೆಗಾಗಿ ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಪಡೆದು ರಿಯಾಯಿತಿ ಕೂಪನ್‌ಗಳಾಗಿ ಬಳಸಿ." }
        ]
      },
      worker: {
        heading: "ಸ್ವಚ್ಛತಾ ಮಿತ್ರರ ಪೋರ್ಟಲ್ — ದೈನಂದಿನ ಕಾರ್ಯ ಮತ್ತು ಸುರಕ್ಷತೆ",
        steps: [
          { title: "1. ಹಾಜರಾತಿ ಮತ್ತು ಸುರಕ್ಷತಾ ಕಿಟ್", desc: "ಡಿಜಿಟಲ್ ಹಾಜರಾತಿ ದಾಖಲಿಸಿ. ಗ್ಲೌಸ್, ಮುಖಗವಸು ಮತ್ತು ಸುರಕ್ಷತಾ ಜಾಕೆಟ್ ಧರಿಸುವುದು ಕಡ್ಡಾಯ." },
          { title: "2. ಜಿಪಿಎಸ್ ಆಪ್ಟಿಮೈಸ್ಡ್ ಮಾರ್ಗ", desc: "ಕಡಿಮೆ ಇಂಧನ ಮತ್ತು ಸಮಯದಲ್ಲಿ ಕಸ ಎತ್ತಲು ಸಿದ್ಧಪಡಿಸಿದ ನಕ್ಷೆ ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸಿ." },
          { title: "3. ಸ್ವಚ್ಛತೆ ನಂತರ ಫೋಟೋ ಅಪ್‌ಲೋಡ್", desc: "ಸ್ಥಳವನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿದ ನಂತರ ಸ್ವಚ್ಛ ರಸ್ತೆಯ ಫೋಟೋ ಹಾಕಿ." },
          { title: "4. ಯಂತ್ರೋಪಕರಣ ಕರೆ", desc: "ಭಾರೀ ಅಥವಾ ಅಪಾಯಕಾರಿ ತ್ಯಾಜ್ಯಕ್ಕೆ ಜೆಸಿಬಿ ಅಥವಾ ಟಿಪ್ಪರ್ ಕರೆಯಿರಿ. ಕೈಯಿಂದ ಮುಟ್ಟಬೇಡಿ." }
        ]
      },
      supervisor: {
        heading: "ವಾರ್ಡ್ ಮೇಲ್ವಿಚಾರಕರ ಹಬ್ — ತ್ವರಿತ ನಿಯೋಜನೆ",
        steps: [
          { title: "1. ದೂರುಗಳ ಪರಿಶೀಲನೆ", desc: "ನಾಗರಿಕರಿಂದ ಬಂದ ಫೋಟೋ ಪರಿಶೀಲಿಸಿ ಹತ್ತಿರದ ಸ್ವಚ್ಛತಾ ಸಿಬ್ಬಂದಿಗೆ ತಕ್ಷಣ ಕಾರ್ಯ ನಿಯೋಜಿಸಿ." },
          { title: "2. ಎಲೆಕ್ಟ್ರಾನಿಕ್ ತೂಕದ ಚೀಟಿ ಪರಿಶೀಲನೆ", desc: "ಧರ್ಮಕಾಟಾದಲ್ಲಿ ದಾಖಲಾದ ನೈಜ ತೂಕದ ಚೀಟಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಭ್ರಷ್ಟಾಚಾರ ತಡೆಯಿರಿ." },
          { title: "3. ಸಮಯ ಮಿತಿ (SLA) ನಿಗಾ", desc: "8 ಗಂಟೆಗಳ ಒಳಗೆ ಕೆಲಸ ಮುಗಿಯುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ." },
          { title: "4. ಕಸದ ತಾಣ ಮುಕ್ತಿ", desc: "ಕಸ ಬೀಳುವ ಜಾಗದಲ್ಲಿ ಕಸದ ಬುಟ್ಟಿ ಇರಿಸಿ ಅಥವಾ ಗಿಡಗಳನ್ನು ನೆಡಿ." }
        ]
      },
      epr: {
        heading: "ಕಾರ್ಪೊರೇಟ್ ಇಪಿಆರ್ ಪೋರ್ಟಲ್ — ಪಾವತಿಸುವ ಕಂಪನಿಗಳಿಗೆ ಮಾತ್ರ",
        steps: [
          { title: "1. ಕಾರ್ಪೊರೇಟ್ ಬಿ2ಬಿ ನಿಯಮ (ನಾಗರಿಕರಿಗೆ ಸಂಬಂಧವಿಲ್ಲ)", desc: "ಇಪಿಆರ್ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಕಾರ್ಪೊರೇಟ್ ಎಫ್‌ಎಂಸಿಜಿ ಕಂಪನಿಗಳು ಮಾತ್ರ ಖರೀದಿಸುತ್ತವೆ." },
          { title: "2. ಮರುಬಳಕೆಯ ಪ್ಲಾಸ್ಟಿಕ್ ಕ್ರೆಡಿಟ್ ಖರೀದಿ", desc: "ಸರ್ಕಾರಿ ಮಾನದಂಡದ ಎಂಆರ್‌ಎಫ್‌ನಿಂದ ಮರುಬಳಕೆಯ ಪಿಇಟಿ ಮತ್ತು ಪ್ಲಾಸ್ಟಿಕ್ ಬಂಡಲ್‌ಗಳನ್ನು ಖರೀದಿಸಿ." },
          { title: "3. ಸಿಪಿಸಿಬಿ ಅಧಿಕೃತ ಪ್ರಮಾಣಪತ್ರ", desc: "ಕಾನೂನುಬದ್ಧ ಪರಿಶೀಲನೆಗಾಗಿ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ." },
          { title: "4. ಕಾರ್ಮಿಕರ ವೇತನ ಪಾವತಿ", desc: "ಕಂಪನಿಗಳು ಪಾವತಿಸುವ ಹಣದಿಂದ ನಮ್ಮ ಸ್ವಚ್ಛತಾ ಸಿಬ್ಬಂದಿಯ ಮೂಲ ವೇತನ ನೀಡಲಾಗುತ್ತದೆ." }
        ]
      },
      farmer: {
        heading: "ರೈತ ಪೋರ್ಟಲ್ — ಬೆಳೆ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ ಮತ್ತು 40% ಲಾಭಾಂಶ (DBT)",
        steps: [
          { title: "1. ಉಚಿತ ವಾಹನ ಬುಕ್ ಮಾಡಿ", desc: "ಹೊಲದಲ್ಲಿ ಬೆಳೆ ಉಳಿಕೆ ಸುಡುವ ಬದಲು ಉಚಿತ ಸಾರಿಗೆ ವಾಹನವನ್ನು ಮೊಬೈಲ್ ಮೂಲಕ ಬುಕ್ ಮಾಡಿ." },
          { title: "2. ಹೊಲದಿಂದ ನೇರ ಸಾಗಾಣಿಕೆ", desc: "ನಗರಸಭೆಯ ವಾಹನವು ಹೊಲದಿಂದ ತ್ಯಾಜ್ಯವನ್ನು ಸಂಗ್ರಹಿಸಿ ತೂಕ ಮಾಡುತ್ತದೆ." },
          { title: "3. ಸಿಬಿಜಿ ಜೈವಿಕ ಅನಿಲ ತಯಾರಿಕೆ", desc: "ತ್ಯಾಜ್ಯವನ್ನು ಸಂಸ್ಕರಿಸಿ ಪರಿಸರ ಸ್ನೇಹಿ ಸಿಬಿಜಿ ಅನಿಲ ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರ ತಯಾರಿಸಲಾಗುತ್ತದೆ." },
          { title: "4. 40% ಲಾಭ ನೇರ ರೈತರ ಖಾತೆಗೆ", desc: "ಮಾರಾಟದ ನಿವ್ವಳ ಲಾಭದ 40% ಮೊತ್ತವನ್ನು ಡಿಬಿಟಿ ಮೂಲಕ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ." }
        ]
      },
      municipality: {
        heading: "ಎಂಆರ್‌ಎಫ್ ಮತ್ತು ಪುರಸಭೆ — 5 ಹಂತದ ಸ್ವಯಂಚಾಲಿತ ವಿಂಗಡಣೆ",
        steps: [
          { title: "ಹಂತ 1: ಸ್ವಯಂಚಾಲಿತ ತೂಕ", desc: "ಡಿಜಿಟಲ್ ಲೋಡ್ ಸೆಲ್ ಮೂಲಕ ನಿಖರವಾದ ಕಸದ ತೂಕ ದಾಖಲಾಗುತ್ತದೆ." },
          { title: "ಹಂತ 2: ಟ್ರಾಮೆಲ್ ಮತ್ತು ಗಾಳಿ ವಿಭಜನೆ", desc: "60 ಮಿಮೀ ಪರದೆಯು ಧೂಳು ನಿವಾರಿಸುತ್ತದೆ ಮತ್ತು ಗಾಳಿಯ ಸಹಾಯದಿಂದ ಹಗುರ ಪ್ಲಾಸ್ಟಿಕ್ ಬೇರ್ಪಡುತ್ತದೆ." },
          { title: "ಹಂತ 3: ಕಾಂತೀಯ ಲೋಹ ಬೇರ್ಪಡಿಕೆ", desc: "ಉಕ್ಕಿನ ಡಬ್ಬಿಗಳನ್ನು ಮತ್ತು ಅಲ್ಯೂಮಿನಿಯಂ ಕ್ಯಾನ್‌ಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಲಾಗುತ್ತದೆ." },
          { title: "ಹಂತ 4: ಆಪ್ಟಿಕಲ್ ಎನ್‌ಐಆರ್ ಲೇಸರ್", desc: "ಪ್ಲಾಸ್ಟಿಕ್ ರಾಸಾಯನಿಕ ವಿಧಗಳನ್ನು ಗುರುತಿಸಿ 99.5% ಶುದ್ಧತೆಯೊಂದಿಗೆ ವಿಂಗಡಿಸುತ್ತದೆ." },
          { title: "ಹಂತ 5: 400 ಕೆಜಿ ಕ್ಯೂಆರ್ ಬಂಡಲ್‌ಗಳು", desc: "ತ್ಯಾಜ್ಯವನ್ನು 400 ಕೆಜಿ ಗಟ್ಟಿ ಬಂಡಲ್‌ಗಳಾಗಿ ಒತ್ತಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡಲಾಗುತ್ತದೆ." }
        ]
      }
    },
    ta: {
      title: "பயனர் வழிகாட்டி (User Guide)",
      subtitle: "பயன்படுத்தும் முறையை அறிய கீழே உள்ள பிரிவை தேர்ந்தெடுக்கவும். கேட்க 'ஒலி கேட்க' அழுத்தவும்.",
      listenBtn: "ஒலி கேட்க",
      stopBtn: "நிறுத்து",
      fontSizeLabel: "எழுத்து அளவு:",
      tabs: {
        citizen: "பொதுமக்கள் (Citizen)",
        worker: "தூய்மைப் பணியாளர் (Worker)",
        supervisor: "மேற்பார்வையாளர்",
        epr: "கார்ப்பரேட் இபிஆர் (EPR)",
        farmer: "விவசாயி (வைக்கோல்)",
        municipality: "எம்ஆர்எஃப் மையம்"
      },
      citizen: {
        heading: "பொதுமக்கள் தளம் — எளிய குப்பை அறிக்கை மற்றும் நேரடி கண்காணிப்பு",
        steps: [
          { title: "1. உலர் மற்றும் ஈரக் கழிவு பிரிப்பு", desc: "வீட்டிலேயே உலர் கழிவுகள் மற்றும் ஈரக் கழிவுகளை தனித்தனியாக பிரிக்கவும்." },
          { title: "2. குப்பையை புகைப்படம் எடுத்து பதிவு செய்க", desc: "'குப்பையை புகாரளி' என்பதை அழுத்தி, படம் எடுத்து அனுப்பவும். வாகனம் உடனே அனுப்பப்படும்." },
          { title: "3. குப்பை லாரி நேரடி ரேடார்", desc: "குப்பை சேகரிக்கும் லாரி எங்கு வருகிறது என்பதை மேப்பில் பார்த்து குப்பையை ஒப்படைக்கவும்." },
          { title: "4. கிரீன் பாயிண்ட்கள் பெறுக", desc: "சுத்தத்திற்கு உதவும் போது பாயிண்டுகள் கிடைக்கும். அதை சலுகைகளாக பயன்படுத்தலாம்." }
        ]
      },
      worker: {
        heading: "தூய்மைப் பணியாளர் தளம் — தினசரி பணி மற்றும் பாதுகாப்பு",
        steps: [
          { title: "1. வருகைப் பதிவு மற்றும் பாதுகாப்பு கவசம்", desc: "டிஜிட்டல் வருகை பதிவு செய்து, கையுறை மற்றும் முகக்கவசம் அணிவதை உறுதிப்படுத்தவும்." },
          { title: "2. ஜிபிஎஸ் பாதை வழிகாட்டல்", desc: "குறைந்த தூரத்தில் குப்பைகளை சேகரிக்க ஜிபிஎஸ் வழியைப் பின்பற்றவும்." },
          { title: "3. சுத்தம் செய்த பின் புகைப்படம்", desc: "சுத்தம் செய்த பிறகு தெளிவான படத்தை பதிவேற்றவும்." },
          { title: "4. கனரக இயந்திர உதவி", desc: "கனமான அல்லது ஆபத்தான கழிவுகளுக்கு ஜேசிபி உதவி கோரவும்." }
        ]
      },
      supervisor: {
        heading: "மேற்பார்வையாளர் மையம் — நேரடி பணி ஒதுக்கீடு",
        steps: [
          { title: "1. புகார்களை சரிபார்த்தல்", desc: "புகார்களை உடனடியாக பணியாளர்களுக்கு ஒதுக்கி தீர்வு காணவும்." },
          { title: "2. எடைச்சீட்டு சரிபார்ப்பு", desc: "தானியங்கி எடை மேடையில் பதிவான எடையை சரிபார்க்கவும்." },
          { title: "3. காலக்கெடு கண்காணிப்பு", desc: "8 மணி நேரத்திற்குள் பணி முடிவடைவதை உறுதி செய்யவும்." },
          { title: "4. நிரந்தர தூய்மை", desc: "அடிக்கடி குப்பை கொட்டும் இடங்களில் தொட்டிகள் அமைக்கவும்." }
        ]
      },
      epr: {
        heading: "கார்ப்பரேட் இபிஆர் தளம் — நிறுவனங்களுக்கு மட்டுமே",
        steps: [
          { title: "1. கார்ப்பரேட் நிறுவனங்களுக்கு மட்டுமே", desc: "இபிஆர் வரவுகள் சட்டப்பூர்வ இலக்குகளை பூர்த்தி செய்ய நிறுவனங்களால் வாங்கப்படுகின்றன." },
          { title: "2. பிளாஸ்டிக் வரவுகள் வாங்குதல்", desc: "மறுசுழற்சி செய்யப்பட்ட பிளாஸ்டிக் வரவுகளை வாங்கவும்." },
          { title: "3. அரசு சான்றிதழ் பெறுதல்", desc: "சிபிசிபி அங்கீகரிக்கப்பட்ட டிஜிட்டல் சான்றிதழை பதிவிறக்கவும்." },
          { title: "4. தொழிலாளர் ஊதியம்", desc: "நிறுவனங்கள் செலுத்தும் கட்டணம் தூய்மைப் பணியாளர்களின் சம்பளத்திற்கு செல்கிறது." }
        ]
      },
      farmer: {
        heading: "விவசாயிகள் தளம் — வைக்கோல் மேலாண்மை மற்றும் 40% வங்கிப் பயன்",
        steps: [
          { title: "1. இலவச வாகனம் முன்பதிவு", desc: "வைக்கோலை எரிக்காமல் இலவச வாகனத்தை மொபைலில் பதிவு செய்யவும்." },
          { title: "2. நிலத்தில் இருந்து சேகரிப்பு", desc: "அரசு வாகனம் வந்து வைக்கோலை ஏற்றிச் செல்லும்." },
          { title: "3. எரிவாயு மற்றும் உரம் தயாரிப்பு", desc: "வைக்கோல் சுத்தமான சிபிஜி எரிவாயு மற்றும் இயற்கை உரமாக மாற்றப்படுகிறது." },
          { title: "4. 40% லாபம் வங்கிக் கணக்கில் (DBT)", desc: "விற்பனை லாபத்தில் 40% நேரடியாக விவசாயிகளின் வங்கிக் கணக்கில் வரவு வைக்கப்படுகிறது." }
        ]
      },
      municipality: {
        heading: "நகராட்சி மற்றும் எம்ஆர்எஃப் — 5 கட்ட தானியங்கி பிரிப்பு",
        steps: [
          { title: "படி 1: தானியங்கி எடை மேடை", desc: "எடை தானாக துல்லியமாக கணினியில் பதிவாகிறது." },
          { title: "படி 2: துளை உருளை மற்றும் காற்று பிரிப்பு", desc: "தூசிகள் மற்றும் மெல்லிய பிளாஸ்டிக் தாள்கள் பிரிக்கப்படுகின்றன." },
          { title: "படி 3: காந்த பிரிப்பான்", desc: "இரும்பு மற்றும் அலுமினியம் கேன்கள் தனியாக பிரித்தெடுக்கப்படுகின்றன." },
          { title: "படி 4: ஆப்டிகல் சென்சார்கள்", desc: "பிளாஸ்டிக் வகைகளை லேசர் மூலம் 99.5% சுத்தமாக பிரிக்கிறது." },
          { title: "படி 5: 400 கிலோ கட்டுகள்", desc: "தரமான கட்டுகளாக மாற்றி விற்பனைக்கு அனுப்பப்படுகிறது." }
        ]
      }
    },
    te: {
      title: "వినియోగదారు మార్గదర్శిని (User Guide)",
      subtitle: "విధానాన్ని తెలుసుకోవడానికి దిగువ ట్యాబ్‌ను ఎంచుకోండి. వాయిస్‌లో వినడానికి 'వినండి' నొక్కండి.",
      listenBtn: "వినండి",
      stopBtn: "ఆపండి",
      fontSizeLabel: "అక్షరాల పరిమాణం:",
      tabs: {
        citizen: "పౌరులు (Citizen)",
        worker: "స్వచ్ఛతా వీరులు (Worker)",
        supervisor: "వార్డు సూపర్‌వైజర్",
        epr: "కార్పొరేట్ ఇపిఆర్ (EPR)",
        farmer: "రైతులు (వ్యర్థాల నిర్వహణ)",
        municipality: "ఎంఆర్‌ఎఫ్ కేంద్రం"
      },
      citizen: {
        heading: "పౌరుల పోర్టల్ — సులభమైన చెత్త నివేదిక మరియు ట్రాకింగ్",
        steps: [
          { title: "1. పొడి మరియు తడి చెత్త వేరుచేయండి", desc: "ఇంట్లోనే పొడి చెత్త మరియు తడి చెత్తను వేరుగా ఉంచండి." },
          { title: "2. చెత్త ఫోటో తీసి నివేదించండి", desc: "'చెత్త నివేదించండి' క్లిక్ చేసి ఫోటో పంపండి. వాహనం చేరుకుంటుంది." },
          { title: "3. లైవ్ వెహికల్ రాడార్", desc: "చెత్త వాహనాన్ని మ్యాప్‌లో చూసి రాకను తెలుసుకోండి." },
          { title: "4. గ్రీన్ పాయింట్లు పొందండి", desc: "పాయింట్లతో తగ్గింపులను పొందండి." }
        ]
      },
      worker: {
        heading: "స్వచ్ఛతా వీరుల పోర్టల్ — రోజువారీ విధులు",
        steps: [
          { title: "1. హాజరు మరియు సేఫ్టీ కిట్", desc: "హాజరు నమోదు చేసి గ్లోవ్స్, మాస్క్ ధరించండి." },
          { title: "2. జిపిఎస్ రూట్", desc: "త్వరగా చేరుకోవడానికి సులభమైన మార్గాన్ని అనుసరించండి." },
          { title: "3. శుభ్రపరిచిన ఫోటో అప్‌లోడ్", desc: "పని పూర్తయ్యాక ఫోటోను అప్‌లోడ్ చేయండి." },
          { title: "4. మెషినరీ సాయం", desc: "భారీ వ్యర్థాలకు జేసీబీ సాయం కోరండి." }
        ]
      },
      supervisor: {
        heading: "సూపర్‌వైజర్ హబ్ — వేగవంతమైన పరిష్కారాలు",
        steps: [
          { title: "1. ఫిర్యాదుల పరిశీలన", desc: "ఫిర్యాదులను త్వరగా సిబ్బందికి కేటాయించండి." },
          { title: "2. బరువు స్లిప్పుల తనిఖీ", desc: "ఎలక్ట్రానిక్ తూకం స్లిప్పులను ధృవీకరించండి." },
          { title: "3. గడువు పర్యవేక్షణ", desc: "8 గంటల్లో పరిష్కరించేలా చూడండి." },
          { title: "4. పరిశుభ్రత నిర్వహణ", desc: "చెత్త స్థలాల్లో డస్ట్‌బిన్లు ఏర్పాటు చేయండి." }
        ]
      },
      epr: {
        heading: "కార్పొరేట్ ఇపిఆర్ పోర్టల్ — కంపెనీల కోసం మాత్రమే",
        steps: [
          { title: "1. కంపెనీలకు మాత్రమే (పౌరులతో సంబంధం లేదు)", desc: "ఇపిఆర్ క్రెడిట్లను కంపెనీలు మాత్రమే కొనుగోలు చేస్తాయి." },
          { title: "2. రీసైకిల్ ప్లాస్టిక్ కొనుగోలు", desc: "ధృవీకరించబడిన ప్లాస్టిక్ నిల్వలను కొనుగోలు చేయండి." },
          { title: "3. అధికారిక సర్టిఫికేట్", desc: "సిపిసిబి అనుమతి పొందిన ధృవీకరణ పత్రాలను డౌన్‌లోడ్ చేయండి." },
          { title: "4. కార్మికుల వేతనం", desc: "ఈ నిధులతో స్వచ్ఛతా కార్మికుల వేతనాలు చెల్లించబడతాయి." }
        ]
      },
      farmer: {
        heading: "రైతు పోర్టల్ — వ్యర్థాల దహనం నివారణ & 40% లాభం (DBT)",
        steps: [
          { title: "1. ఉచిత వాహనం బుకింగ్", desc: "వ్యర్థాలను కాల్చకుండా మొబైల్‌లో ఉచిత రవాణాను బుక్ చేసుకోండి." },
          { title: "2. పొలం నుండి నేరుగా సేకరణ", desc: "మున్సిపల్ వాహనం వచ్చి వ్యర్థాలను తీసుకెళ్తుంది." },
          { title: "3. బయోగ్యాస్ మరియు ఎరువుల తయారీ", desc: "వ్యర్థాలు గ్యాస్ మరియు సేంద్రీయ ఎరువుగా మారుతాయి." },
          { title: "4. 40% లాభం నేరుగా ఖాతాలోకి (DBT)", desc: "నికర లాభంలో 40% నేరుగా రైతుల బ్యాంక్ ఖాతాలో జమ అవుతుంది." }
        ]
      },
      municipality: {
        heading: "మున్సిపాలిటీ & ఎంఆర్‌ఎఫ్ — 5 దశల ఆటోమేటిక్ విభజన",
        steps: [
          { title: "దశ 1: ఆటోమేటిక్ కాంటా", desc: "ఎలక్ట్రానిక్ బరువు పారదర్శకంగా రికార్డ్ అవుతుంది." },
          { title: "దశ 2: ట్రోమెల్ & గాలి విభజన", desc: "ధూళి మరియు ప్లాస్టిక్ కవర్లు విడిపోతాయి." },
          { title: "దశ 3: అయస్కాంత వేరుచేత", desc: "ఇనుము, అల్యూమినియం డబ్బాలు వేరవుతాయి." },
          { title: "దశ 4: ఆప్టికల్ సెన్సార్లు", desc: "ప్లాస్టిక్ రకాలను 99.5% స్వచ్ఛతతో గుర్తిస్తుంది." },
          { title: "దశ 5: 400 కేజీ బేల్స్", desc: "గట్టి బేల్స్‌గా ఒత్తి మార్కెట్‌కు సరఫరా చేస్తారు." }
        ]
      }
    },
    pa: {
      title: "ਯੂਜ਼ਰ ਗਾਈਡ (User Guide)",
      subtitle: "ਕਦਮ-ਦਰ-ਕਦਮ ਹਦਾਇਤਾਂ ਵੇਖਣ ਲਈ ਹੇਠਾਂ ਦਿੱਤੀ ਟੈਬ ਚੁਣੋ। ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣਨ ਲਈ 'ਸੁਣੋ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
      listenBtn: "ਸੁਣੋ (Listen)",
      stopBtn: "ਰੋਕੋ (Stop)",
      fontSizeLabel: "ਅੱਖਰਾਂ ਦਾ ਆਕਾਰ:",
      tabs: {
        citizen: "ਨਾਗਰਿਕ (Citizen)",
        worker: "ਸਫ਼ਾਈ ਸੇਵਕ (Worker)",
        supervisor: "ਸੁਪਰਵਾਈਜ਼ਰ",
        epr: "ਕਾਰਪੋਰੇਟ EPR",
        farmer: "ਕਿਸਾਨ (ਪਰਾਲੀ ਪ੍ਰਬੰਧਨ)",
        municipality: "MRF ਅਤੇ ਨਗਰ ਪਾਲਿਕਾ"
      },
      citizen: {
        heading: "ਨਾਗਰਿਕ ਪੋਰਟਲ — ਕੂੜਾ ਰਿਪੋਰਟਿੰਗ ਅਤੇ ਲਾਈਵ ਟਰੈਕਿੰਗ",
        steps: [
          { title: "1. ਗਿੱਲਾ ਅਤੇ ਸੁੱਕਾ ਕੂੜਾ ਵੱਖ ਕਰੋ", desc: "ਘਰ ਵਿੱਚ ਸਿਰਫ਼ ਸੁੱਕਾ ਅਤੇ ਗਿੱਲਾ ਕੂੜਾ ਵੱਖ ਰੱਖੋ।" },
          { title: "2. ਕੂੜੇ ਦੀ ਫੋਟੋ ਭੇਜੋ", desc: "'ਕੂੜਾ ਰਿਪੋਰਟ ਕਰੋ' ਦਬਾ ਕੇ ਫੋਟੋ ਭੇਜੋ। ਗੱਡੀ ਤੁਰੰਤ ਆਵੇਗੀ।" },
          { title: "3. ਲਾਈਵ ਗੱਡੀ ਰਾਡਾਰ", desc: "ਗੱਡੀ ਨੂੰ ਨਕਸ਼ੇ 'ਤੇ ਵੇਖੋ ਅਤੇ ਪਹੁੰਚਣ 'ਤੇ ਘੰਟੀ ਸੁਣ ਕੇ ਕੂੜਾ ਪਾਓ।" },
          { title: "4. ਗ੍ਰੀਨ ਪੁਆਇੰਟ ਪ੍ਰਾਪਤ ਕਰੋ", desc: "ਵਧੀਆ ਕੰਮ ਲਈ ਪੁਆਇੰਟ ਪ੍ਰਾਪਤ ਕਰੋ ਅਤੇ ਲਾਭ ਉਠਾਓ।" }
        ]
      },
      worker: {
        heading: "ਸਫ਼ਾਈ ਸੇਵਕ ਪੋਰਟਲ — ਰੋਜ਼ਾਨਾ ਡਿਊਟੀ ਅਤੇ ਸੁਰੱਖਿਆ",
        steps: [
          { title: "1. ਹਾਜ਼ਰੀ ਅਤੇ ਸੁਰੱਖਿਆ ਕਿੱਟ", desc: "ਹਾਜ਼ਰੀ ਲਗਾਓ ਅਤੇ ਦਸਤਾਨੇ ਤੇ ਮਾਸਕ ਪਾਉਣਾ ਯਕੀਨੀ ਬਣਾਓ।" },
          { title: "2. ਜੀਪੀਐਸ ਰੂਟ", desc: "ਘੱਟ ਸਮੇਂ ਵਿੱਚ ਕੂੜਾ ਚੁੱਕਣ ਲਈ ਸੌਖਾ ਰਸਤਾ ਵੇਖੋ।" },
          { title: "3. ਸਫ਼ਾਈ ਤੋਂ ਬਾਅਦ ਫੋਟੋ", desc: "ਜਗ੍ਹਾ ਸਾਫ਼ ਕਰਕੇ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ।" },
          { title: "4. ਮਸ਼ੀਨਰੀ ਦੀ ਮੰਗ", desc: "ਭਾਰੀ ਕੂੜੇ ਲਈ ਜੇਸੀਬੀ ਮੰਗਵਾਓ।" }
        ]
      },
      supervisor: {
        heading: "ਸੁਪਰਵਾਈਜ਼ਰ ਹੱਬ — ਸ਼ਿਕਾਇਤਾਂ ਦਾ ਤੁਰੰਤ ਹੱਲ",
        steps: [
          { title: "1. ਸ਼ਿਕਾਇਤਾਂ ਦੀ ਜਾਂਚ", desc: "ਸ਼ਿਕਾਇਤਾਂ ਵੇਖ ਕੇ ਤੁਰੰਤ ਟੀਮ ਨੂੰ ਕੰਮ ਸੌਂਪੋ।" },
          { title: "2. ਕੰਡੇ ਦੀ ਪਰਚੀ ਦੀ ਪੁਸ਼ਟੀ", desc: "ਇਲੈਕਟ੍ਰਾਨਿਕ ਕੰਡੇ ਦਾ ਅਸਲ ਵਜ਼ਨ ਚੈੱਕ ਕਰੋ।" },
          { title: "3. ਸਮਾਂ ਸੀਮਾ (SLA)", desc: "8 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਕੰਮ ਪੂਰਾ ਕਰਵਾਓ।" },
          { title: "4. ਪੱਕਾ ਹੱਲ", desc: "ਕੂੜੇ ਵਾਲੀ ਥਾਂ 'ਤੇ ਡਸਟਬਿਨ ਲਗਵਾਓ।" }
        ]
      },
      epr: {
        heading: "ਕਾਰਪੋਰੇਟ EPR ਪੋਰਟਲ — ਕੰਪਨੀਆਂ ਲਈ ਵਿਸ਼ੇਸ਼",
        steps: [
          { title: "1. ਸਿਰਫ਼ ਕੰਪਨੀਆਂ ਲਈ (ਨਾਗਰਿਕਾਂ ਨਾਲ ਕੋਈ ਸੰਬੰਧ ਨਹੀਂ)", desc: "EPR ਕ੍ਰੈਡਿਟ ਸਿਰਫ਼ ਵੱਡੀਆਂ ਕੰਪਨੀਆਂ ਵੱਲੋਂ ਖਰੀਦੇ ਜਾਂਦੇ ਹਨ।" },
          { title: "2. ਰੀਸਾਈਕਲ ਪਲਾਸਟਿਕ ਖਰੀਦੋ", desc: "ਪ੍ਰਮਾਣਿਤ ਪਲਾਸਟਿਕ ਬੰਡਲ ਖਰੀਦੋ।" },
          { title: "3. ਸਰਕਾਰੀ CPCB ਸਰਟੀਫਿਕੇਟ", desc: "ਕਾਨੂੰਨੀ ਜਾਂਚ ਲਈ ਡਿਜੀਟਲ ਸਰਟੀਫਿਕੇਟ ਡਾਊਨਲੋਡ ਕਰੋ।" },
          { title: "4. ਸਫ਼ਾਈ ਸੇਵਕਾਂ ਦੀ ਤਨਖਾਹ", desc: "ਕੰਪਨੀ ਦੀ ਫ਼ੀਸ ਨਾਲ ਸਫ਼ਾਈ ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਤਨਖਾਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।" }
        ]
      },
      farmer: {
        heading: "ਕਿਸਾਨ ਪੋਰਟਲ — ਪਰਾਲੀ ਸਾੜਨਾ ਬੰਦ ਅਤੇ 40% ਮੁਨਾਫ਼ਾ (DBT)",
        steps: [
          { title: "1. ਮੁਫ਼ਤ ਪਰਾਲੀ ਵਾਲੀ ਗੱਡੀ ਬੁੱਕ ਕਰੋ", desc: "ਖੇਤ ਵਿੱਚ ਪਰਾਲੀ ਸਾੜਨ ਦੀ ਬਜਾਏ ਐਪ 'ਤੇ ਮੁਫ਼ਤ ਸਰਕਾਰੀ ਟਰਾਲੀ ਬੁੱਕ ਕਰੋ।" },
          { title: "2. ਖੇਤ ਵਿੱਚੋਂ ਸਿੱਧੀ ਲਿਫਟਿੰਗ", desc: "ਨਗਰ ਨਿਗਮ ਦੀ ਗੱਡੀ ਤੁਹਾਡੇ ਖੇਤ ਵਿੱਚੋਂ ਪਰਾਲੀ ਚੁੱਕ ਕੇ ਕੰਡੇ 'ਤੇ ਵਜ਼ਨ ਕਰੇਗੀ।" },
          { title: "3. ਬਾਇਓਗੈਸ ਅਤੇ ਖਾਦ ਦੀ ਤਿਆਰੀ", desc: "ਪਰਾਲੀ ਨੂੰ ਕੰਪਰੈੱਸਡ ਬਾਇਓਗੈਸ (CBG) ਅਤੇ ਸ਼ੁੱਧ ਦੇਸੀ ਖਾਦ ਵਿੱਚ ਬਦਲਿਆ ਜਾਂਦਾ ਹੈ।" },
          { title: "4. 40% ਮੁਨਾਫ਼ਾ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ (DBT)", desc: "ਗੈਸ ਅਤੇ ਖਾਦ ਦੀ ਵਿਕਰੀ ਦੇ ਸ਼ੁੱਧ ਮੁਨਾਫ਼ੇ ਦਾ 40% ਹਿੱਸਾ ਸਿੱਧਾ ਕਿਸਾਨ ਦੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ DBT ਰਾਹੀਂ ਜਮ੍ਹਾਂ ਹੁੰਦਾ ਹੈ।" }
        ]
      },
      municipality: {
        heading: "MRF ਅਤੇ ਨਗਰ ਪਾਲਿਕਾ — 5 ਕਦਮੀਂ ਆਟੋਮੈਟਿਕ ਛਾਂਟੀ",
        steps: [
          { title: "ਕਦਮ 1: ਆਟੋਮੈਟਿਕ ਕੰਡਾ", desc: "ਇਲੈਕਟ੍ਰਾਨਿਕ ਕੰਡੇ 'ਤੇ ਬਿਨਾਂ ਛੇੜਛਾੜ ਸਹੀ ਵਜ਼ਨ ਦਰਜ ਹੁੰਦਾ ਹੈ।" },
          { title: "ਕਦਮ 2: ਟ੍ਰੋਮਲ ਅਤੇ ਹਵਾ ਛਾਂਟੀ", desc: "ਮਿੱਟੀ ਵੱਖ ਹੁੰਦੀ ਹੈ ਅਤੇ ਹਵਾ ਨਾਲ ਹਲਕਾ ਪਲਾਸਟਿਕ ਵੱਖ ਹੋ ਜਾਂਦਾ ਹੈ।" },
          { title: "ਕਦਮ 3: ਚੁੰਬਕ ਦੁਆਰਾ ਧਾਤ ਛਾਂਟੀ", desc: "ਲੋਹੇ ਦੇ ਡੱਬੇ ਅਤੇ ਐਲੂਮੀਨੀਅਮ ਕੈਨ ਵੱਖਰੇ ਨਿਕਲਦੇ ਹਨ।" },
          { title: "ਕਦਮ 4: ਆਪਟੀਕਲ NIR ਸੈਂਸਰ", desc: "ਲੇਜ਼ਰ ਕਿਰਨਾਂ ਪਲਾਸਟਿਕ ਦੀਆਂ ਕਿਸਮਾਂ ਨੂੰ 99.5% ਸ਼ੁੱਧਤਾ ਨਾਲ ਛਾਂਟਦੀਆਂ ਹਨ।" },
          { title: "ਕਦਮ 5: 400 ਕਿੱਲੋ ਬੰਡਲ (Bales)", desc: "400 ਕਿੱਲੋ ਦੇ ਕਿਊਆਰ ਕੋਡ ਵਾਲੇ ਬੰਡਲ ਬਣਾ ਕੇ ਕੰਪਨੀਆਂ ਨੂੰ ਵੇਚੇ ਜਾਂਦੇ ਹਨ।" }
        ]
      }
    }
  };

  const activeLang = guideData[language] || guideData.en;
  const currentGuide = activeLang[activeTab] || activeLang.citizen;

  // Speak aloud in selected language
  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const textToSpeak = currentGuide.heading + '. ' + currentGuide.steps.map(s => s.title + ': ' + s.desc).join('. ');
    speakText(textToSpeak, language);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-500/30 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                SBM 2.0 • SANKALP
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {activeLang.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {activeLang.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Assistant Button */}
            <button
              onClick={handleListen}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
              title="Listen aloud in your language"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? activeLang.stopBtn : activeLang.listenBtn}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Toolbar: Role Tabs + Language Switcher + Font Scaler */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Persona Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'citizen', label: activeLang.tabs.citizen, icon: User },
              { id: 'worker', label: activeLang.tabs.worker, icon: HardHat },
              { id: 'supervisor', label: activeLang.tabs.supervisor, icon: ShieldCheck },
              { id: 'epr', label: activeLang.tabs.epr, icon: Building2 },
              { id: 'farmer', label: activeLang.tabs.farmer, icon: Wheat },
              { id: 'municipality', label: activeLang.tabs.municipality, icon: Landmark }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    stopSpeaking();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Accessibility Settings (Language & Font) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Pill Selector */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              {[
                { code: 'en', label: 'EN' },
                { code: 'hi', label: 'हि' },
                { code: 'kn', label: 'ಕ' },
                { code: 'ta', label: 'த' },
                { code: 'te', label: 'తె' },
                { code: 'pa', label: 'ਪੰ' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    stopSpeaking();
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Font Size Scaler */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700">
              <span className="text-slate-400 font-bold text-[10px] mr-1">{activeLang.fontSizeLabel}</span>
              {['normal', 'large', 'xlarge'].map(size => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-black cursor-pointer ${
                    fontSize === size ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Active Guide Section Header */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-400 block mb-0.5">
                PORTAL WALKTHROUGH
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentGuide.heading}
              </h3>
            </div>
          </div>

          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGuide.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl transition-all space-y-2 group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed pl-9">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick FAQ / Safety Tip */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-emerald-400">Pro-Tip for Best Results:</span>
              <p>
                {activeTab === 'citizen' && "Keep dry waste in clean blue bins and wet kitchen waste in green bins. Clear separation at home allows 100% recycling at the municipal MRF."}
                {activeTab === 'worker' && "Always keep your phone GPS enabled during your route. Clean-evidence photos are automatically geotagged to prevent disputes."}
                {activeTab === 'supervisor' && "Review weighbridge load-cell slips daily to ensure zero informal scrap diversion."}
                {activeTab === 'epr' && "CPCB compliance certificates are minted immediately upon payment with SHA-256 hash. 100% of corporate fees fund sanitation worker salaries."}
                {activeTab === 'farmer' && "Booking stubble pickup is 100% free of charge. Your 40% profit share from biogas sales will be credited directly to your bank account via DBT."}
                {activeTab === 'municipality' && "The 5-step automated MRF processes 40 tons/day with 99.5% optical polymer purity."}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Swachhta Sangam • Fully Accessible Multilingual Interface</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
