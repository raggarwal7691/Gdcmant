import React from "react";
import { Mail, Phone, GraduationCap, Award } from "lucide-react";

interface FacultyPageProps {
  language: "en" | "hi";
  facultyList: any[];
}

export default function FacultyPage({ language, facultyList }: FacultyPageProps) {
  const current = language === "en" ? {
    title: "Faculty & Staff",
    subtitle: "Highly Qualified Commission-Selected Subject Scholars",
    labelUPPSC: "UPPSC Appointed",
    research: "Research Domain:",
    exp: "Academic Tenure:",
    noData: "Faculty profiles loading..."
  } : {
    title: "प्राध्यापक एवं प्रशासनिक कर्मचारी",
    subtitle: "उत्तर प्रदेश लोक सेवा आयोग (UPPSC) द्वारा चयनित प्रतिष्ठित संकाय",
    labelUPPSC: "UPPSC चयनित",
    research: "शोध एवं रुचि क्षेत्र:",
    exp: "शैक्षणिक अनुभव:",
    noData: "प्रोफाइल लोड हो रहे हैं..."
  };

  return (
    <div id="faculty-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div id="faculty-header" className="text-center space-y-3">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Educators Leadership roster" : "योग्य एवं अनुभवी प्राध्यापक"}
        </span>
        <h1 id="faculty-title" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {current.title}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {current.subtitle}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {facultyList.length === 0 ? (
        <div className="text-center text-gray-500 py-10">{current.noData}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {facultyList.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              
              {/* Profile Image & Upper Card */}
              <div className="p-6 space-y-4">
                <div className="flex gap-4 items-center">
                  <img 
                    src={f.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"} 
                    alt={f.name} 
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3A6B] leading-tight">{f.name}</h3>
                    <span className="text-xs font-mono font-semibold text-gray-400 block">{f.designation}</span>
                    <span className="text-xs text-[#D4A017] font-bold block">{f.department}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600 border-t border-gray-50 pt-3">
                  <p className="flex items-start gap-1">
                    <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Qual:</strong> {f.qualification}</span>
                  </p>
                  <p><strong>{current.exp}</strong> {f.experience}</p>
                  
                  {f.researchInterest && (
                    <p className="bg-sky-50/50 p-2 rounded-lg text-slate-700">
                      <strong>{current.research}</strong> {f.researchInterest}
                    </p>
                  )}
                </div>
              </div>

              {/* Badges / Contacts bottom bar */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex gap-2 text-xs">
                  {f.isUPPSC && (
                    <span className="bg-[#D4A017]/10 text-[#1A3A6B] border border-[#D4A017]/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {current.labelUPPSC}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3 text-gray-400">
                  {f.email && (
                    <a href={`mailto:${f.email}`} className="hover:text-[#1A3A6B]" title={f.email}>
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {f.phone && (
                    <a href={`tel:${f.phone}`} className="hover:text-[#1A3A6B]" title={f.phone}>
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
