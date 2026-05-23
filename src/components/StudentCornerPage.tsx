import React from "react";
import { Award, ShieldAlert, Heart, GraduationCap, CheckCircle } from "lucide-react";

interface StudentCornerPageProps {
  language: "en" | "hi";
}

export default function StudentCornerPage({ language }: StudentCornerPageProps) {
  const current = language === "en" ? {
    title: "Student Corner",
    subtitle: "Anti-Ragging Support, Scholarship Systems, and Academic Gold Medalists",
    raggingHeader: "Strict Zero Tolerance Anti-Ragging Policy",
    raggingBody: "As per UGC Regulations and Hon'ble Supreme Court guidelines, ragging is completely prohibited in L.S.S.S.S. Government Degree College campus. Any student found guilty will face immediate expulsion, major fines, and criminal FIR compilation.",
    scholarshipHeader: "UP Scholarship & Fee Reimbursement",
    scholarshipBody: "All eligible students belonging to SC, ST, OBC, General (EWS) and Minority groups with required parenting incomes are requested to submit online application forms on the official UP Government scholarship portal (scholarship.up.gov.in) with correct bank seeding verified.",
    meritHeader: "Hall of Fame: Gold Medalists & Academic Excellence",
  } : {
    title: "विद्यार्थी प्रभाग (छात्र कॉर्नर)",
    subtitle: "रैगिंग निषेध सेल, छात्रवृत्ति मार्गदर्शन एवं विश्वविद्यालय स्तर के स्वर्ण पदक विजेता",
    raggingHeader: "पूर्ण रूप से शून्य सहिष्णुता रैगिंग विरोधी नीति",
    raggingBody: "यूजीसी नियमों और माननीय सर्वोच्च न्यायालय के निर्देशों के अनुसार, राजकीय महाविद्यालय मांट परिसर में रैगिंग पूर्णतः प्रतिबंधित है। दोषी पाए जाने वाले छात्रों के खिलाफ त्वरित निलंबन, आर्थिक दंड और आपराधिक प्राथमिकी (FIR) दर्ज की जाएगी।",
    scholarshipHeader: "यूपी छात्रवृत्ति एवं शुल्क प्रतिपूर्ति",
    scholarshipBody: "अनुसूचित जाति, जनजाति, पिछड़ा वर्ग तथा आर्थिक रूप से कमजोर वर्ग (EWS) के सभी छात्र-छात्राएं सरकार के छात्रवृत्ति पोर्टल (scholarship.up.gov.in) पर पात्रता मानदंडों के अनुसार समय सीमा में आवेदन भरकर भौतिक सत्यापन हेतु कमरा नंबर ४ में जमा करें।",
    meritHeader: "गौरवशाली इतिहास: विश्वविद्यालय स्वर्ण पदक विजेता",
  };

  const medalists = [
    { year: "2024", name: "Anjali Kumari", degree: "B.Sc. (Physics)", ranking: "Gold Medal (DBRAU Agra)", status: "Completed Post-Grad" },
    { year: "2023", name: "Rajesh Singh", degree: "B.A. (Sociology)", ranking: "Gold Medal (DBRAU Agra)", status: "Selected in UPSC CDSE" },
    { year: "2022", name: "Kunal Dixit", degree: "B.Com. (Finance)", ranking: "University Rank 3", status: "Junior Accountant, Govt of UP" },
    { year: "2021", name: "Preeti Chaudhary", degree: "B.A. (History)", ranking: "Gold Medal (DBRAU Agra)", status: "Research Scholar JRF" }
  ];

  return (
    <div id="student-corner-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Title Header */}
      <div id="student-corner-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Student Welfare & Compliance" : "छात्र कल्याण एवं संरक्षण"}
        </span>
        <h1 id="student-corner-title" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {current.title}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {current.subtitle}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* Anti-Ragging and Scholarships Cards (Dual Layout) */}
      <div id="welfare-policies-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Anti-Ragging */}
        <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="bg-rose-50 p-3 rounded-2xl w-14 h-14 flex items-center justify-center border border-rose-100">
              <ShieldAlert className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-[#1A3A6B]">{current.raggingHeader}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {current.raggingBody}
            </p>
          </div>

          <div className="bg-rose-50/50 p-4 rounded-xl space-y-1 text-xs border border-rose-100">
            <span className="font-bold text-rose-700 block">📞 Dedicated Helplines / शिकायत संख्या:</span>
            <p className="text-gray-600">Anti-Ragging Committee Convener: <strong>+91-9412347629</strong></p>
            <p className="text-gray-600">National Toll-Free Helpline: <strong>1800-180-5522</strong></p>
          </div>
        </div>

        {/* UP Scholarships */}
        <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="bg-amber-50/70 p-3 rounded-2xl w-14 h-14 flex items-center justify-center border border-amber-100">
              <Heart className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1A3A6B]">{current.scholarshipHeader}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {current.scholarshipBody}
            </p>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl text-xs space-y-2 border border-amber-100">
            <div className="flex gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
              <span>Free-ship benefits as per UP Govt criteria</span>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A017] flex-shrink-0" />
              <span>Aadhaar mapping and NPCI mapping is mandatory</span>
            </div>
          </div>
        </div>

      </div>

      {/* Hall of Fame / Gold Medalists Section */}
      <div id="hall-of-fame" className="space-y-6">
        <h3 className="text-2xl font-bold text-[#1A3A6B] font-sans text-center flex items-center justify-center gap-2">
          <Award className="w-6 h-6 text-[#D4A017]" />
          {current.meritHeader}
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-xl mx-auto">
          We take immense pride in celebrating our outstanding rural student achievers who secured prestigious rankings under Dr. Bhimrao Ambedkar University, Agra.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {medalists.map((m, idx) => (
            <div key={idx} className="bg-[#F8F6F0] p-6 rounded-2xl border border-gray-200 text-center space-y-3 hover:border-[#1A3A6B] transition-colors relative">
              <span className="absolute top-3 right-3 text-xs bg-[#1A3A6B]/5 text-[#1A3A6B] px-2 py-0.5 rounded font-bold">
                {m.year}
              </span>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-gray-150">
                <GraduationCap className="w-6 h-6 text-[#D4A017]" />
              </div>
              <h4 className="font-bold text-[#1A3A6B] text-base">{m.name}</h4>
              <p className="text-xs text-gray-400 font-medium">{m.degree}</p>
              <span className="text-xs font-bold text-red-600 block bg-red-50 p-1.5 rounded-lg border border-red-100">
                {m.ranking}
              </span>
              <span className="text-[10px] text-gray-500 block italic">{m.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
