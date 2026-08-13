export interface Project {
  id: string;
  name: string;
  shortName?: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  github?: string;
  live?: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: "festflow",
    name: "FestFlow",
    category: "IoT • Festival Safety • Real-Time Monitoring",
    description: "FestFlow is an IoT-powered festival safety platform that combines smart hardware with a real-time digital command center to monitor crowds, detect emergencies and coordinate rapid response.",
    techStack: [
      "ESP32-WROOM-32E",
      "Firebase Realtime DB",
      "Leaflet.js",
      "Vanilla JavaScript",
      "HTML5",
      "CSS3"
    ],
    features: [
      "Real-time crowd and zone density monitoring",
      "Automated panic and medical distress detection",
      "Sub-second live Firebase data synchronization",
      "Admin command center & GPS-based response navigation"
    ],
    github: "https://github.com/anureddyb20/Fest-Flow",
    image: "/projects/festflow.png"
  },
  {
    id: "aethergrid",
    name: "AetherGrid",
    category: "Smart Grid • Energy • AI • P2P Trading",
    description: "AetherGrid is a decentralized smart-grid management platform designed to improve grid stability through real-time energy analytics, renewable-energy monitoring and peer-to-peer energy trading.",
    techStack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Socket.io",
      "Supabase",
      "PostgreSQL",
      "Recharts",
      "Leaflet",
      "Lucide React"
    ],
    features: [
      "Real-time grid analytics & voltage stability tracking",
      "Peer-to-peer (P2P) energy trading marketplace",
      "AI-powered demand and generation forecasting",
      "Interactive energy-resource map & battery telemetry"
    ],
    github: "https://github.com/anureddyb20/AtherGrid",
    image: "/projects/aethergrid.png"
  },
  {
    id: "vayucool",
    name: "Vayucool",
    category: "Urban Heat • Climate Technology • Visualization",
    description: "Vayucool is an interactive urban thermal platform that visualizes and simulates the Urban Heat Island effect, helping users understand how greenery, building density, surface materials and airflow influence city temperatures.",
    techStack: [
      "Three.js",
      "GSAP",
      "Leaflet.js",
      "Chart.js",
      "Vite",
      "Vanilla JavaScript",
      "Node.js",
      "Express",
      "CSS3"
    ],
    features: [
      "Interactive thermodynamics simulation (Radiation, Conduction, Convection)",
      "Real-time map visualization & 24-hour thermal profile",
      "Urban planning simulator with greenery & building-density controls",
      "Wind-corridor simulation & dynamic heat-gap analytics"
    ],
    github: "https://github.com/anureddyb20/Vayucool",
    image: "/projects/vayucool.png"
  },
  {
    id: "collabnest",
    name: "Collabnest",
    category: "Collaboration • Team Building • Project Discovery",
    description: "Collabnest is a platform that helps creators, developers and builders discover projects, find compatible teammates and collaborate through a connected workspace.",
    techStack: [
      "React",
      "Vite",
      "JavaScript",
      "Framer Motion",
      "Lucide React",
      "React Router",
      "Supabase",
      "PostgreSQL"
    ],
    features: [
      "Project discovery with smart tech stack filtering",
      "Skill-based matching & builder profile showcase",
      "Real-time messaging & synchronized workspace",
      "Role-based permissions & Supabase authentication"
    ],
    github: "https://github.com/anureddyb20/collabnest",
    image: "/projects/collabnest.png"
  },
  {
    id: "finpilot",
    name: "Finpilot",
    category: "FinTech • Personal Finance • AI",
    description: "Finpilot is a personal finance platform designed to help users understand, manage and improve their finances through dashboards, budgeting, financial goals, transaction tracking, reports and AI-powered financial guidance.",
    techStack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Zustand",
      "Node.js",
      "Express",
      "Prisma",
      "Supabase",
      "PostgreSQL",
      "Groq"
    ],
    features: [
      "Interactive financial dashboard with ₹ (INR) analytics",
      "AI financial advisor & intelligent health insights",
      "Budget management, recurring bills & financial goal tracking",
      "Detailed transaction categorization & visual reports"
    ],
    github: "https://github.com/anureddyb20/Finpilot",
    image: "/projects/finpilot.png"
  },
  {
    id: "hms",
    name: "Hospital Management System",
    shortName: "HMS",
    category: "Healthcare • Hospital Operations • Role-Based Platform",
    description: "An integrated hospital management platform connecting patients, doctors, receptionists, laboratory staff, pharmacists, billing staff, canteen staff and administrators in one centralized system.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Lucide React",
      "CSS Modules"
    ],
    features: [
      "Patient registration, admissions & appointment management",
      "Doctor consultations, digital prescriptions & laboratory tracking",
      "Ward/bed allocation, pharmacy management & billing services",
      "Comprehensive Role-Based Access Control (RBAC) & real-time sync"
    ],
    github: "https://github.com/bharathkumar000/hms",
    image: "/projects/hms.png"
  }
];
