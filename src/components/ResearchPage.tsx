import React from "react";
import { Award, BookOpen, GraduationCap, CheckCircle2, DollarSign } from "lucide-react";

interface ResearchPageProps {
  language: "en" | "hi";
  supervisors: any[];
  projects: any[];
}

export default function ResearchPage({ language, supervisors, projects }: ResearchPageProps) {
  const currentLocale = language === "en" ? {
    headerTitle: "Research & Ph.D. Desk",
    headerSubtitle: "Post-Graduate Supervision, Minor Research Projects & UGC Guidelines",
    guidelinesTitle: "UGC M.Phil/Ph.D. Admission Guidelines",
    supervisorsTitle: "Registered Ph.D. Supervisors (Research Guides)",
    projectsTitle: "Sponsored Research Projects",
    eligibilityTitle: "Eligibility Criteria for Doctoral Scholars",
    rules: [
      "Scholars must clear Dr. Bhimrao Ambedkar University, Agra RET (Research Entrance Test) or possess UGC-NET / CSIR-NET / JRF.",
      "Admission registration is subject to submission of a detailed research proposal and personal interview board clearance.",
      "Scholars must complete 6 months course-work containing Research Methodology and Research Ethics as per UGC Regulations 2022.",
      "Bi-annual progress reports must be signed by the allotted Research Supervisor and presented in front of the RDC Board."
    ],
    noData: "No registered listings found."
  } : {
    headerTitle: "शोध एवं पी.एच.डी. समीक्षा",
    headerSubtitle: "स्नातकोत्तर पर्यवेक्षण, शोध परियोजनाएं और यूजीसी दिशानिर्देश",
    guidelinesTitle: "यूजीसी पी.एच.डी. प्रवेश दिशानिर्देश एवं नियम",
    supervisorsTitle: "पंजीकृत पी.एच.डी. पर्यवेक्षक (शोध मार्गदर्शक)",
    projectsTitle: "प्रायोजित शोध परियोजनाएं",
    eligibilityTitle: "शोधार्थियों के लिए पात्रता मानदंड",
    rules: [
      "शोधार्थी डॉ. भीमराव अंबेडकर विश्वविद्यालय, आगरा की शोध प्रवेश परीक्षा (RET) उत्तीर्ण या यूजीसी-नेट / सीएसआईआर-नेट / जेआरएफ धारक होने चाहिए।",
      "प्रवेश पंजीकरण एक विस्तृत शोध प्रस्ताव और साक्षात्कार बोर्ड की मंजूरी के अधीन है।",
      "शोधार्थियों को यूजीसी विनियम २०२२ के अनुसार अनुसंधान कार्यप्रणाली और अनुसंधान नैतिकता से युक्त ६ महीने का कोर्स-वर्क पूरा करना अनिवार्य है।",
      "शोधार्थियों को अपने आवंटित मार्गदर्शक द्वारा हस्ताक्षरित अर्ध-वार्षिक प्रगति रिपोर्ट आरडीसी (RDC) बोर्ड के समक्ष प्रस्तुत करनी होगी।"
    ],
    noData: "कोई पंजीकृत सूची नहीं मिली।"
  };

  return (
    <div id="research-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Title banner */}
      <div id="research-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "UGC Ph.D. Approved Centers" : "यूजीसी पी.एच.डी. स्वीकृत केंद्र"}
        </span>
        <h1 id="research-main-heading" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {currentLocale.headerTitle}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {currentLocale.headerSubtitle}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* Grid of Guidelines and Eligibility */}
      <div id="research-guidelines-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Guidelines List */}
        <div className="bg-[#F8F6F0] p-8 rounded-3xl border border-gray-200 space-y-6">
          <h2 className="text-2xl font-bold text-[#1A3A6B] flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-[#D4A017]" />
            {currentLocale.guidelinesTitle}
          </h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            {currentLocale.rules.map((rule, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="w-6 h-6 bg-[#1A3A6B] text-white text-xs font-mono font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility Criteria & Statistics Card */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#1A3A6B] flex items-center gap-3">
            <Award className="w-6 h-6 text-[#D4A017]" />
            {currentLocale.eligibilityTitle}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {language === "en"
              ? "Under Dr. Bhimrao Ambedkar University norms, candidates must possess a Master's degree in the respective subject with at least 55% marks (50% for SC/ST/OBC non-creamy layer/Differently-Abled candidates)."
              : "डॉ. भीमराव अंबेडकर विश्वविद्यालय के नियमों के अनुसार उम्मीदवारों के पास संबंधित विषय में कम से कम ५५% अंकों के साथ मास्टर डिग्री (एससी/एसटी/ओबीसी नान-क्रीमी लेयर/दिव्यांग उम्मीदवारों के लिए ५०%) होना अनिवार्य है।"}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <span className="text-2xl font-black text-[#1A3A6B] block">02</span>
              <span className="text-xs text-gray-500 font-mono block">Registered guides</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
              <span className="text-2xl font-black text-[#D4A017] block">07+</span>
              <span className="text-xs text-gray-500 font-mono block">Enrolled scholars</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ph.D. Supervisors Directory */}
      <div id="research-supervisors" className="space-y-6">
        <h2 className="text-2xl font-bold text-[#1A3A6B] font-sans">
          👤 {currentLocale.supervisorsTitle}
        </h2>
        {supervisors.length === 0 ? (
          <p className="text-gray-500 text-sm italic">{currentLocale.noData}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supervisors.map((s) => (
              <div key={s.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-[#1A3A6B] transition-all">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-[#1A3A6B]">{s.name}</h3>
                  <div className="flex gap-2">
                    <span className="bg-[#1A3A6B]/5 text-[#1A3A6B] text-xs px-2.5 py-1 rounded-md font-semibold">
                      Dept: {s.department}
                    </span>
                    <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-md font-semibold font-mono">
                      Slots Left: {s.slotsAvailable}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 pt-1">
                    <span className="block"><strong>Research Areas:</strong> {s.researchAreas?.join(", ")}</span>
                    <span className="block"><strong>Successfully Guided:</strong> {s.totalGuided} Scholars</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Funded & Sponsored Research Projects */}
      <div id="research-projects" className="space-y-6">
        <h2 className="text-2xl font-bold text-[#1A3A6B] font-sans">
          🔬 {currentLocale.projectsTitle}
        </h2>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-sm italic">{currentLocale.noData}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-[#F8F6F0] p-6 rounded-2xl border border-gray-200 hover:border-[#D4A017] transition-all space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3A6B]">{p.title}</h3>
                    <span className="text-xs font-mono text-gray-500">
                      Supervisor Academic Lead: <strong>{p.supervisor}</strong> ({p.department})
                    </span>
                  </div>
                  <div className="flex gap-2 self-start md:self-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.status === "Ongoing" ? "bg-[#D4A017]/10 text-[#1A3A6B] border border-[#D4A017]/30" : "bg-green-50 text-green-700 border border-green-200"}`}>
                      {p.status}
                    </span>
                    <span className="bg-[#1A3A6B]/5 text-[#1A3A6B] text-xs font-semibold px-3 py-1 rounded-full border border-[#1A3A6B]/15 flex items-center gap-1">
                      <BookOpen className="w-3   h-3 text-[#D4A017]" /> {p.fundingAgency}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-xl border border-gray-100">
                  {p.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-gray-500">
                  <span>Grant Amount Allocated:</span>
                  <span className="text-[#1A3A6B] text-sm font-black">{p.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
