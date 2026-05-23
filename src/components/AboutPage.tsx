import React from "react";
import { BookOpen, Award, GraduationCap, Calendar, Users, Eye, Anchor } from "lucide-react";
import { motion } from "motion/react";

interface AboutPageProps {
  language: "en" | "hi";
  t: any;
}

export default function AboutPage({ language, t }: AboutPageProps) {
  // English version
  const contentEn = {
    historyTitle: "Institutional Heritage & Genesis",
    historyBody1: "L.S.S.S.S. Government Degree College, Mant was established in 2003 by the Department of Higher Education, Government of Uttar Pradesh, with the specialized goal of imparting low-cost, top-quality education to rural, under-served youths of Western UP.",
    historyBody2: "Affiliated to Dr. Bhimrao Ambedkar University, Agra, the college has transformed from a modest single-stream campus into a premier academic center, recognised under Section 12(B) & 2(f) of the UGC Act 1956. Over more than two decades, our alumni have secured several gold medals, academic distinctions, and public service selections.",
    governanceTitle: "Administrative & Governing Cadre",
    principalTitle: "Principal's Detailed Desk",
    principalQuote: "Education is not merely the accumulation of scientific facts, but the construction of resilient Character and Democratic Integrity.",
    governingCouncilList: [
      { role: "Patron / President", name: "Director, Higher Education, Uttar Pradesh" },
      { role: "Chairperson", name: "Prof. (Dr.) Surendra Singh (Principal)" },
      { role: "Senior Administrative Member", name: "District Magistrate, Mathura" },
      { role: "UGC / NAAC Coordinator", name: "Dr. Rajiv Kumar" },
      { role: "Member Secretary", name: "Dr. Arvind Dixit" },
      { role: "Public Works Representative", name: "Executive Engineer, PWD Mathura" }
    ]
  };

  // Hindi version
  const contentHi = {
    historyTitle: "संस्थागत विरासत और उत्पत्ति",
    historyBody1: "एल.एस.एस.एस.एस. राजकीय महाविद्यालय, मांट की स्थापना वर्ष २००३ में उच्च शिक्षा विभाग, उत्तर प्रदेश सरकार द्वारा की गई थी। इसका विशेष उद्देश्य पश्चिमी उत्तर प्रदेश के ग्रामीण व पिछड़े क्षेत्र के छात्र-छात्राओं को अत्यंत नाममात्र शुल्क में गुणवत्तापूर्ण उच्च शिक्षा उपलब्ध कराना है।",
    historyBody2: "डॉ. भीमराव अंबेडकर विश्वविद्यालय, आगरा से संबद्ध यह संस्थान आज विश्वविद्यालय अनुदान आयोग (UGC) अधिनियम १९५६ की धारा १२(बी) और २(एफ) के अंतर्गत पूर्ण रूप से मान्यता प्राप्त है। २ से अधिक दशकों की यात्रा में इस संस्थान के शिक्षार्थियों ने विभिन्न क्षेत्रों, विश्वविद्यालय स्तर पर गोल्ड मेडल और राजकीय सेवाओं में अपना परचम लहराया है।",
    governanceTitle: "प्रशासनिक एवं शासी संरचना",
    principalTitle: "प्राचार्य प्रो. (डॉ.) सुरेन्द्र सिंह का विस्तृत वक्तव्य",
    principalQuote: "शिक्षा केवल वैज्ञानिक तथ्यों का संचय नहीं है, वरन यह चरित्र निर्माण एवं लोकतांत्रिक मूल्यों के संचार का सशक्त साधन है।",
    governingCouncilList: [
      { role: "संरक्षक / अध्यक्ष", name: "निदेशक, उच्च शिक्षा, उत्तर प्रदेश शासन" },
      { role: "सभापति", name: "प्रोफेसर (डॉ.) सुरेन्द्र सिंह (प्राचार्य)" },
      { role: "वरिष्ठ प्रशासनिक सदस्य", name: "जिलाधिकारी, मथुरा" },
      { role: "यूजीसी / नैक समन्वयक", name: "डॉ. राजीव कुमार" },
      { role: "सदस्य सचिव", name: "डॉ. अरविंद दीक्षित" },
      { role: "लो.नि.वि. प्रतिनिधि", name: "अधिशासी अभियंता, पीडब्ल्यूडी मथुरा" }
    ]
  };

  const current = language === "en" ? contentEn : contentHi;

  return (
    <div id="about-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Title banner */}
      <div id="about-hero" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Est. 2003 | Government Administered" : "स्थापना २००३ | उत्तर प्रदेश शासन शासक"}
        </span>
        <h1 id="about-main-heading" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {language === "en" ? "About Our Institution" : "महाविद्यालय के बारे में"}
        </h1>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* History section Grid */}
      <div id="about-history-section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-[#1A3A6B]">
            {current.historyTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            {current.historyBody1}
          </p>
          <p className="text-gray-700 leading-relaxed text-base">
            {current.historyBody2}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="inline-flex items-center gap-2 bg-[#1A3A6B]/5 text-[#1A3A6B] px-4 py-2 rounded-full text-sm font-semibold border border-[#1A3A6B]/10">
              <GraduationCap className="w-4 h-4 text-[#D4A017]" /> UGC Section 12(B) Verified
            </span>
            <span className="inline-flex items-center gap-2 bg-[#D4A017]/10 text-[#1A3A6B] px-4 py-2 rounded-full text-sm font-semibold border border-[#D4A017]/20">
              <Award className="w-4 h-4 text-[#D32F2F]" /> UP Govt Fees Standard
            </span>
          </div>
        </div>

        {/* Dynamic institution image mockup with decorative border */}
        <div className="relative pr-4 pb-4">
          <div className="absolute inset-0 border-2 border-dashed border-[#D4A017] rounded-xl translate-x-4 translate-y-4 -z-10"></div>
          <img 
            id="gdc-about-main-img"
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" 
            alt="L.S.S.S.S. College Campus" 
            className="rounded-xl shadow-lg w-full height-[380px] object-cover border border-gray-200"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Vision & Mission Card - Elegant Dual Screen Split */}
      <div id="about-vision-mission-cards" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#1A3A6B] border border-gray-100 space-y-4"
        >
          <div id="vision-icon-block" className="w-12 h-12 rounded-xl bg-[#1A3A6B]/10 flex items-center justify-center">
            <Eye className="w-6 h-6 text-[#1A3A6B]" />
          </div>
          <h3 className="text-xl font-bold text-[#1A3A6B]">{t.visionTitle}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{t.visionText}</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#D4A017] border border-gray-100 space-y-4"
        >
          <div id="mission-icon-block" className="w-12 h-12 rounded-xl bg-[#D4A017]/10 flex items-center justify-center">
            <Anchor className="w-6 h-6 text-[#D4A017]" />
          </div>
          <h3 className="text-xl font-bold text-[#1A3A6B]">{t.missionTitle}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{t.missionText}</p>
        </motion.div>
      </div>

      {/* Principal Profile Desk */}
      <div id="about-principal-desk" className="bg-gradient-to-br from-[#1A3A6B] to-[#112547] text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold text-center border-b border-white/10 pb-4">
          {current.principalTitle}
        </h3>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
            <div className="absolute inset-0 border-4 border-[#D4A017] rounded-2xl rotate-3"></div>
            <img 
              id="principal-large-img"
              src="/IMG_20211202_183832_347.jpg" 
              alt="Prof. (Dr.) Surendra Singh" 
              className="rounded-2xl object-cover w-full h-full relative z-10 border border-white/20"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6">
            <h4 id="principal-title-name" className="text-2xl font-bold tracking-tight">
              Prof. (Dr.) Surendra Singh
              <span className="block text-sm font-normal text-[#D4A017] mt-1">
                Principal, L.S.S.S.S. Govt. Degree College
              </span>
            </h4>
            
            <p className="text-white/90 leading-relaxed italic border-l-4 border-[#D4A017] pl-4">
              "{current.principalQuote}"
            </p>
            
            <p className="text-white/80 leading-relaxed text-sm">
              {t.principalText}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs bg-white/5 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-[#D4A017] block font-semibold mb-1">Affiliation Node</span>
                Dr. Bhimrao Ambedkar University, Agra
              </div>
              <div>
                <span className="text-[#D4A017] block font-semibold mb-1">UPPSC Selection</span>
                Commission Rank Holder
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Governing body Section */}
      <div id="about-governance-council" className="bg-[#F8F6F0] p-8 rounded-2xl border border-gray-200 space-y-6">
        <h3 className="text-2xl font-bold text-[#1A3A6B] text-center">
          {current.governanceTitle}
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto">
          The governance index coordinates closely with the Directorate of Higher Education, Prayagraj, and the Department of Higher Education, Uttar Pradesh (UP Administration).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {current.governingCouncilList.map((m, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-mono text-[#D4A017] tracking-wider uppercase block font-semibold">
                {m.role}
              </span>
              <span className="text-[#1A3A6B] font-bold text-base mt-2">
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
