import React, { useState, useEffect } from "react";
import { Lock, Unlock, Mail, FileText, Check, Plus, Trash2, Calendar, FileSpreadsheet, Eye } from "lucide-react";

interface AdminPanelProps {
  language: "en" | "hi";
  notices: any[];
  onRefreshNotices: () => void;
}

export default function AdminPanel({ language, notices, onRefreshNotices }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"admissions" | "notices" | "enquiries">("admissions");

  // Admin operational states
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Form states to create item
  const [newNotice, setNewNotice] = useState({ title: "", content: "", category: "academic", isUrgent: false });
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // Authenticate via proxy
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuthToken(data.token);
        // Save local session
        localStorage.setItem("gdc_admin_token", data.token);
      } else {
        setErrorMsg(data.error || "Incorrect password credential.");
      }
    } catch (err) {
      setErrorMsg("Network timeout during auth submission.");
    } finally {
      setLoading(false);
    }
  };

  // Restore session
  useEffect(() => {
    const cachedToken = localStorage.getItem("gdc_admin_token");
    if (cachedToken) {
      setAuthToken(cachedToken);
    }
  }, []);

  // Fetch protected data
  useEffect(() => {
    if (!authToken) return;

    const fetchAdmissionsAndEnquiries = async () => {
      try {
        const h = { Authorization: `Bearer ${authToken}` };

        // 1. Admission records
        const admRes = await fetch("/api/admissions", { headers: h });
        if (admRes.ok) {
          const admData = await admRes.json();
          setAdmissions(admData);
        }

        // 2. Enquiries
        const enqRes = await fetch("/api/enquiries", { headers: h });
        if (enqRes.ok) {
          const enqData = await enqRes.json();
          setEnquiries(enqData);
        }
      } catch (err) {
        console.error("Failed fetching admin resources", err);
      }
    };

    fetchAdmissionsAndEnquiries();
  }, [authToken, notices]);

  // Logout
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("gdc_admin_token");
  };

  // Set Admission applicant status
  const handleSetStatus = async (id: string, nextStatus: string) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        // Update local status safely
        setAdmissions(admissions.map(adm => adm.id === id ? { ...adm, status: nextStatus } : adm));
      }
    } catch (err) {
      alert("Failed to patch status");
    }
  };

  // Create Notice
  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken || !newNotice.title) return;

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(newNotice)
      });
      if (res.ok) {
        setNoticeSuccess(true);
        setNewNotice({ title: "", content: "", category: "academic", isUrgent: false });
        onRefreshNotices();
        setTimeout(() => setNoticeSuccess(false), 3000);
      }
    } catch (err) {
      alert("Failed creating notice");
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id: string) => {
    if (!authToken) return;
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        onRefreshNotices();
      }
    } catch (err) {
      alert("Failed deleting notice");
    }
  };

  // Unauthorized lock display
  if (!authToken) {
    return (
      <div id="admin-gate" className="max-w-md mx-auto py-20 px-6 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-150 shadow-lg text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-[#1A3A6B]/5 text-[#1A3A6B] rounded-full flex items-center justify-center border border-[#1A3A6B]/10 shadow-sm">
            <Lock className="w-8 h-8 text-[#D4A017]" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#1A3A6B]">
              {language === "en" ? "GDC Mant Admin Desk" : "राजकीय कॉलेज मुख्य व्यवस्थापक लॉगिन"}
            </h2>
            <p className="text-xs text-gray-500">
              {language === "en" ? "Enter the protected institutional password key to unlock rosters and notices management." : "डेटाबेस अपडेट और प्रबंधित करने के लिए सुरक्षा पंजी कुंजी दर्ज करें।"}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl border border-red-100 italic">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5 text-left">
              <label className="block text-gray-600 font-bold uppercase tracking-wider">🔒 Password Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (Standard Key: gdc-mant-admin-key)"
                className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A3A6B] hover:bg-[#112547] text-white p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow"
            >
              {loading ? "Authenticating Master key..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-panel-dashboard" className="py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin header */}
      <div className="bg-[#1A3A6B] text-white p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-rose-400 font-mono text-xs tracking-widest font-bold uppercase block leading-none mb-1">
            💻 Secure Root Mode Connected
          </span>
          <h2 className="text-2xl font-black">L.S.S.S.S. GDC Mant Console</h2>
          <span className="text-xs text-white/70 block">Authorized Representative: principalgdcmant@gmail.com</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/10 cursor-pointer"
        >
          Close Session (Logout)
        </button>
      </div>

      {/* Admin Horizontal Tabs */}
      <div className="flex border-b border-gray-100 text-xs gap-3 font-semibold pb-1">
        <button
          onClick={() => setActiveTab("admissions")}
          className={`pb-3 px-4 transition-all uppercase tracking-wider ${activeTab === "admissions" ? "border-b-2 border-[#1A3A6B] text-[#1A3A6B]" : "text-gray-400 hover:text-gray-600"}`}
        >
          📋 Admissions ({admissions.length})
        </button>
        <button
          onClick={() => setActiveTab("notices")}
          className={`pb-3 px-4 transition-all uppercase tracking-wider ${activeTab === "notices" ? "border-b-2 border-[#1A3A6B] text-[#1A3A6B]" : "text-gray-400 hover:text-gray-600"}`}
        >
          📢 Notices & Events ({notices.length})
        </button>
        <button
          onClick={() => setActiveTab("enquiries")}
          className={`pb-3 px-4 transition-all uppercase tracking-wider ${activeTab === "enquiries" ? "border-b-2 border-[#1A3A6B] text-[#1A3A6B]" : "text-gray-400 hover:text-gray-600"}`}
        >
          📨 Public Queries ({enquiries.length})
        </button>
      </div>

      {/* Tab contents */}
      <div className="pt-4 text-sm">
        
        {/* Admissions Tab */}
        {activeTab === "admissions" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#1A3A6B] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#D4A017]" /> Received Admission Forms
            </h3>

            {admissions.length === 0 ? (
              <p className="text-gray-400 italic">No admission application records.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {admissions.map((adm) => (
                  <div key={adm.id} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-[#1A3A6B] text-base">{adm.studentName}</h4>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          adm.status === "Approved" ? "bg-green-100 text-green-800" :
                          adm.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                        }`}>
                          {adm.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-xs text-slate-500 font-mono">
                        <span><strong>Father:</strong> {adm.fatherName}</span>
                        <span><strong>Phone:</strong> {adm.phone}</span>
                        <span><strong>DOB:</strong> {adm.dob}</span>
                        <span><strong>Category:</strong> {adm.category}</span>
                        <span><strong>12th Marks:</strong> {adm.marksPercentage}%</span>
                        <span><strong>Date:</strong> {adm.submissionDate}</span>
                        <span className="sm:col-span-2"><strong>Stream Desired:</strong> {adm.courseSelected}</span>
                        <span className="sm:col-span-2"><strong>Address:</strong> {adm.address}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 self-stretch lg:self-center">
                      <button 
                        onClick={() => handleSetStatus(adm.id, "Approved")}
                        className="flex-1 lg:flex-initial bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button 
                        onClick={() => handleSetStatus(adm.id, "Rejected")}
                        className="flex-1 lg:flex-initial bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === "notices" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form list left */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 self-start">
              <h3 className="text-base font-bold text-[#1A3A6B]">📢 Dispatch New Urgent Notice</h3>
              
              {noticeSuccess && (
                <div className="p-3 bg-green-50 text-green-800 rounded-xl text-xs font-semibold">
                  Notice uploaded and published to GDC board!
                </div>
              )}

              <form onSubmit={handleAddNotice} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block text-gray-600 font-bold">Notice Title</label>
                  <input 
                    type="text" 
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="e.g. B.A End Semester Practical Dates 2026"
                    className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-600 font-bold">Details Content</label>
                  <textarea 
                    rows={3}
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    placeholder="Provide description and PDF reference details..."
                    className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50 resize-none"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-600 font-bold">Section Category</label>
                  <select 
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1A3A6B] bg-gray-50/50"
                  >
                    <option value="academic">Academic / शैक्षणिक</option>
                    <option value="admission">Admissions / प्रवेश</option>
                    <option value="exam">Examinations / परीक्षा</option>
                    <option value="general">General Agenda</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={newNotice.isUrgent}
                    onChange={(e) => setNewNotice({ ...newNotice, isUrgent: e.target.checked })}
                    id="urgent-check"
                    className="w-4 h-4 text-[#1A3A6B] border-gray-300 rounded"
                  />
                  <label htmlFor="urgent-check" className="font-bold text-red-600 cursor-pointer">Mark as URGENT (Blinking Alert)</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A3A6B] hover:bg-[#112547] text-white p-3 rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#D4A017]" /> Upload Notice
                </button>
              </form>
            </div>

            {/* Existing listings right */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-[#1A3A6B]">Roster of Active Notices</h3>
              <div className="space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 font-mono">[{n.category}]</span>
                        {n.isUrgent && <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase font-mono animate-pulse">Urgent</span>}
                      </div>
                      <h4 className="text-sm font-bold text-gray-800 mt-1">{n.title}</h4>
                      <span className="text-[10px] text-gray-400 block font-mono">{n.date}</span>
                    </div>

                    <button 
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Enquiries tab */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#1A3A6B]">📨 Public Inquiry Logs</h3>
            {enquiries.length === 0 ? (
              <p className="text-gray-400 italic">No public inquiries submitted.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-gray-50 pb-3">
                      <div>
                        <h4 className="font-bold text-[#1A3A6B] text-base">{enq.name}</h4>
                        <div className="flex flex-wrap gap-x-4 text-xs font-mono text-gray-400 mt-1">
                          <span>Email: {enq.email || "N/A"}</span>
                          <span>Phone: {enq.phone}</span>
                          <span>Submitted: {enq.date}</span>
                        </div>
                      </div>
                      <span className="bg-[#D4A017]/10 text-[#1A3A6B] px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                        {enq.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#1A3A6B] uppercase tracking-wider block">Subject Agenda:</span>
                      <p className="text-sm font-semibold text-gray-800">{enq.subject || "General inquiry"}</p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {enq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
