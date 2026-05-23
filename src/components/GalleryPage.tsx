import React, { useState } from "react";
import { Camera, Eye, Filter } from "lucide-react";

interface GalleryPageProps {
  language: "en" | "hi";
  galleryList: any[];
}

export default function GalleryPage({ language, galleryList }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Campus", "NSS", "Sports", "Cultural", "Events"];

  const filteredItems = selectedCategory === "All" 
    ? galleryList 
    : galleryList.filter(item => item.category === selectedCategory);

  const current = language === "en" ? {
    title: "Multimedia Gallery",
    subtitle: "Life & Co-curricular Activities at GDC Mant Campus",
    noData: "No gallery items recorded in this folder."
  } : {
    title: "संस्थान गैलरी (चित्र संकलन)",
    subtitle: "राजकीय महाविद्यालय मांट परिसर की गतिविधियाँ एवं शैक्षणिक यादें",
    noData: "इस केटेगरी में कोई छवि उपलब्ध नहीं है।"
  };

  return (
    <div id="gallery-page-container" className="py-10 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div id="gallery-header" className="text-center space-y-4">
        <span className="text-[#D4A017] font-semibold text-sm tracking-widest uppercase block">
          {language === "en" ? "Visual Campus Life" : "परिसर की झलकियाँ"}
        </span>
        <h1 id="gallery-title" className="text-3xl md:text-5xl font-sans font-bold text-[#1A3A6B] tracking-tight">
          {current.title}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {current.subtitle}
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full"></div>
      </div>

      {/* Category Horizontal Filters */}
      <div className="flex flex-wrap gap-2 justify-center pt-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              selectedCategory === cat 
                ? "bg-[#1A3A6B] text-white border-[#1A3A6B] shadow-sm" 
                : "bg-white text-gray-600 border-gray-200 hover:border-[#1A3A6B]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center text-gray-500 py-12 font-medium">
          {current.noData}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category label badge */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#1A3A6B] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md shadow-sm border border-gray-100 uppercase">
                  {item.category}
                </span>
                
                <div className="absolute inset-0 bg-[#1A3A6B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <Eye className="w-5 h-5 text-[#1A3A6B]" />
                  </div>
                </div>
              </div>

              {/* Caption details */}
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-gray-800 leading-snug line-clamp-1">{item.title}</h4>
                <span className="text-[10px] font-mono text-gray-400 block">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
