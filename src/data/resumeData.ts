export interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  pdfUrl: string;
  previewUrl: string;
  about: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    years: string;
    cgpa: string;
  };
  skills: {
    programming: string[];
    frontend: string[];
    tools: string[];
    softSkills: string[];
  };
  workshops: string[];
  competitions: string[];
  languages: string[];
}

export const resumeData: ResumeData = {
  name: 'ANU REDDY B',
  title: 'Electronics & Communication Engineering Student',
  location: 'Mysuru, Karnataka',
  email: 'anureddyb20@gmail.com',
  phone: '9108848830',
  linkedin: 'https://www.linkedin.com/in/anureddyb20',
  github: 'https://github.com/anureddyb20',
  pdfUrl: '/resume/Anu-Reddy-Resume.pdf',
  previewUrl: '/resume/Anu-Reddy-Resume-preview.png',
  about:
    'Passionate Electronics and Communication Engineering student with a strong interest in technology, innovation, and problem-solving. Skilled in programming, frontend development, and building academic and hackathon-based projects with hands-on experience in hardware and software domains.',
  education: {
    degree: 'Bachelor of Engineering in Electronics and Communication',
    institution: 'Vidya Vardhaka College of Engineering',
    location: 'Mysuru, Karnataka',
    years: '2025 - 2029',
    cgpa: '1st Year CGPA: 8.88',
  },
  skills: {
    programming: ['C', 'Python', 'JavaScript'],
    frontend: ['HTML', 'CSS', 'React'],
    tools: ['GitHub', 'VS Code', 'Supabase', 'Antigravity'],
    softSkills: ['Communication', 'Teamwork', 'Problem Solving'],
  },
  workshops: [
    'Autonomous Vehicles Workshop | Aavishkaar Tech Conclave 2026, VVCE',
    'GitHub & Version Control Workshop | IVC Club, VVCE',
    'IISc Open Day 2026 | Indian Institute of Science, Bangalore',
  ],
  competitions: [
    'Shark Tank | NIT Warangal, Telangana',
    'Idea Pitching Event | Christ University',
  ],
  languages: ['English (Professional)', 'Kannada', 'Telugu (Native)'],
};
