export interface Education {
  degree: string;
  institution: string;
  details: string;
  year: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  responsibilities: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  live: string;
}

export interface AchievementItem {
  title: string;
  role: string;
  year: string;
  description: string;
  badge: string;
}

export interface CodingProfileItem {
  platform: string;
  stats: string[];
  solved: number;
  totalText?: string;
  rank?: string;
  badges?: string;
  certificates?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    college: string;
    cgpa: string;
    email: string;
    location: string;
    tagline: string;
    about: string;
    hsc: string;
    sslc: string;
  };
  education: Education[];
  stats: StatItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  codingProfiles: CodingProfileItem[];
  certifications: CertificationItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Barathpriyan R",
    role: "AI & ML Student / Developer",
    college: "Sri Eshwar College of Engineering",
    cgpa: "7.65 CGPA",
    email: "barathpriyan.r2024aiml@sece.ac.in",
    location: "Tamil Nadu, India",
    tagline: "I build smart machine learning models and modern full-stack web applications.",
    about: "I am a CSE student specializing in AI & Machine Learning. I focus on creating smart models and responsive web apps. My objective is to write clean, performance-optimized code that solves real-world issues.",
    hsc: "76%",
    sslc: "82.8%"
  },
  education: [
    {
      degree: "B.E. Computer Science and Engineering (AI & ML)",
      institution: "Sri Eshwar College of Engineering",
      details: "Current CGPA: 7.65",
      year: "2024 – 2028"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "State Board",
      details: "Score: 76%",
      year: "2023 – 2024"
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "State Board",
      details: "Score: 82.8%",
      year: "2021 – 2022"
    }
  ],
  stats: [
    {
      label: "Projects",
      value: "2+",
      description: "Full-stack web & ML applications"
    },
    {
      label: "Problems Solved",
      value: "500+",
      description: "LeetCode & SkillRack platforms"
    },
    {
      label: "Hackathons Won",
      value: "1",
      description: "1st Place at Freshathon"
    },
    {
      label: "Internships",
      value: "1",
      description: "MERN Stack development"
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["C", "C++", "Python", "Java", "JavaScript"]
    },
    {
      category: "Core Concepts",
      skills: ["Data Structures & Algorithms", "OOP"]
    },
    {
      category: "Web & Frameworks",
      skills: ["React.js", "Vite", "HTML", "CSS", "Node.js", "Express.js"]
    },
    {
      category: "Databases",
      skills: ["MongoDB Atlas", "MySQL"]
    },
    {
      category: "Tools & Environments",
      skills: ["VS Code", "Eclipse", "MySQL Workbench", "Google Colab", "PowerPoint", "Canva"]
    }
  ],
  experience: [
    {
      role: "MERN Stack Developer Intern",
      company: "EduCentro Private Limited",
      duration: "2025",
      description: "Developed a full-stack Expense Analyzer application using MongoDB, Express.js, React.js, and Node.js.",
      responsibilities: [
        "Built the Expense Analyzer dashboard with the MERN stack",
        "Created custom expense and budget tracking analytics",
        "Developed and integrated secure RESTful APIs with MongoDB",
        "Participated in debugging, deployment, and optimization workflows"
      ],
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Debugging"]
    }
  ],
  projects: [
    {
      id: "internship-rec-system",
      title: "ML Internship Recommender & Skill Gap Analyzer",
      year: "2026",
      description: "A machine learning-based web application that parses resumes and recommends internships while providing skill gap analysis and personalized learning plans.",
      features: [
        "Resume parser engine",
        "Internship recommendations",
        "Skill gap reporting",
        "Learning path suggestions"
      ],
      tech: ["Python", "Machine Learning", "React.js", "Node.js", "MongoDB"],
      github: "https://github.com/barathpriyan16/ml-internship-recommender",
      live: "https://ml-internship-recommender.vercel.app"
    },
    {
      id: "alumni-management-platform",
      title: "Centralized Alumni Directory & Mentor Matching System",
      year: "2025",
      description: "A centralized platform designed to connect students with alumni mentors using Machine Learning matching models and NLP-powered search queries.",
      features: [
        "Alumni profiles directory",
        "NLP-powered mentor search",
        "Integrated mentorship requests",
        "Messaging dashboard module"
      ],
      tech: ["MERN Stack", "Machine Learning", "NLP", "MongoDB", "Express.js"],
      github: "https://github.com/barathpriyan16/alumni-network-platform",
      live: "https://alumni-network-platform.vercel.app"
    }
  ],
  achievements: [
    {
      title: "Freshathon Inter-College Hackathon",
      role: "1st Place Winner",
      year: "2026",
      description: "Secured First Place by presenting an innovative technical solution to automate academic workflow pain-points.",
      badge: "Champion Trophy"
    }
  ],
  codingProfiles: [
    {
      platform: "LeetCode",
      stats: ["50+ problems solved"],
      solved: 50
    },
    {
      platform: "SkillRack",
      stats: [
        "486+ problems solved",
        "100+ badges",
        "Rank: 66519"
      ],
      solved: 486,
      rank: "66,519",
      badges: "100+ Bronze",
      certificates: "4 Certificates"
    }
  ],
  certifications: [
    {
      title: "C for Beginners",
      issuer: "Great Learning Academy",
      year: "2025"
    },
    {
      title: "C Programming Course",
      issuer: "SkillRack",
      year: "2025"
    }
  ]
};
