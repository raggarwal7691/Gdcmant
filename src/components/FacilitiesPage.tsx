import React from "react";
import { Book, Cpu, Award, ShieldAlert, HeartHandshake, Compass } from "lucide-react";

interface FacilitiesPageProps {
  language: "en" | "hi";
}

export default function FacilitiesPage({ language }: FacilitiesPageProps) {
  const current = language === "en" ? {
    title: "College Facilities & Infrastructure",
    subtitle: "Nurturing Academic and Character Development",
    header: "State-of-Mind Amenities & Services",
    items: [
      {
        title: "ICT Smart Classrooms",
        icon: <Cpu className="w-8 h-8 text-[#1A3A6B]" />,
        desc: "Equipped with interactive smart-boards, high definition projector modules, and continuous high-speed optical fiber connectivity for remote webinars and visually-aided interactive educational lectures."
      },
      {
        title: "Digital + Physical Library",
        icon: <Book className="w-8 h-8 text-[#D4A017]" />,
        desc: "Our reading hall maintains 10,000+ reference volumes, research journals, and daily editorial papers. Students get unlimited high-speed credentials to access National Digital Library (NDLI) databases and e-ShodhSindhu portals."
      },
      {
        title: "Advanced Laboratories",
        icon: <Compass className="w-8 h-8 text-rose-600" />,
        desc: "Equipped with modern experiment setups, analytical balances, cathode ray oscilloscopes, and organic compounds synthesis benches adhering to standard safety norms under Dr. BRAU Agra curricula."
      },
      {
        title: "National Service Scheme (NSS)",
        icon: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
        desc: "Features a dedicated, highly decorated NSS unit hosting 100+ active volunteers. Renders dynamic 7-day special camps in village sectors, organizing Swachh Bharat Abhiyan, literacy crusades, and blood banks."
      },
      {
        title: "Rovers Rangers Scout Unit",
        icon: <Award className="w-8 h-8 text-[#D4A017]" />,
        desc: "Active scouting unit fostering student discipline, first-aid, disaster rescue simulation, camping skills, national integration values, and participation in state level scouting meets."
      },
      {
        title: "Sports & Annual Athletics",
        icon: <ShieldAlert className="w-8 h-8 text-teal-600" />,
        desc: "A massive physical playground hosting annual inter-collegiate volleyball, cricket, running, and kabaddi meets. Encourages student wellness and holistic mental balance."
      }
    ]
  } : {
    title: "महाविद्यालय की सुविधाएं और बुनियादी ढांचा",
    subtitle: "शैक्षणिक और सर्वांगीण चरित्र निर्माण का पोषण",
    header: "उत्कृष्ट छात्र केंद्रित सुविधाएं",
    items: [
      {
        title: "स्मार्ट क्लासरूम्स (ICT)",
        icon: <Cpu className="w-8 h-8 text-[#1A3A6B]" />,
        desc: "इंटरैक्टिव स्मार्ट-बोर्ड, हाई डेफिनिशन प्रोजेक्टर मॉड्यूल और सुचारू वाई-फाई नेटवर्क से लैस कक्षाएं, जहां छात्रों को तकनीकी माध्यम से कठिन विषयों को आसानी से समझाया जाता है।"
      },
      {
        title: "डिजिटल + भौतिक पुस्तकालय",
        icon: <Book className="w-8 h-8 text-[#D4A017]" />,
        desc: "१०,००० से अधिक संदर्भ पुस्तकों, पत्रिकाओं और समाचार पत्रों से सज्ज वाचनालय। छात्रों को नेशनल डिजिटल लाइब्रेरी (NDLI) और ई-शोधसिंधु जैसी राष्ट्रीय पहलों के लिए निःशुल्क एक्सेस प्रदान किया जाता है।"
      },
      {
        title: "उन्नत प्रयोगशालाएं",
        icon: <Compass className="w-8 h-8 text-rose-600" />,
        desc: "भौतिकी, रसायन विज्ञान और जैव-विज्ञान प्रयोगात्मक मॉड्यूल के लिए पूर्ण रूप से सुरक्षित और आधुनिक रासायनिक अभिकर्मकों तथा वैज्ञानिक उपकरणों से परिपूर्ण प्रयोगशालाएं।"
      },
      {
        title: "राष्ट्रीय सेवा योजना (NSS)",
        icon: <HeartHandshake className="w-8 h-8 text-emerald-600" />,
        desc: "१००+ स्वयंसेवकों की सक्रिय इकाई, जो मांट के ग्रामीण अंचलों में ७-दिवसीय विशेष शिविर, स्वच्छता अभियान, स्वास्थ्य जागरूकता और सामाजिक सुधार कार्यक्रमों का संचालन करती है।"
      },
      {
        title: "रोवर्स रेंजर्स स्काउन्टिंग",
        icon: <Award className="w-8 h-8 text-[#D4A017]" />,
        desc: "विद्यार्थियों में चरित्र-बल, प्राथमिक चिकित्सा कौशल, आपदा संवेदनशीलता, पर्वतारोहण, साहसिक खेल और राष्ट्रीय एकता की भावना विकसित करने वाली स्काउटर/गाइड इकाई।"
      },
      {
        title: "खेलकूद व एथलेटिक्स ग्राउंड",
        icon: <ShieldAlert className="w-8 h-8 text-teal-600" />,
        desc: "महाविद्यालय परिसर में वॉलीबॉल, एथलेटिक्स, कबड्डी और क्रिकेट गतिविधियों के आयोजन हेतु विस्तृत क्रीड़ा स्थल, जो प्रतिवर्ष अंतर-महाविद्यालय प्रतियोगताओं की मेजबानी करता है।"
      }
    ]
  };

  return (
    <div id="facilities-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div id="facilities-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Institutional Resources" : "संस्थागत संसाधन"}
        </span>
        <h1 id="facilities-title" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {current.title}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {current.subtitle}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {current.items.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-[#1A3A6B]/20 transition-all space-y-4">
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl w-14 h-14 flex items-center justify-center border border-gray-100">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A3A6B]">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
