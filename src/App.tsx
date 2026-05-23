/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Building, BookOpen, GraduationCap, Award, Phone, Mail, 
  MapPin, Menu, X, Globe, Calendar, ArrowRight, Shield, Download 
} from "lucide-react";
import { translations } from "./translations";
import AboutPage from "./components/AboutPage";
import IQACPage from "./components/IQACPage";
import ResearchPage from "./components/ResearchPage";
import AcademicsPage from "./components/AcademicsPage";
import AdmissionsPage from "./components/AdmissionsPage";
import FacilitiesPage from "./components/FacilitiesPage";
import FacultyPage from "./components/FacultyPage";
import StudentCornerPage from "./components/StudentCornerPage";
import GalleryPage from "./components/GalleryPage";
import ContactPage from "./components/ContactPage";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [activePage, setActivePage] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic state loaded from REST endpoints
  const [notices, setNotices] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [iqacReports, setIqacReports] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Fetch all initial data from express REST endpoints
  const loadDatabaseValues = async () => {
    try {
      // 1. Notices
      const noticeRes = await fetch("/api/notices");
      if (noticeRes.ok) {
        const noticeData = await noticeRes.ok ? await noticeRes.json() : [];
        setNotices(noticeData);
      }

      // 2. Faculty
      const facultyRes = await fetch("/api/faculty");
      if (facultyRes.ok) {
        setFaculty(await facultyRes.json());
      }

      // 3. IQAC Reports
      const iqacRes = await fetch("/api/iqac");
      if (iqacRes.ok) {
        setIqacReports(await iqacRes.json());
      }

      // 4. Research (Supervisors + Projects)
      const researchRes = await fetch("/api/research");
      if (researchRes.ok) {
        const rcData = await researchRes.json();
        setSupervisors(rcData.supervisors || []);
        setProjects(rcData.projects || []);
      }

      // 5. Gallery
      const galRes = await fetch("/api/gallery");
      if (galRes.ok) {
        setGallery(await galRes.json());
      }

    } catch (err) {
      console.error("Express backend seed read fallback", err);
    }
  };

  useEffect(() => {
    loadDatabaseValues();
  }, []);

  const t = translations[language];

  // Helper menu array
  const navigationItems = [
    { key: "home", label: t.home },
    { key: "about", label: t.aboutUs },
    { key: "iqac", label: t.iqac },
    { key: "research", label: t.research },
    { key: "academics", label: t.academics },
    { key: "admissions", label: t.admissions },
    { key: "facilities", label: t.facilities },
    { key: "faculty", label: t.faculty },
    { key: "student", label: t.studentCorner },
    { key: "gallery", label: t.gallery },
    { key: "contact", label: t.contactUs }
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "hi" : "en");
  };

  return (
    <div id="app-root-frame" className="font-sans antialiased text-[#1A3A6B] bg-[#F8F6F0] min-h-screen flex flex-col justify-between">
      
      {/* 1. TOP STATUTORY & CONTACT INFOBAR */}
      <section id="top-notification-strip" className="bg-[#1A3A6B] text-white text-xs py-2 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          {/* Quick contact and affiliation info */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1 font-semibold text-white/95">
              <Phone className="w-3.5 h-3.5 text-[#D4A017]" /> +91-565-2970034
            </span>
            <span className="flex items-center gap-1 text-white/90">
              <Mail className="w-3.5 h-3.5 text-[#D4A017]" /> principalgdcmant@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Blinking Admission Active Tag */}
            <span className="bg-[#D32F2F] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded animate-pulse shadow-sm">
              ADMISSIONS 2026 ACTIVE
            </span>
            
            {/* Affiliation reference node */}
            <span className="hidden md:inline text-white/80 font-medium">Affiliated to DBRAU Agra</span>
          </div>

        </div>
      </section>

      {/* 2. INSTITUTIONAL HERO EMBLEMS & HEADER */}
      <header id="primary-institutional-header" className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          
          {/* College logo / insignia configuration */}
          <div 
            onClick={() => { setActivePage("home"); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <img 
              src="/gdcheader.jpg" 
              alt="L.S.S.S.S. GDC Logo" 
              className="w-14 h-14 rounded-full object-cover border-2 border-[#D4A017] shadow-md flex-shrink-0 group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-[#D4A017] font-mono text-[9px] font-black uppercase tracking-widest block"> राजकीय महाविद्यालय, मांट (मथुरा) </span>
              <h1 className="text-lg md:text-xl font-bold text-[#1A3A6B] leading-none tracking-tight">
                {t.collegeName}
              </h1>
              <span className="text-[10px] md:text-xs text-slate-500 font-semibold block leading-tight mt-0.5">
                {t.affiliation} | {t.ugcRecognition}
              </span>
            </div>
          </div>

          {/* Right Header: UGC BADGE & LANGUAGE TOGGLE */}
          <div className="flex items-center gap-3">
            
            {/* UGC Recognition Flag badge */}
            <div className="hidden lg:flex flex-col items-end text-right border-r border-gray-150 pr-4">
              <span className="text-[10px] text-gray-400 font-mono font-bold leading-none">UGC ACT 1956</span>
              <span className="text-sm font-bold text-slate-700">Section 12(B) & 2(f)</span>
              <span className="text-[10px] text-[#D4A017] font-bold tracking-wide">NAAC Standard Compliant</span>
            </div>

            {/* Bilingual Switch Button */}
            <button
              onClick={toggleLanguage}
              className="bg-[#1A3A6B]/5 text-[#1A3A6B] hover:bg-[#1A3A6B]/15 px-3 py-1.5 rounded-lg text-xs font-bold border border-[#1A3A6B]/10 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-4 h-4 text-[#D4A017]" />
              <span>{t.bilingualToggle}</span>
            </button>

            {/* Admin Portal Fast Link */}
            <button
              onClick={() => { setActivePage("admin"); setMobileMenuOpen(false); }}
              className={`hidden md:inline px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${activePage === "admin" ? "bg-[#D4A017] text-[#1A3A6B] border-[#D4A017]" : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"}`}
            >
              {language === "en" ? "Admin Console" : "व्यवस्थापक"}
            </button>

            {/* Mobile Navigation Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 text-slate-600 hover:text-[#1A3A6B] hover:bg-slate-50 rounded-lg md:hidden border border-gray-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* 3. DESKTOP SYSTEM HORIZONTAL NAVIGATION */}
        <nav id="desktop-menubar" className="hidden md:block bg-[#1A3A6B] text-white">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto flex items-center justify-start gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`py-3 px-4 text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 hover:bg-white/5 cursor-pointer ${
                  activePage === item.key 
                    ? "border-[#D4A017] text-[#D4A017] font-black" 
                    : "border-transparent text-white/95"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* 4. MOBILE MENU DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-white border-b border-gray-200 shadow-lg p-4 space-y-2 relative z-40">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActivePage(item.key); setMobileMenuOpen(false); }}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors block cursor-pointer ${
                activePage === item.key 
                  ? "bg-[#1A3A6B] text-white" 
                  : "bg-gray-50/50 text-slate-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setActivePage("admin"); setMobileMenuOpen(false); }}
            className={`w-full text-left mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors block border border-dashed text-slate-500 hover:text-[#1A3A6B] ${activePage === "admin" ? "bg-[#1A3A6B] text-white" : ""}`}
          >
            💻 Admin Login / व्यवस्थापक प्रवेश
          </button>
        </div>
      )}

      {/* 5. ACTIVE URGENT BIDS MARQUEE HIGHLIGHT */}
      <section id="announcements-news-ticker" className="bg-[#D4A017] text-[#1A3A6B] font-bold text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="bg-[#1A3A6B] text-[#D4A017] text-[10px] font-black px-2.5 py-1 rounded shadow-sm flex-shrink-0 uppercase font-mono tracking-wider">
            {language === "en" ? "Announcements" : "सूचना पट्ट"}
          </span>
          <div className="overflow-hidden relative w-full h-5">
            <marquee className="text-xs transition-transform duration-1000" scrollamount="4">
              ✨ {t.admissionNotice} | ⭐ L.S.S.S.S. GDC Mant is open for offline merit registrations now. | 📑 UP Scholarships form physical document matching check in progress. | 🎓 Proud of our DBRAU Agra Gold Medalists in Sociological & Experimental domains.
            </marquee>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM MAIN VIEW ROUTER */}
      <main id="app-dynamic-view" className="flex-grow">
        
        {/* HOME VIEW DESKS */}
        {activePage === "home" && (
          <div id="homepage-dashboard" className="space-y-16 py-10 px-4 md:px-8 max-w-7xl mx-auto">
            
            {/* HERO SECTION CONTAINER */}
            <div id="home-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4A017]/10 rounded-full blur-2xl"></div>
              
              <div className="lg:col-span-8 space-y-6">
                <span className="text-[#D4A017] font-semibold text-xs tracking-wider uppercase block">
                  🛡️ Government Degree College - Mathura, UP
                </span>
                <h2 id="home-main-title" className="text-3xl md:text-5xl font-sans font-black text-[#1A3A6B] tracking-tight leading-tight">
                  {t.philosophyTitle}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl">
                  {language === "en"
                    ? "Welcome to L.S.S.S.S. Government Degree College, operating transparently since 2003 under Section 12(B) guidelines of UGC. We empower local agricultural & rural generations by hosting premier UPPSC-appointed Ph.D scholars and charging standard, low-cost institutional fees."
                    : "एल.एस.एस.एस.एस. राजकीय महाविद्यालय, मांट की आधिकारिक साइट पर आपका स्वागत है। २००३ से स्थापित यह कॉलेज यूजीसी अधिनियम की धारा १२(बी) के मानदंडों का पालन करता हुआ मांट (मथुरा) क्षेत्र की पीढ़ियों को नाममात्र सरकारी शुल्क में उच्च शिक्षा प्रदान करता है।"}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActivePage("admissions")}
                    className="bg-[#1A3A6B] hover:bg-[#112547] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>{t.applyNow}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A017]" />
                  </button>

                  <button
                    onClick={() => setActivePage("about")}
                    className="bg-[#F8F6F0] hover:bg-gray-100 text-[#1A3A6B] font-bold px-6 py-3 rounded-xl border border-gray-200 transition-all cursor-pointer"
                  >
                    {t.learnMore}
                  </button>
                </div>
              </div>

              {/* HERO SIDE PORTLET BADGE */}
              <div className="lg:col-span-4 bg-[#F8F6F0] p-6 rounded-2xl border border-gray-200 text-center space-y-4">
                <div className="w-16 h-16 bg-[#1A3A6B] text-[#D4A017] rounded-full mx-auto flex items-center justify-center shadow-md border-2 border-[#D4A017]">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1A3A6B] uppercase block">NAAC Preparation Status</span>
                  <span className="text-lg font-black text-rose-600 block">UGC 12(B) RECOGNIZED</span>
                  <span className="text-[10px] text-gray-500 block leading-relaxed mt-1">Affiliated with Dr. Bhimrao Ambedkar University, Agra</span>
                </div>
              </div>
            </div>

            {/* ANIMATED STATISTICS TICKER GRID */}
            <div id="stats-ticker-grid" className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2.5xl text-center border border-gray-100 shadow-sm space-y-1 hover:border-[#D4A017] transition-colors">
                <span className="text-4xl font-extrabold text-[#1A3A6B] block tracking-tight">{t.studentsCount}</span>
                <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">{t.studentsLabel}</span>
              </div>

              <div className="bg-white p-6 rounded-2.5xl text-center border border-gray-100 shadow-sm space-y-1 hover:border-[#D4A017] transition-colors">
                <span className="text-4xl font-extrabold text-[#1A3A6B] block tracking-tight">{t.facultyCount}</span>
                <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">{t.facultyLabel}</span>
              </div>

              <div className="bg-white p-6 rounded-2.5xl text-center border border-gray-100 shadow-sm space-y-1 hover:border-[#D4A017] transition-colors">
                <span className="text-4xl font-extrabold text-[#1A3A6B] block tracking-tight">{t.coursesCount}</span>
                <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">{t.coursesLabel}</span>
              </div>

              <div className="bg-white p-6 rounded-2.5xl text-center border border-gray-100 shadow-sm space-y-1 hover:border-[#D4A017] transition-colors">
                <span className="text-4xl font-extrabold text-[#1A3A6B] block tracking-tight">{t.establishedYear}</span>
                <span className="text-xs text-gray-500 font-medium block uppercase tracking-wider">{t.establishedLabel}</span>
              </div>

            </div>

            {/* DUAL COLUMN DETAILS: NOTICES SIDEBAR + PRINCIPAL WELCOME BRIEF */}
            <div id="dual-home-columns" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* PRIMARY WELCOME DESK LEFT */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Principal Message Widget */}
                <div className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm space-y-6">
                  <h3 className="text-2xl font-bold text-[#1A3A6B]">
                    ✍️ {t.principalTitle} / प्राचार्य वक्तव्य
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <img 
                      src="/IMG_20211202_183832_347.jpg" 
                      alt="Principal Prof. (Dr.) Surendra Singh" 
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#D4A017] flex-shrink-0 shadow"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-[#D4A017] pl-3">
                        {t.principalText}
                      </p>
                      <span className="block text-xs font-bold text-[#1A3A6B]">
                        - Prof. (Dr.) Surendra Singh, Professor (Chemistry) & Principal
                      </span>
                    </div>
                  </div>
                </div>

                {/* UGC Section 12(B) compliance alert block */}
                <div className="bg-[#1A3A6B]/5 p-6 rounded-2xl border border-[#1A3A6B]/15 space-y-3">
                  <div className="flex items-center gap-2 text-[#1A3A6B]">
                    <Shield className="w-5 h-5 text-[#D4A017] flex-shrink-0" />
                    <span className="font-bold text-sm">Certified UGC & DBRAU Agra Government Standards</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    L.S.S.S.S. Government Degree College establishes rigorous quality checks following NAAC guidelines. Physical laboratories examine critical metrics, other structures facilitate clean exams without administrative exceptions.
                  </p>
                </div>

              </div>

              {/* INTERACTIVE NOTICES SIDEBAR & PRESS LOGS RIGHT */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-6 self-start">
                <div className="flex justify-between items-center border-b border-gray-150 pb-3">
                  <h3 className="text-lg font-bold text-[#1A3A6B] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#D4A017]" />
                    <span>{language === "en" ? "Notices Board" : "सूचना बोर्ड"}</span>
                  </h3>
                  <button 
                    onClick={() => setActivePage("student")}
                    className="text-xs text-[#D4A017] hover:underline font-semibold"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {notices.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No notices logged.</p>
                  ) : (
                    notices.map((n) => (
                      <div key={n.id} className="p-4 bg-[#F8F6F0] rounded-xl border border-transparent hover:border-[#D4A017] transition-all space-y-2 relative">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                            {n.category}
                          </span>
                          {n.isUrgent && (
                            <span className="bg-red-100 text-red-700 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase animate-bounce">
                              {t.urgent}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-gray-800 leading-snug">
                          {n.title}
                        </h4>

                        <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">
                          {n.content}
                        </p>

                        <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 pt-1">
                          <span>Date: {n.date}</span>
                          <button 
                            onClick={() => alert(`Simulating file download of public notice document [${n.title}] conform to DBRAU/Govt policy.`)}
                            className="text-[#1A3A6B] hover:underline flex items-center gap-0.5 font-bold"
                          >
                            <Download className="w-3 h-3" /> Download PDF
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* INTEGRATED INTERACTIVE FAQS */}
            <div id="home-faqs" className="bg-[#F8F6F0] p-8 rounded-3xl border border-gray-200 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#1A3A6B] text-center">
                Frequently Asked Inquiries (FAQ)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                
                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                  <span className="font-bold text-[#1A3A6B] block">Q. Is GDC Mant recognized by UGC?</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Yes, L.S.S.S.S. Government Degree College, Mant is UGC-recognised under section 12(B) and 2(f), establishing academic autonomy and eligibility for research and development grants.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                  <span className="font-bold text-[#1A3A6B] block">Q. क्या यहाँ समाजशास्त्र या इतिहास में पी.एच.डी. उपलब्ध है?</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    हाँ, समाजशास्त्र, इतिहास और अर्थशास्त्र विभागों में पंजीकृत शोध निर्देशक उपलब्ध हैं, जो उच्चतर शोधार्थियों को मार्गदर्शित कर रहे हैं।
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                  <span className="font-bold text-[#1A3A6B] block">Q. How do I apply for admissions or scholarships?</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Students can submit online entry applications securely via our Admission Desk, and physical documents can be aligned under UP Scholarship norms at Room No. 4.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-2">
                  <span className="font-bold text-[#1A3A6B] block">Q. क्या महाविद्यालय में स्काउट-गाइड या एन.एस.एस उपलब्ध है?</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    हाँ, महाविद्यालय में उत्कृष्ट एन.एस.एस. विंग और रोवर्स रेंजर्स (स्काउट गाइड) इकाई सक्रिय हैं, जो सह-शैक्षणिक विकास को सुदृढ़ करती हैं।
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Dynamic Navigation routing components */}
        {activePage === "about" && <AboutPage language={language} t={t} />}
        {activePage === "iqac" && <IQACPage language={language} reports={iqacReports} />}
        {activePage === "research" && <ResearchPage language={language} supervisors={supervisors} projects={projects} />}
        {activePage === "academics" && <AcademicsPage language={language} />}
        {activePage === "admissions" && <AdmissionsPage language={language} />}
        {activePage === "facilities" && <FacilitiesPage language={language} />}
        {activePage === "faculty" && <FacultyPage language={language} facultyList={faculty} />}
        {activePage === "student" && <StudentCornerPage language={language} />}
        {activePage === "gallery" && <GalleryPage language={language} galleryList={gallery} />}
        {activePage === "contact" && <ContactPage language={language} />}
        
        {/* Protected Control Panel */}
        {activePage === "admin" && (
          <AdminPanel 
            language={language} 
            notices={notices} 
            onRefreshNotices={loadDatabaseValues} 
          />
        )}

      </main>

      {/* 7. SECURE INSTITUTIONAL FOOTER */}
      <footer id="primary-college-footer" className="bg-[#1A3A6B] text-white/95 text-xs py-12 px-4 md:px-8 border-t-4 border-[#D4A017]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Institutional Core */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#D4A017]">
              L.S.S.S.S. Government Degree College
            </h3>
            <span className="text-[10px] text-white/60 font-semibold block uppercase font-mono">Mathura, Uttar Pradesh</span>
            <p className="leading-relaxed text-white/85">
              Empowering rural mindsets through accessible, high-integrity education, research guides and active national service programs conforming strictly to UGC norms.
            </p>
          </div>

          {/* Column 2: Location Map directions */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#D4A017]">Location Address & Office</h4>
            <p className="leading-relaxed text-white/85">
              📍 Village Mant, Mant-Bajna Road, Mathura, Uttar Pradesh, PIN - 281202
            </p>
            <p className="leading-relaxed text-white/80">
              ✉️ principalgdcmant@gmail.com
            </p>
          </div>

          {/* Column 3: External compliance links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#D4A017]">Affiliating & Oversight Bodies</h4>
            <ul className="space-y-2 text-white/80 font-semibold">
              <li>
                <a href="https://www.ugc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A017] flex items-center gap-1.5">
                  University Grants Commission (UGC)
                </a>
              </li>
              <li>
                <a href="http://dbrau.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A017] flex items-center gap-1.5">
                  Dr. Bhimrao Ambedkar University, Agra
                </a>
              </li>
              <li>
                <a href="http://uphe.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A017] flex items-center gap-1.5">
                  Directorate of Higher Education, UP
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal and compliance notice bar */}
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 pt-6 text-center text-white/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px]">
          <span>© 2026 L.S.S.S.S. Government Degree College, Mant. All Rights Reserved.</span>
          <span className="text-white/60 font-mono">UGC 2(f) & 12(B) State Administered portal</span>
        </div>
      </footer>

    </div>
  );
}
