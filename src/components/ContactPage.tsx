import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2 } from "lucide-react";
import { submitEnquiry } from "../localDb";

interface ContactPageProps {
  language: "en" | "hi";
}

export default function ContactPage({ language }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMsg(language === "en" ? "Please fill the mandatory fields (Name, Phone, and Enquiry Body)" : "कृपया नाम, फ़ोन और पुछताछ संदेश अनिवार्य रूप से भरें।");
      setLoading(false);
      return;
    }

    try {
      const res = await submitEnquiry(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setErrorMsg("Failed to deliver inquiry");
      }
    } catch (err) {
      setErrorMsg("Host unreachable. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div id="contact-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Institutional Office Support" : "संस्थागत सहायता केन्द्र"}
        </span>
        <h1 id="contact-title" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {language === "en" ? "Contact Office & Help Desk" : "कार्यालय संपर्क विवरण"}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {language === "en"
            ? "Connect with us during campus standard operating hours (10:00 AM to 4:00 PM on working days). Submissions will be logged instantly."
            : "कार्य दिवसों में सुबह १०:०० से शाम ०४:०० बजे के बीच संपर्क करें। आपके द्वारा दर्ज की गई पूछताछ का शीघ्र निदान किया जाएगा।"}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      <div id="contact-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact info cards - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-[#1A3A6B]/5 rounded-xl text-[#1A3A6B] flex-shrink-0 border border-[#1A3A6B]/10">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#1A3A6B] font-bold text-sm block mb-1">
                {language === "en" ? "College Location" : "महाविद्यालय का पता"}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                L.S.S.S.S. Government Degree College,
                <span className="block font-normal">Mant-Bajna Road, Mant Village</span>
                <span className="block font-normal">Mathura, Uttar Pradesh, PIN - 281202</span>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-[#D4A017]/10 rounded-xl text-[#D4A017] flex-shrink-0 border border-[#D4A017]/25">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#1A3A6B] font-bold text-sm block mb-1">
                Email Address
              </span>
              <a href="mailto:principalgdcmant@gmail.com" className="text-xs text-gray-600 hover:text-[#1A3A6B] block">
                principalgdcmant@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600 flex-shrink-0 border border-rose-100">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#1A3A6B] font-bold text-sm block mb-1">
                {language === "en" ? "Phone Helpline" : "हेल्पलाइन नंबर"}
              </span>
              <span className="text-xs text-gray-600 block">+91-565-2970034</span>
            </div>
          </div>

          {/* Google map embedding placeholder or link */}
          <div className="bg-[#F8F6F0] p-6 rounded-2xl border border-gray-200">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block mb-2">地理 Location Route Map</span>
            <div className="bg-gray-150 h-40 rounded-xl border border-gray-200 flex flex-col justify-center items-center text-center p-4">
              <span className="text-[#1A3A6B] font-bold text-sm block">Mant Block, Mathura Region</span>
              <p className="text-[10px] text-gray-500 max-w-xs mt-1">
                Connected closely to Yamuna Expressway (Exit 11), Mant circle.
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 text-xs bg-[#1A3A6B] hover:bg-[#112547] text-white px-4 py-1.5 rounded-lg font-semibold"
              >
                Open Google Maps Location
              </a>
            </div>
          </div>

        </div>

        {/* Dynamic enquiry submission form - 7 columns */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-150 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-[#1A3A6B] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D4A017]" />
            {language === "en" ? "Public Inquiry Log Form" : "सार्वजनिक पूछताछ पंजीकरण फॉर्म"}
          </h3>

          {success && (
            <div className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#D4A017] flex-shrink-0" />
              <span>{language === "en" ? "Thank you! Your message was received securely. GDC Mant administration will follow up shortly." : "धन्यवाद! आपकी पूछताछ सफलतापूर्वक दर्ज कर ली गई है। शीघ्र ही आपसे संपर्क किया जाएगा।"}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            
            {/* Sender Name */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Your Full Name *" : "आपका पूरा नाम *"}</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
                placeholder="e.g. Surendra Sharma"
              />
            </div>

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-gray-700 font-semibold">{language === "en" ? "Email Address" : "ईमेल आईडी"}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
                  placeholder="e.g. surendra@gmail.com"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-gray-700 font-semibold">{language === "en" ? "Mobile Number *" : "मोबाइल नंबर *"}</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
                  placeholder="e.g. 9876XXXXXX"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Subject" : "विषय"}</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
                placeholder="Core agenda / Inquiry header"
              />
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-semibold">{language === "en" ? "Enquiry Message *" : "पुछताछ संदेश *"}</label>
              <textarea 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50 resize-none"
                placeholder="Describe your inquiry or credentials detail..."
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A3A6B] hover:bg-[#112547] text-white p-3.5 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-[#D4A017]" />
              <span>{loading ? "Sending..." : (language === "en" ? "Send Inquiry Message" : "पूछताछ दर्ज करें")}</span>
            </button>

          </form>
        </div>

      </div>

    </div>
  );
}
