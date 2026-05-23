import React, { useState } from "react";
import { BookOpen, Calendar, HelpCircle, FileSpreadsheet, Layers, Sparkles } from "lucide-react";

interface AcademicsPageProps {
  language: "en" | "hi";
}

export default function AcademicsPage({ language }: AcademicsPageProps) {
  const [activeTab, setActiveTab] = useState<"courses" | "calendar">("courses");

  const programs = [
    {
      degree: "Bachelor of Arts (B.A.) / कला स्नातक",
      duration: "3 Years (6 Semesters under CBCS / NEP)",
      intake: "420 Seats",
      subjects: [
        "Hindi Literature (हिन्दी साहित्य)",
        "Sociology (समाजशास्त्र)",
        "History (इतिहास)",
        "Economics (अर्थशास्त्र)",
        "Political Science (राजनीति विज्ञान)",
        "Sanskrit (संस्कृत)",
        "English Literature (अंग्रेजी साहित्य)",
        "Geography (भूगोल)",
        "Home Science (गृह विज्ञान)",
        "Physical Education (शारीरिक शिक्षा)",
        "Music (संगीत)"
      ]
    },
    {
      degree: "Bachelor of Science (B.Sc.) / विज्ञान स्नातक",
      duration: "3 Years (6 Semesters under CBCS / NEP)",
      intake: "120 Seats",
      subjects: [
        "Physics (भौतिक विज्ञान)",
        "Chemistry (रसायन विज्ञान)",
        "Mathematics (गणित) / Zoology & Botany (जंतु एवं वनस्पति विज्ञान)"
      ]
    },
    {
      degree: "Bachelor of Commerce (B.Com.) / वाणिज्य स्नातक",
      duration: "3 Years (6 Semesters under CBCS / NEP)",
      intake: "80 Seats",
      subjects: [
        "Financial Accounting",
        "Business Regulatory Framework",
        "Corporate Law & Auditing",
        "Goods and Services Tax (GST)"
      ]
    },
    {
      degree: "Master of Arts (M.A.) / कला परास्नातक",
      duration: "2 Years (4 Semesters under CBCS / NEP)",
      intake: "60 Seats per subject",
      subjects: [
        "Sociology (समाजशास्त्र)",
        "History (इतिहास)",
        "Economics (अर्थशास्त्र)"
      ]
    }
  ];

  const calEvents = language === "en" ? [
    { date: "July 01, 2026", task: "Commencement of Academic Session and Admissions" },
    { date: "August 10, 2026", task: "NSS & Rovers Ranger Enrollment and Orientation" },
    { date: "September 15, 2026", task: "First Mid-Term Unit Tests & Research Progress checks" },
    { date: "November 05, 2026", task: "Cultural/Sports Society Competitions & Co-curricular Meet" },
    { date: "December 14, 2026", task: "Semester End Main Exams Commencement (Dr. BRAU Agra)" },
    { date: "January 05, 2027", task: "NSS 7-Day Rural Upliftment Special Camp" },
    { date: "May 10, 2027", task: "Final Semester Examinations and Evaluation Cycle" }
  ] : [
    { date: "०१ जुलाई, २०२६", task: "शैक्षणिक सत्र का प्रारंभ एवं प्रवेश आवेदन" },
    { date: "१० अगस्त, २०२६", task: "एनएसएस तथा स्काउट गाइड (रोवर्स रेंजर्स) नामांकन" },
    { date: "१५ सितम्बर, २०२६", task: "प्रथम त्रैमासिक इकाई परीक्षा एवं शोध समीक्षा" },
    { date: "०५ नवम्बर, २०२६", task: "सांस्कृतिक व क्रीड़ा परिषद प्रतियोगिता आयोजन" },
    { date: "१४ दिसम्बर, २०२६", task: "डॉ. भीमराव अंबेडकर वि.वि. आगरा सेमेस्टर परीक्षा प्रारंभ" },
    { date: "०५ जनवरी, २०२७", task: "एनएसएस ७ दिवसीय ग्राम्य विकास विशेष शिविर" },
    { date: "१० मई, २०२७", task: "मुख्य वार्षिक/सेमेस्टर परीक्षा एवं मूल्यांकन चक्र" }
  ];

  return (
    <div id="academics-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title Banner */}
      <div id="academics-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Curriculum & Timetable" : "पाठ्यक्रम एवं समय सारणी"}
        </span>
        <h1 id="academics-heading" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {language === "en" ? "Academics & Program Streams" : "शैक्षणिक पाठ्यक्रम एवं संकाय"}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {language === "en" 
            ? "Explores our course structures, list of eleven BA subjects, specialized science streams, commerce, post-graduate programs and the official annual calendar."
            : "कला स्नातक के ११ विषयों, विज्ञान, वाणिज्य, परास्नातक स्तर के सामाजिक अनुसंधान संकायों और विश्वविद्यालय कैलेंडर की जाँच करें।"}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* Selector Tabs */}
      <div className="flex justify-center border-b border-gray-200">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === "courses" ? "border-[#1A3A6B] text-[#1A3A6B]" : "border-transparent text-gray-500 hover:text-gray-800"}`}
        >
          {language === "en" ? "📚 Course Catalog" : "📚 उपलब्ध पाठ्यक्रम"}
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${activeTab === "calendar" ? "border-[#1A3A6B] text-[#1A3A6B]" : "border-transparent text-gray-500 hover:text-gray-800"}`}
        >
          {language === "en" ? "📅 Academic Calendar" : "📅 संक्षिप्त शैक्षणिक कैलेंडर"}
        </button>
      </div>

      {/* Tab content */}
      <div className="pt-6">
        {activeTab === "courses" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-[#1A3A6B]">{p.degree}</h3>
                    <span className="bg-[#D4A017]/10 text-[#1A3A6B] text-xs font-mono font-bold px-2.5 py-1 rounded">
                      Intake: {p.intake}
                    </span>
                  </div>
                  
                  <span className="text-xs text-gray-400 font-mono tracking-wider block mb-3 uppercase">
                    Duration: {p.duration}
                  </span>

                  <ul className="space-y-2">
                    {p.subjects.map((sub, sIdx) => (
                      <li key={sIdx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-[#D4A017] font-bold">✓</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">NEP-2020 / CBCS Syllabus Pattern</span>
                  <button 
                    onClick={() => alert(`Simulating download of syllabus document for [${p.degree}] conforming to Dr. Bhimrao Ambedkar University, Agra regulations.`)}
                    className="text-xs text-white bg-[#1A3A6B] px-3 py-1.5 rounded-lg hover:bg-[#112547] transition-colors"
                  >
                    Download Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-4xl mx-auto space-y-8">
            <h3 className="text-xl font-bold text-[#1A3A6B] text-center">
              {language === "en" ? "Academic Calendar (Session 2026-2027)" : "वार्षिक शैक्षणिक गतिविधि पंचांग (सत्र २०२६-२०२७)"}
            </h3>

            <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
              {calEvents.map((evt, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-[#D4A017] rounded-full border border-white"></div>
                  <span className="text-xs font-mono text-[#1A3A6B] font-bold block mb-1">
                    {evt.date}
                  </span>
                  <p className="text-sm text-gray-800 leading-normal">
                    {evt.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
