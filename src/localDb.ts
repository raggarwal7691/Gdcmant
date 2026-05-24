/**
 * Client-Side Persistence and Resilient Fallback Layer
 * This module ensures the app operates seamlessly in both Full-Stack (Express)
 * and Static Client-Only (Vercel, GitHub Pages) environments.
 */

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  isUrgent: boolean;
}

export interface Admission {
  id: string;
  studentName: string;
  fatherName: string;
  email: string;
  phone: string;
  courseSelected: string;
  gender: string;
  dob: string;
  category: string;
  marksPercentage: number;
  status: string;
  submissionDate: string;
  address: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: string;
}

// Initial default datasets matching college_db.json
const DEFAULT_NOTICES: Notice[] = [
  {
    id: "notice-1",
    title: "Online Admission Form Submission 2026-27 Started / ऑनलाइन प्रवेश फॉर्म जमा करना शुरू हुआ",
    content: "All eligible candidates seeking admission in BA, BSc, BCom, MA are requested to submit their application forms through the online portal or download the syllabus from our curriculum guide.",
    date: "2026-05-20",
    category: "admission",
    isUrgent: true
  },
  {
    id: "notice-2",
    title: "UP Scholarship 2026-27 Applications Submission & Verification / यूपी छात्रवृत्ति आवेदन और सत्यापन",
    content: "Students who have submitted scholarship online applications must submit a printout of the application form along with income, caste, and domicile certificates in Room No. 4.",
    date: "2026-05-18",
    category: "academic",
    isUrgent: true
  },
  {
    id: "notice-3",
    title: "BA/BSc Year-End Examination Timetable (Dr. BRAU Agra) / परीक्षा समय सारणी",
    content: "The annual/semester examinations schedule has been declared by Dr. Bhimrao Ambedkar University, Agra. Please check the notices board or collect admit cards from counter 1.",
    date: "2026-05-15",
    category: "exam",
    isUrgent: false
  },
  {
    id: "notice-4",
    title: "NSS 7-Day Special Camp Schedule: Community Outreach / एनएसएस विशेष शिविर कार्यक्रम",
    content: "NSS Unit of GDC Mant is organizing a 7-day special camp in adjacent rural regions. Interested NSS volunteers should register with Program Officer Dr. Rajiv Kumar.",
    date: "2026-05-10",
    category: "general",
    isUrgent: false
  }
];

const DEFAULT_ADMISSIONS: Admission[] = [
  {
    id: "adm-1779534120211",
    studentName: "Rahul",
    fatherName: "Sgghh",
    email: "rkgdcmant@gmail.com",
    phone: "09953059194",
    courseSelected: "B.Com. (Financial & Goods Services)",
    gender: "Male",
    dob: "1991-06-06",
    category: "GEN",
    marksPercentage: 75,
    status: "Pending",
    submissionDate: "2026-05-23",
    address: "Many raja"
  },
  {
    id: "adm-1",
    studentName: "Aarav Chaudhary",
    fatherName: "Mr. Rajendra Chaudhary",
    email: "aarav45@gmail.com",
    phone: "9876543210",
    courseSelected: "B.Sc. (Physics, Chemistry, Math)",
    gender: "Male",
    dob: "2008-08-14",
    category: "OBC",
    marksPercentage: 86.4,
    status: "Approved",
    submissionDate: "2026-05-21",
    address: "Village Mant, Mathura, UP"
  },
  {
    id: "adm-2",
    studentName: "Anjali Kumari",
    fatherName: "Mr. Shiv Kumar Dixit",
    email: "anjali2008@gmail.com",
    phone: "7402941829",
    courseSelected: "B.A. (Hindi, Sociology, Political Science)",
    gender: "Female",
    dob: "2008-11-20",
    category: "GEN",
    marksPercentage: 79.8,
    status: "Pending",
    submissionDate: "2026-05-22",
    address: "Bajna Road, Mant, Mathura, UP"
  }
];

const DEFAULT_ENQUIRIES: Enquiry[] = [
  {
    id: "enq-1",
    name: "Rajesh Kumar",
    email: "rajesh.mathura@gmail.com",
    phone: "8899889988",
    subject: "B.Com Syllabus and Fees Structure",
    message: "Please tell me what are the subjects available under CBCS pattern for B.Com first year and the fee structure for OBC student.",
    date: "2026-05-22",
    status: "Unread"
  }
];

const DEFAULT_FACULTY = [
  {
    id: "faculty-1",
    name: "Prof. (Dr.) Surendra Singh",
    designation: "Principal",
    department: "Administration / Chemistry",
    qualification: "M.Sc., Ph.D. in Chemistry, UPPSC Appointed",
    experience: "25+ Years of Academic Integrity",
    email: "principalgdcmant@gmail.com",
    phone: "+91-9412345678",
    image: "/IMG_20211202_183832_347.jpg",
    isUPPSC: true,
    researchInterest: "Coordination Chemistry, Heavy Metal Analysis"
  },
  {
    id: "faculty-2",
    name: "Dr. Rajiv Kumar",
    designation: "Assistant Professor",
    department: "Sociology",
    qualification: "M.A., NET, Ph.D. (Banaras Hindu University)",
    experience: "14 Years Experience, Research Guide",
    email: "rajiv.sociology@gmail.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    isUPPSC: true,
    researchInterest: "Rural Sociology, Social Empowerment in Western UP"
  },
  {
    id: "faculty-3",
    name: "Dr. Mamta Sharma",
    designation: "Assistant Professor",
    department: "History",
    qualification: "M.A., Ph.D. (Jawaharlal Nehru University)",
    experience: "9 Years Experience",
    email: "mamta.history.gdc@gmail.com",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    isUPPSC: true,
    researchInterest: "Ancient Culture of Mathura, Archaeological Excavations"
  },
  {
    id: "faculty-4",
    name: "Dr. Arvind Dixit",
    designation: "Assistant Professor",
    department: "Economics",
    qualification: "M.A., M.Phil, Ph.D. (Aligarh Muslim University)",
    experience: "11 Years",
    email: "arvind.econ@gmail.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    isUPPSC: true,
    researchInterest: "Agricultural Economics, Microfinance & Gram Vikas"
  },
  {
    id: "faculty-5",
    name: "Dr. Sandeep Singh",
    designation: "Assistant Professor",
    department: "Physics",
    qualification: "M.Sc., CSIR-NET, Ph.D.",
    experience: "8 Years",
    email: "sandeep.physics@gmail.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    isUPPSC: true,
    researchInterest: "Semiconductor Thin Films, Solar Energy Materials"
  },
  {
    id: "faculty-6",
    name: "Dr. Priyanka Chaturvedi",
    designation: "Assistant Professor",
    department: "Chemistry",
    qualification: "M.Sc., Ph.D.",
    experience: "7 Years",
    email: "priyanka.chem@gmail.com",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    isUPPSC: true,
    researchInterest: "Green Chemistry, Synthesis of Organic Ligands"
  },
  {
    id: "faculty-7",
    name: "Mr. RAHUL Kumar",
    designation: "Assistant Professor",
    department: "Commerce",
    qualification: "M.Com., UGC-NET",
    experience: "6 Years",
    email: "rahul.commerce@gmail.com",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    isUPPSC: true,
    researchInterest: "Corporate Governance, Goods & Services Tax (GST)"
  }
];

const DEFAULT_IQAC_REPORTS = [
  {
    id: "iqac-1",
    title: "Composition of Internal Quality Assurance Cell (IQAC)",
    academicYear: "2025-26",
    uploadDate: "2026-01-10"
  },
  {
    id: "iqac-2",
    title: "Minutes of IQAC First Quarter Development Meeteing",
    academicYear: "2025-26",
    uploadDate: "2025-10-15"
  },
  {
    id: "iqac-3",
    title: "Annual Quality Assurance Report (AQAR) - Part A Formulation",
    academicYear: "2024-25",
    uploadDate: "2025-08-30"
  },
  {
    id: "iqac-4",
    title: "Student Feedback Analysis & Action Taken Report",
    academicYear: "2024-25",
    uploadDate: "2025-05-20"
  }
];

const DEFAULT_SUPERVISORS = [
  {
    id: "sup-1",
    name: "Dr. Rajiv Kumar",
    department: "Sociology",
    slotsAvailable: 3,
    totalGuided: 4,
    researchAreas: [
      "Rural Agrarian Relations",
      "Social Stratification in Mathura Region"
    ]
  },
  {
    id: "sup-2",
    name: "Dr. Arvind Dixit",
    department: "Economics",
    slotsAvailable: 2,
    totalGuided: 3,
    researchAreas: [
      "Rural Microfinance",
      "Agricultural Labor Productivity"
    ]
  }
];

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Socio-Economic Mapping & Livelihood Analysis of Landless Farmers in Yamuna Expressway Corridor",
    supervisor: "Dr. Rajiv Kumar",
    department: "Sociology",
    status: "Ongoing",
    fundingAgency: "ICSSR (Govt. of India)",
    amount: "₹ 4,50,000",
    description: "This sociological research evaluates the dislocation of agrarian families due to infrastructure development in Mathura district and potential rehabilitation frameworks."
  },
  {
    id: "proj-2",
    title: "Financial Literacy and Adoption of Digital Payment Systems among Rural Women Entrepreneurs",
    supervisor: "Dr. Arvind Dixit",
    department: "Economics",
    status: "Completed",
    fundingAgency: "UGC Local Minor Grant",
    amount: "₹ 1,80,000",
    description: "Synthesized statistical analysis showing key challenges faced by self-help groups (SHG) across Mathura Block in implementing cashless transactions."
  }
];

const DEFAULT_GALLERY = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    title: "College ICT Smart Classroom Presentation",
    category: "Campus",
    date: "2026-03-12"
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    title: "L.S.S.S.S. GDC Mant Digital Library and Reading Hall",
    category: "Campus",
    date: "2026-04-18"
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    title: "NSS Swachh Bharat Abhiyan Rural Cleanliness Campaign",
    category: "NSS",
    date: "2026-04-20"
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    title: "Literary & Cultural Society Annual Quiz & Speech Competition",
    category: "Events",
    date: "2026-02-15"
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?q=80&w=800&auto=format&fit=crop",
    title: "Physics & Chemistry Advanced Lab Practical Sessions",
    category: "Campus",
    date: "2026-03-24"
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop",
    title: "Annual Sports Athletics Block Meet Winners",
    category: "Sports",
    date: "2026-01-29"
  }
];

// Helper to guarantee localStorage items exist and read them
const loadItem = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(data) as T;
  } catch (e) {
    console.error(`Error loading key ${key} from localStorage`, e);
    return defaultValue;
  }
};

const saveItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key ${key} to localStorage`, e);
  }
};

// STATIC CODE FOR MASTER KEY
export const STATIC_ADMIN_KEY = "gdc-mant-admin-key";
export const MOCK_AUTH_TOKEN = "gdc_mant_verified_token_2026";

/**
 * Perform Client-side Admin Password Check.
 * Completely local, offline-ready password validation.
 */
export const clientAdminLogin = async (password: string): Promise<{ success: boolean; token?: string; error?: string }> => {
  // Artificial UI delay for realistic authentication UX
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (password === STATIC_ADMIN_KEY) {
    localStorage.setItem("gdc_admin_token", MOCK_AUTH_TOKEN);
    return { success: true, token: MOCK_AUTH_TOKEN };
  } else {
    return { success: false, error: "Incorrect institutional master key." };
  }
};

// Helper to perform HTTP fetches with custom timeouts (prevents browser/server timeouts)
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeoutMs = 800): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

/**
 * Resilient GET Notices
 */
export const fetchNotices = async (): Promise<Notice[]> => {
  try {
    const res = await fetchWithTimeout("/api/notices");
    if (res.ok) {
      const data = await res.json();
      saveItem("gdc_notices", data);
      return data;
    }
  } catch (err) {
    console.warn("Express backend notices endpoint unavailable. Falling back to Local Session Storage.");
  }
  return loadItem("gdc_notices", DEFAULT_NOTICES);
};

/**
 * Resilient POST Notice
 */
export const createNotice = async (notice: Omit<Notice, "id" | "date">, token: string): Promise<{ success: boolean; notice?: Notice }> => {
  const newNoticeItem: Notice = {
    ...notice,
    id: `notice-${Date.now()}`,
    date: new Date().toISOString().split("T")[0]
  };

  // 1. Keep LocalStorage in sync (Primary fallback)
  const current = loadItem("gdc_notices", DEFAULT_NOTICES);
  const updated = [newNoticeItem, ...current];
  saveItem("gdc_notices", updated);

  // 2. Try Express sync asynchronously
  try {
    await fetchWithTimeout("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(notice)
    });
  } catch (err) {
    console.warn("Backend unsynced. Saved locally on static client.");
  }

  return { success: true, notice: newNoticeItem };
};

/**
 * Resilient DELETE Notice
 */
export const deleteNotice = async (id: string, token: string): Promise<{ success: boolean }> => {
  // 1. Keep LocalStorage in sync
  const current = loadItem("gdc_notices", DEFAULT_NOTICES);
  const updated = current.filter((item) => item.id !== id);
  saveItem("gdc_notices", updated);

  // 2. Try Express Sync
  try {
    await fetchWithTimeout(`/api/notices/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  } catch (err) {
    console.warn("Backend unsynced. Deleted locally on static client.");
  }

  return { success: true };
};

/**
 * Resilient GET Admissions list
 */
export const fetchAdmissions = async (token: string): Promise<Admission[]> => {
  try {
    const res = await fetchWithTimeout("/api/admissions", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      saveItem("gdc_admissions", data);
      return data;
    }
  } catch (err) {
    console.warn("Express admissions endpoint unavailable. Loaded from persistent storage.");
  }
  return loadItem("gdc_admissions", DEFAULT_ADMISSIONS);
};

/**
 * Resilient POST Admission application
 */
export const submitAdmission = async (formData: Omit<Admission, "id" | "status" | "submissionDate">): Promise<{ success: boolean; id?: string }> => {
  const generatedId = `adm-${Date.now()}`;
  const newRecord: Admission = {
    ...formData,
    id: generatedId,
    status: "Pending",
    submissionDate: new Date().toISOString().split("T")[0]
  };

  // 1. Keep LocalStorage in sync
  const current = loadItem("gdc_admissions", DEFAULT_ADMISSIONS);
  const updated = [newRecord, ...current];
  saveItem("gdc_admissions", updated);

  // 2. Try Express API Post
  try {
    const res = await fetchWithTimeout("/api/admissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      return { success: true, id: generatedId };
    }
  } catch (err) {
    console.warn("Saved locally. Network timeout bypassed gracefully.");
  }

  return { success: true, id: generatedId };
};

/**
 * Resilient PATCH Admission Status
 */
export const updateAdmissionStatus = async (id: string, nextStatus: string, token: string): Promise<{ success: boolean }> => {
  // 1. Keep LocalStorage in sync
  const current = loadItem("gdc_admissions", DEFAULT_ADMISSIONS);
  const updated = current.map((adm) => adm.id === id ? { ...adm, status: nextStatus } : adm);
  saveItem("gdc_admissions", updated);

  // 2. Try Express Sync
  try {
    await fetchWithTimeout(`/api/admissions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status: nextStatus })
    });
  } catch (err) {
    console.warn("Backend status unsynced. Patched locally on static client.");
  }

  return { success: true };
};

/**
 * Resilient GET Enquiries
 */
export const fetchEnquiries = async (token: string): Promise<Enquiry[]> => {
  try {
    const res = await fetchWithTimeout("/api/enquiries", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      saveItem("gdc_enquiries", data);
      return data;
    }
  } catch (err) {
    console.warn("Express enquiries endpoint offline. Loaded from local session storage.");
  }
  return loadItem("gdc_enquiries", DEFAULT_ENQUIRIES);
};

/**
 * Resilient POST Enquiry
 */
export const submitEnquiry = async (formData: { name: string; email: string; phone: string; subject: string; message: string }): Promise<{ success: boolean }> => {
  const newEnquiry: Enquiry = {
    ...formData,
    id: `enq-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    status: "Unread"
  };

  // 1. Keep LocalStorage in sync
  const current = loadItem("gdc_enquiries", DEFAULT_ENQUIRIES);
  const updated = [newEnquiry, ...current];
  saveItem("gdc_enquiries", updated);

  // 2. Try Express API post
  try {
    await fetchWithTimeout("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  } catch (err) {
    console.warn("Enquiry saved locally. connection timeout bypassed.");
  }

  return { success: true };
};

/**
 * Resilient Static Getters for static resources
 */
export const fetchFacultyList = async () => {
  try {
    const res = await fetchWithTimeout("/api/faculty");
    if (res.ok) return await res.json();
  } catch (e) {}
  return DEFAULT_FACULTY;
};

export const fetchIqacReportsList = async () => {
  try {
    const res = await fetchWithTimeout("/api/iqac");
    if (res.ok) return await res.json();
  } catch (e) {}
  return DEFAULT_IQAC_REPORTS;
};

export const fetchResearchResources = async () => {
  try {
    const res = await fetchWithTimeout("/api/research");
    if (res.ok) return await res.json();
  } catch (e) {}
  return { supervisors: DEFAULT_SUPERVISORS, projects: DEFAULT_PROJECTS };
};

export const fetchGalleryList = async () => {
  try {
    const res = await fetchWithTimeout("/api/gallery");
    if (res.ok) return await res.json();
  } catch (e) {}
  return DEFAULT_GALLERY;
};
