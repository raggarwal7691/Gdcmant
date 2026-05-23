import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

// Resolve paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "college_db.json");

// Secret for mock auth token (simple protection)
const ADMIN_PASSWORD = "gdc-mant-admin-key";
const JWT_MOCK_TOKEN = "gdc_mant_verified_token_2026";

// Initial Seed Data
const defaultDb = {
  notices: [
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
  ],
  faculty: [
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
  ],
  admissions: [
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
  ],
  enquiries: [
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
  ],
  iqacReports: [
    {
      id: "iqac-1",
      title: "Composition of Internal Quality Assurance Cell (IQAC)",
      academicYear: "2025-26",
      uploadDate: "2026-01-10",
    },
    {
      id: "iqac-2",
      title: "Minutes of IQAC First Quarter Development Meeteing",
      academicYear: "2025-26",
      uploadDate: "2025-10-15",
    },
    {
      id: "iqac-3",
      title: "Annual Quality Assurance Report (AQAR) - Part A Formulation",
      academicYear: "2024-25",
      uploadDate: "2025-08-30",
    },
    {
      id: "iqac-4",
      title: "Student Feedback Analysis & Action Taken Report",
      academicYear: "2024-25",
      uploadDate: "2025-05-20",
    }
  ],
  supervisors: [
    {
      id: "sup-1",
      name: "Dr. Rajiv Kumar",
      department: "Sociology",
      slotsAvailable: 3,
      totalGuided: 4,
      researchAreas: ["Rural Agrarian Relations", "Social Stratification in Mathura Region"]
    },
    {
      id: "sup-2",
      name: "Dr. Arvind Dixit",
      department: "Economics",
      slotsAvailable: 2,
      totalGuided: 3,
      researchAreas: ["Rural Microfinance", "Agricultural Labor Productivity"]
    }
  ],
  projects: [
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
  ],
  gallery: [
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
  ]
};

// Helper to load/save JSON database
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    } else {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), "utf-8");
      return defaultDb;
    }
  } catch (err) {
    console.error("Error reading database file, using in-memory default", err);
    return defaultDb;
  }
}

function saveDb(data: typeof defaultDb) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database file", err);
  }
}

// Ensure database file is initialized on server start
const dbState = loadDb();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Serve custom static assets directly from root if they exist
  app.get("/IMG_20211202_183832_347.jpg", (req, res) => {
    const filePath = path.join(process.cwd(), "IMG_20211202_183832_347.jpg");
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });

  app.get("/gdcheader.jpg", (req, res) => {
    const filePath = path.join(process.cwd(), "gdcheader.jpg");
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });

  // API REST ROUTING

  // 1. Auth Endpoint
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ token: JWT_MOCK_TOKEN, status: "success" });
    } else {
      res.status(401).json({ error: "Invalid Admin Password" });
    }
  });

  // Verify Admin Authorization Middleware
  const verifyAdmin = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token === JWT_MOCK_TOKEN) {
        return next();
      }
    }
    return res.status(403).json({ error: "Unauthorized admin access" });
  };

  // 2. Notices API
  app.get("/api/notices", (req, res) => {
    const db = loadDb();
    res.json(db.notices);
  });

  app.post("/api/notices", verifyAdmin, (req, res) => {
    const db = loadDb();
    const newNotice = {
      id: "notice-" + Date.now(),
      title: req.body.title,
      content: req.body.content || "",
      date: new Date().toISOString().split("T")[0],
      category: req.body.category || "general",
      isUrgent: !!req.body.isUrgent,
      link: req.body.link
    };
    db.notices.unshift(newNotice);
    saveDb(db);
    res.status(201).json(newNotice);
  });

  app.delete("/api/notices/:id", verifyAdmin, (req, res) => {
    const db = loadDb();
    const beforeCount = db.notices.length;
    db.notices = db.notices.filter((n: any) => n.id !== req.params.id);
    if (db.notices.length === beforeCount) {
      return res.status(404).json({ error: "Notice not found" });
    }
    saveDb(db);
    res.json({ success: true, message: "Notice deleted" });
  });

  // 3. Faculty API
  app.get("/api/faculty", (req, res) => {
    const db = loadDb();
    res.json(db.faculty);
  });

  app.post("/api/faculty", verifyAdmin, (req, res) => {
    const db = loadDb();
    const facultyData = {
      id: req.body.id || "faculty-" + Date.now(),
      name: req.body.name,
      designation: req.body.designation,
      department: req.body.department,
      qualification: req.body.qualification,
      experience: req.body.experience,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      isUPPSC: !!req.body.isUPPSC,
      researchInterest: req.body.researchInterest
    };

    if (req.body.id) {
      // Edit
      db.faculty = db.faculty.map((f: any) => f.id === req.body.id ? facultyData : f);
    } else {
      // Add
      db.faculty.push(facultyData);
    }
    saveDb(db);
    res.json(facultyData);
  });

  app.delete("/api/faculty/:id", verifyAdmin, (req, res) => {
    const db = loadDb();
    db.faculty = db.faculty.filter((f: any) => f.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });

  // 4. Admissions API (Public submissions allowed, view/modify protected)
  app.get("/api/admissions", verifyAdmin, (req, res) => {
    const db = loadDb();
    res.json(db.admissions);
  });

  app.post("/api/admissions", (req, res) => {
    const db = loadDb();
    const newForm = {
      id: "adm-" + Date.now(),
      studentName: req.body.studentName,
      fatherName: req.body.fatherName,
      email: req.body.email,
      phone: req.body.phone,
      courseSelected: req.body.courseSelected,
      gender: req.body.gender,
      dob: req.body.dob,
      category: req.body.category || "GEN",
      marksPercentage: parseFloat(req.body.marksPercentage) || 0,
      status: "Pending",
      submissionDate: new Date().toISOString().split("T")[0],
      address: req.body.address || ""
    };
    db.admissions.unshift(newForm);
    saveDb(db);
    res.status(201).json({ success: true, admission: newForm });
  });

  app.patch("/api/admissions/:id", verifyAdmin, (req, res) => {
    const db = loadDb();
    const { status } = req.body;
    db.admissions = db.admissions.map((adm: any) => {
      if (adm.id === req.params.id) {
        return { ...adm, status: status };
      }
      return adm;
    });
    saveDb(db);
    res.json({ success: true });
  });

  // 5. Enquiries API (Public submit, admin read)
  app.get("/api/enquiries", verifyAdmin, (req, res) => {
    const db = loadDb();
    res.json(db.enquiries);
  });

  app.post("/api/enquiries", (req, res) => {
    const db = loadDb();
    const newEnq = {
      id: "enq-" + Date.now(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
      date: new Date().toISOString().split("T")[0],
      status: "Unread"
    };
    db.enquiries.unshift(newEnq);
    saveDb(db);
    res.json({ success: true, enquiry: newEnq });
  });

  app.patch("/api/enquiries/:id", verifyAdmin, (req, res) => {
    const db = loadDb();
    db.enquiries = db.enquiries.map((e: any) => e.id === req.params.id ? { ...e, status: req.body.status } : e);
    saveDb(db);
    res.json({ success: true });
  });

  // 6. IQAC Reports API
  app.get("/api/iqac", (req, res) => {
    const db = loadDb();
    res.json(db.iqacReports);
  });

  app.post("/api/iqac", verifyAdmin, (req, res) => {
    const db = loadDb();
    const newReport = {
      id: "iqac-" + Date.now(),
      title: req.body.title,
      academicYear: req.body.academicYear,
      uploadDate: new Date().toISOString().split("T")[0]
    };
    db.iqacReports.unshift(newReport);
    saveDb(db);
    res.status(201).json(newReport);
  });

  // 7. Research (Supervisors and Projects)
  app.get("/api/research", (req, res) => {
    const db = loadDb();
    res.json({
      supervisors: db.supervisors,
      projects: db.projects
    });
  });

  app.post("/api/research/supervisor", verifyAdmin, (req, res) => {
    const db = loadDb();
    const newSup = {
      id: "sup-" + Date.now(),
      name: req.body.name,
      department: req.body.department,
      slotsAvailable: parseInt(req.body.slotsAvailable) || 0,
      totalGuided: parseInt(req.body.totalGuided) || 0,
      researchAreas: req.body.researchAreas ? req.body.researchAreas.split(",").map((s: string) => s.trim()) : []
    };
    db.supervisors.push(newSup);
    saveDb(db);
    res.status(201).json(newSup);
  });

  app.post("/api/research/project", verifyAdmin, (req, res) => {
    const db = loadDb();
    const newProj = {
      id: "proj-" + Date.now(),
      title: req.body.title,
      supervisor: req.body.supervisor,
      department: req.body.department,
      status: req.body.status || "Ongoing",
      fundingAgency: req.body.fundingAgency,
      amount: req.body.amount,
      description: req.body.description || ""
    };
    db.projects.push(newProj);
    saveDb(db);
    res.status(201).json(newProj);
  });

  // 8. Gallery API
  app.get("/api/gallery", (req, res) => {
    const db = loadDb();
    res.json(db.gallery);
  });

  app.post("/api/gallery", verifyAdmin, (req, res) => {
    const db = loadDb();
    const newGal = {
      id: "gal-" + Date.now(),
      url: req.body.url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      title: req.body.title,
      category: req.body.category || "Campus",
      date: new Date().toISOString().split("T")[0]
    };
    db.gallery.unshift(newGal);
    saveDb(db);
    res.status(201).json(newGal);
  });

  app.delete("/api/gallery/:id", verifyAdmin, (req, res) => {
    const db = loadDb();
    db.gallery = db.gallery.filter((g: any) => g.id !== req.params.id);
    saveDb(db);
    res.json({ success: true });
  });


  // Integrating Vite Dev Server Middleware or Servicing Transpiled Code
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is booted at 0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();
