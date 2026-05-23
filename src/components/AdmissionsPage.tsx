import React, { useState } from "react";
import { Send, FileCheck, Info, ChevronDown } from "lucide-react";

interface AdmissionsPageProps {
  language: "en" | "hi";
}

export default function AdmissionsPage({ language }: AdmissionsPageProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    email: "",
    phone: "",
    courseSelected: "B.A. (Hindi, Sociology, Political Science)",
    gender: "Male",
    dob: "",
    category: "GEN",
    marksPercentage: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const courseOptions = [
    "B.A. (Hindi, Sociology, History)",
    "B.A. (Hindi, Sociology, Political Science)",
    "B.A. (English, Geography, Economics)",
    "B.A. (Sanskrit, Geography, Home Science)",
    "B.Sc. (Physics, Chemistry, Maths)",
    "B.Sc. (Zoology, Botany, Chemistry)",
    "B.Com. (Financial & Goods Services)",
    "M.A. Sociology (समाजशास्त्र)",
    "M.A. History (इतिहास)",
    "M.A. Economics (अर्थशास्त्र)"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    // Simple fields validation
    if (!formData.studentName || !formData.fatherName || !formData.phone || !formData.marksPercentage) {
      setErrorMsg(language === "en" ? "Please fill all mandatory fields marked (*)" : "कृपया (*) अंकित सभी अनिवार्य फ़ील्ड भरें।");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(true);
        setFormData({
          studentName: "",
          fatherName: "",
          email: "",
          phone: "",
          courseSelected: "B.A. (Hindi, Sociology, Political Science)",
          gender: "Male",
          dob: "",
          category: "GEN",
          marksPercentage: "",
          address: ""
        });
      } else {
        setErrorMsg(data.error || "Submission failed");
      }
    } catch (err) {
      setErrorMsg("Connection Timeout. Please check if your Dev Server is operating correctly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="admissions-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Page Title */}
      <div id="admissions-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Academic Session 2026-27 Registrations" : "शैक्षणिक सत्र २०२६-२७ पंजीकरण"}
        </span>
        <h1 id="admissions-title" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {language === "en" ? "Online Admission Desk" : "ऑनलाइन प्रवेश प्रकोष्ठ"}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {language === "en"
            ? "Submit your digital application securely. Standard UP Government reservation matrix and minimum verification benchmarks are followed."
            : "सुरक्षित रूप से अपना डिजिटल आवेदन जमा करें। मानक उत्तर प्रदेश शासन आरक्षण नियमों और दिशानिर्देशों का पूर्ण पालन किया जाता है।"}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* Grid: Instructions (Left) + Form (Right) */}
      <div id="admissions-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Reservation and Fee Instructions Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1A3A6B] text-white p-6 rounded-2xl space-y-4 shadow-md">
            <h3 className="text-lg font-bold border-b border-white/20 pb-2">
              ⚠️ {language === "en" ? "Documents Checklist" : "आवश्यक दस्तावेजों की सूची"}
            </h3>
            <ul className="text-xs space-y-2 text-white/90 font-sans list-disc list-inside">
              <li>High School Certificate (10th)</li>
              <li>Intermediate Marks sheet (12th)</li>
              <li>Income and Caste Certificate (for reservations / scholarships)</li>
              <li>Domicile Certificate (Uttar Pradesh resident)</li>
              <li>Transfer Certificate (TC) & Character Certificate</li>
              <li>Passport size photographs (4 copies)</li>
            </ul>
          </div>

          <div className="bg-[#F8F6F0] p-6 rounded-2xl border border-gray-200 space-y-4">
            <h4 className="text-sm font-bold text-[#1A3A6B] uppercase tracking-wider">
              {language === "en" ? "Reservation & Fee Rules" : "आरक्षण एवं सरकारी शुल्क नियम"}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {language === "en"
                ? "Academic fees follow State Govt directives strictly. Fee waiver and UP Scholarship systems are deployed matching SC, ST and poor OBC candidates based on Income Criteria verification."
                : "शैक्षणिक शुल्क उत्तर प्रदेश शासन के शासनादेश का अक्षरशः पालन करता है। गरीब अनुसूचित जाति/जनजाति और अन्य पिछड़ा वर्ग के छात्रों को आय सीमा के आधार पर छात्रवृत्ति योजना से लाभान्वित किया जाता है।"}
            </p>
          </div>
        </div>

        {/* High Converting Online Application Form Form Column */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-[#1A3A6B] flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#D4A017]" />
            {language === "en" ? "Secure Admission Registration Form" : "सुरक्षित प्रवेश हेतु पंजीकरण फॉर्म"}
          </h3>

          {success && (
            <div className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl text-sm font-medium space-y-2">
              <p>💚 {language === "en" ? "Your Application was submitted successfully to GDC Mant Admission Registry! Write down your reference number: " : "आपका आवेदन मांट राजकीय महाविद्यालय प्रवेश अनुभाग को प्राप्त हो चुका है! अपना संदर्भ क्रमांक नोट करें: "}
                <strong className="block text-base mt-1 text-[#1A3A6B] font-mono">APP-GDC-{Date.now().toString().slice(-6)}</strong>
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            
            {/* Student Name */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Student's Full Name *" : "छात्र/छात्रा का पूरा नाम *"}</label>
              <input 
                type="text" 
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="e.g. Rahul Singh"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              />
            </div>

            {/* Father Name */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Father's Full Name *" : "पिता का नाम *"}</label>
              <input 
                type="text" 
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="e.g. Shri Mahendra Singh"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Email Address" : "ईमेल आईडी"}</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. rahul@gmail.com"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Mobile Number *" : "मोबाइल नंबर *"}</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 9876XXXXXX"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              />
            </div>

            {/* Selected Course */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Stream Program Selected *" : "चयनित संकाय / स्ट्रीम *"}</label>
              <select 
                name="courseSelected"
                value={formData.courseSelected}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              >
                {courseOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Gender" : "लिंग"}</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              >
                <option value="Male">Male / पुरुष</option>
                <option value="Female">Female / महिला</option>
                <option value="Other">Other / अन्य</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Date of Birth *" : "जन्म तिथि *"}</label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Caste Category" : "वर्ग श्रेणी"}</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              >
                <option value="GEN">General / सामान्य</option>
                <option value="OBC">OBC / अन्य पिछड़ा वर्ग</option>
                <option value="SC">SC / अनुसूचित जाति</option>
                <option value="ST">ST / अनुसूचित जनजाति</option>
              </select>
            </div>

            {/* 12th Marks */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "12th Standard Percentage (%) *" : "१२वीं कक्षा का कुल प्रतिशत (%) *"}</label>
              <input 
                type="number" 
                step="0.01"
                name="marksPercentage"
                value={formData.marksPercentage}
                onChange={handleInputChange}
                placeholder="e.g. 84.50"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Postal Address / स्थायी पता" : "स्थायी / डाक पता"}</label>
              <textarea 
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Village / Post, Tehsil, District, PIN Code"
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A3A6B] hover:bg-[#112547] text-white font-bold p-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Saving application...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-[#D4A017]" />
                    <span>{language === "en" ? "Submit Admission Form" : "प्रवेश फॉर्म जमा करें"}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
