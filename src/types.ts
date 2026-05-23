export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'admission' | 'general' | 'exam' | 'tender';
  link?: string;
  isUrgent: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  email: string;
  phone?: string;
  image: string;
  isUPPSC: boolean; // Highlights if UPPSC-appointed
  researchInterest?: string;
}

export interface AdmissionForm {
  id: string;
  studentName: string;
  fatherName: string;
  email: string;
  phone: string;
  courseSelected: string;
  gender: string;
  dob: string;
  category: string; // GEN, OBC, SC, ST
  marksPercentage: number; // 12th percentage or equivalent
  status: 'Pending' | 'Approved' | 'Reviewing' | 'Rejected';
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
  status: 'Unread' | 'Resolved';
}

export interface IQACReport {
  id: string;
  title: string;
  academicYear: string;
  uploadDate: string;
  pdfUrl?: string; // Standard path or online reference
}

export interface ResearchSupervisor {
  id: string;
  name: string;
  department: string;
  slotsAvailable: number;
  totalGuided: number;
  researchAreas: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  supervisor: string;
  department: string;
  status: 'Ongoing' | 'Completed';
  fundingAgency: string;
  amount: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Campus' | 'NSS' | 'Sports' | 'Cultural' | 'Events';
  date: string;
}
