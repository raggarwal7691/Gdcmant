import React from "react";
import { Download, FileText, CheckCircle, Users, Award, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface IQACPageProps {
  language: "en" | "hi";
  reports: any[];
}

export default function IQACPage({ language, reports }: IQACPageProps) {
  const iqacCommittee = [
    { role: "Chairperson", name: "Prof. (Dr.) Surendra Singh", designation: "Principal" },
    { role: "Coordinator / Director", name: "Dr. Rajiv Kumar", designation: "Assistant Professor, Sociology" },
    { role: "Senior Administrative Member", name: "Sub-Divisional Magistrate (SDM), Mant" },
    { role: "Teacher Representative (Economics)", name: "Dr. Arvind Dixit", designation: "Assistant Professor" },
    { role: "Teacher Representative (History)", name: "Dr. Mamta Sharma", designation: "Assistant Professor" },
    { role: "Teacher Representative (Physics)", name: "Dr. Sandeep Singh", designation: "Assistant Professor" },
    { role: "External Expert (Higher Education)", name: "Prof. R. P. Singh", designation: "Retd. Professor, DBRAU Agra" },
    { role: "Alumni Representative", name: "Sri Devashish Ggautam", designation: "Selected in UPPSC PCS-J" },
    { role: "Student Representative", name: "Km. Preeti Singh", designation: "B.Sc Final Year (Gold Medalist)" }
  ];

  const objectives = language === "en" ? [
    "To develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution.",
    "To promote measures for institutional functioning towards quality enhancement through internalization of quality culture.",
    "Optimization and integration of modern methods of teaching, learning, and research-oriented modules.",
    "Ensuring adequacy, maintenance and allocation of support structure and services as per NAAC metrics."
  ] : [
    "संस्थान के शैक्षणिक और प्रशासनिक प्रदर्शन को बेहतर बनाने के लिए सचेत, निरंतर और उत्प्रेरक कार्रवाई की प्रणाली को बढ़ाना।",
    "गुणवत्ता संस्कृति के आंतरिककरण के माध्यम से गुणवत्ता वृद्धि की दिशा में संस्थागत कामकाज के उपायों को बढ़ावा देना।",
    "शिक्षण, अध्ययन और अनुसंधान-उन्मुख मॉड्यूल के आधुनिक तरीकों का अनुकूलन और एकीकरण सुनिश्चित करना।",
    "नैक (NAAC) मानकों के अनुसार सुदृढ़ सहायक संरचना और सेवाओं के आवंटन और रखरखाव की व्यवस्था सुनिश्चित करना।"
  ];

  return (
    <div id="iqac-page-holder" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Title banner */}
      <div id="iqac-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Internal Quality Assurance Cell (IQAC)" : "अन्तरिक्ष गुणवत्ता सुधार प्रकोष्ठ (IQAC)"}
        </span>
        <h1 id="iqac-main-heading" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {language === "en" ? "UGC & NAAC Compliance Portal" : "यूजीसी एवं नैक अनुपालन पोर्टल"}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {language === "en" 
            ? "Assuring systematic quality standardizations and academic audits of L.S.S.S.S. GDC Mant as formulated by National Assessment and Accreditation Council (NAAC) and UGC policies."
            : "राष्ट्रीय मूल्यांकन एवं प्रत्यायन परिषद (नैक) और यूजीसी की नीतियों के अनुसार एल.एस.एस.एस.एस. राजकीय महाविद्यालय मांट के व्यवस्थित गुणवत्ता मानकीकरण और शैक्षणिक ऑडिट को प्रबंधित करना।"}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* Primary IQAC Objectives (Dual Panel Grid) */}
      <div id="iqac-objectives-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-sans text-[#1A3A6B]">
            {language === "en" ? "Objectives & Mission of IQAC" : "आई.क्यू.ए.सी. के मुख्य उद्देश्य व ध्येय"}
          </h2>
          <div className="space-y-4">
            {objectives.map((obj, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#D4A017] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1A3A6B]/5 p-6 rounded-2xl border border-[#1A3A6B]/10">
            <span className="text-[#1A3A6B] font-bold text-sm block mb-1">
              {language === "en" ? "Current NAAC Status Note" : "वर्तमान नैक तैयारी स्थिति"}
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              {language === "en"
                ? "The IQAC committee has successfully processed Self-Study Report (SSR) pre-assessments. AQAR documents are uploaded regularly for institutional transparent diagnostics."
                : "आई.क्यू.ए.सी. समिति ने सेल्फ-स्टडी रिपोर्ट (SSR) पूर्व-आकलन की प्रक्रिया पूरी कर ली है। संस्थागत पारदर्शिता के लिए वार्षिक गुणवत्ता रिपोर्ट (AQAR) नियमित रूप से पोर्टल पर अपलोड की जाती है।"}
            </p>
          </div>
        </div>

        {/* Dynamic institution metrics badges */}
        <div className="bg-[#F8F6F0] p-8 rounded-3xl border border-gray-200 grid grid-cols-2 gap-6 relative">
          <div className="absolute -top-3 -left-3 bg-[#D4A017] text-white text-xs px-3 py-1 rounded-md font-mono uppercase font-bold z-10 shadow">
            {language === "en" ? "UGC Norms approved" : "यूजीसी स्वीकृत"}
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2">
            <span className="text-3xl font-bold text-[#1A3A6B] block">12(B)</span>
            <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">
              {language === "en" ? "UGC Registration" : "यूजीसी पंजीकरण"}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2">
            <span className="text-3xl font-bold text-[#D4A017] block">AQAR</span>
            <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">
              {language === "en" ? "Annual Audit Check" : "वार्षिक ऑडिट जांच"}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center space-y-2 col-span-2">
            <span className="text-[#1A3A6B] font-bold text-lg block">UPPSC Staff</span>
            <span className="text-xs text-gray-500 block">
              {language === "en" ? "100% Highly Qualified PhD Lecturers" : "१००% पी.एच.डी. योग्य प्राध्यापक"}
            </span>
          </div>
        </div>
      </div>

      {/* IQAC Committee Table */}
      <div id="iqac-committee" className="space-y-6">
        <h2 className="text-2xl font-bold text-center font-sans text-[#1A3A6B]">
          {language === "en" ? "IQAC Steering Committee Composition" : "आई.क्यू.ए.सी. संचालन समिति की संरचना"}
        </h2>
        <div className="overflow-x-auto shadow-sm rounded-2xl border border-gray-200">
          <table className="w-full text-left border-collapse bg-white">
            <thead className="bg-[#1A3A6B] text-white">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold tracking-wider">
                  {language === "en" ? "S.No." : "क्रमांक"}
                </th>
                <th className="py-4 px-6 text-sm font-semibold tracking-wider">
                  {language === "en" ? "Officer Designation in IQAC" : "आईकीयूएसी में पदनाम"}
                </th>
                <th className="py-4 px-6 text-sm font-semibold tracking-wider">
                  {language === "en" ? "Nominated Representative" : "मनोनीत अधिकारी/प्रतिनिधि"}
                </th>
                <th className="py-4 px-6 text-sm font-semibold tracking-wider">
                  {language === "en" ? "Dean Department / Occupation" : "विभाग या पद"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {iqacCommittee.map((m, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-gray-500">{index + 1}</td>
                  <td className="py-4 px-6 font-semibold text-[#1A3A6B]">{m.role}</td>
                  <td className="py-4 px-6 text-gray-800">{m.name}</td>
                  <td className="py-4 px-6 text-xs text-gray-500 font-mono italic">{m.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AQAR Reports & Minutes (Modular Dual Columns) */}
      <div id="iqac-downloads" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AQAR reports block */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1A3A6B] border-b border-gray-200 pb-2">
            📊 {language === "en" ? "AQAR Upload Ledger" : "वार्षिक गुणवत्ता रिपोर्ट (AQAR)"}
          </h3>
          <div className="space-y-3">
            {reports.map((r, idx) => (
              <div key={r.id || idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#D4A017] transition-all">
                <div className="flex gap-3 items-center">
                  <FileText className="w-5 h-5 text-[#1A3A6B]" />
                  <div>
                    <span className="text-sm font-bold text-gray-800 block">{r.title}</span>
                    <span className="text-xs text-mono text-gray-400">AY: {r.academicYear} | Uploaded: {r.uploadDate}</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Simulating download of NAAC report [${r.title} PDF] under compliance rule.`)}
                  className="p-2 text-[#D4A017] hover:bg-[#D4A017]/10 rounded-full transition-colors"
                  title="Download File"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Minutes and Feedback logs download box */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1A3A6B] border-b border-gray-200 pb-2">
            📝 {language === "en" ? "Minutes of Meetings & SSS Docs" : "बैठकों के कार्यवृत्त एवं छात्र सर्वेक्षण"}
          </h3>
          <div className="space-y-3">
            {[
              { id: "m-1", title: "Student Satisfactory Survey Checklist (SSS)", year: "2025-26", date: "2026-04-22" },
              { id: "m-2", title: "IQAC Minutes for Consolidated External Academic Audit", year: "2025-26", date: "2026-03-11" },
              { id: "m-3", title: "Action Taken Report (ATR) on Curriculum Feedbacks", year: "2024-25", date: "2025-11-05" },
              { id: "m-4", title: "NAAC Criteria 4 Infrastructure Resource Index Matrix", year: "2024-25", date: "2025-06-30" }
            ].map((min) => (
              <div key={min.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#1A3A6B] transition-all">
                <div className="flex gap-3 items-center">
                  <FileText className="w-5 h-5 text-[#D4A017]" />
                  <div>
                    <span className="text-sm font-bold text-gray-800 block">{min.title}</span>
                    <span className="text-xs text-mono text-gray-400">AY: {min.year} | Declared: {min.date}</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Simulating download of minutes entry: [${min.title} PDF]`)}
                  className="p-2 text-[#1A3A6B] hover:bg-[#1A3A6B]/10 rounded-full transition-colors"
                  title="Download File"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
