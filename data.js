window.PORTFOLIO_DATA = {
  settings: {
    siteTitle: "Salvador Reyes · Developer Portfolio",
    heroEyebrow: "Aeronautical & Software Engineer",
    heroTitle: "Building reliable systems, with a face and story behind them.",
    heroSubtitle:
      "Software Engineer with over 6 years of experience in C++, C#, Unreal Engine, and Unity. Specialized in game development, physics systems, build optimization, cross-platform deployment, and data-driven products powered by analytics and A/B testing.",
    portraitImageUrl: "./assets/images/portrait-placeholder.png",
    location: "Zurich, Switzerland",
    availability: "Open to opportunities",
    email: "salvador.gamedev@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/salvador-reyes-mart%C3%ADnez-62647398/",
    githubUrl: "",
    cvUrl: "./assets/cv/ResumeSalvaReyes.pdf"
  },

  about: [
    {
      id: "interactive-systems",
      order: 1,
      title: "Interactive systems",
      description: "Player controllers, interactions, camera systems..."
    },
    {
      id: "simulation-mindset",
      order: 2,
      title: "Simulation mindset",
      description: "Experience translating real-world systems into interactive workflows..."
    },
    {
      id: "optimization",
      order: 3,
      title: "Optimization",
      description: "Profiling, debugging and runtime stability..."
    }
  ],

  experience: [
    {
      id: "iction",
      order: 1,
      start: "2023",
      end: "2026",
      role: "Software Engineer | John Mambo",
      company: "Iction Games",
      location: "Spain",
      summary: "Sole software engineer on the project, working alongside a 2D artist and a game designer.",
      bullets: [
        "Core gameplay systems",
        "Cross-device progression & Addressables",
        "Google Play, Epic, Steam, CrazyGames"
      ],
      tags: ["C#", "Unity", "C++", "Unreal", "Data-Driven", "Mobile", "PC"],
      media: [
        {
          id: "m1",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/EdB112cc4oE",
          title: "Demo video",
          caption: "Short demo clip",
          isPrimary: true
        },
        {
          id: "m1-image",
          type: "image",
          url: "./assets/images/iction-placeholder.svg",
          title: "Iction screenshot placeholder",
          caption: "Replace this file with your real image asset.",
          isPrimary: false
        }
      ]
    },
    {
      id: "axes",
      order: 2,
      start: "2021",
      end: "2023",
      role: "Software Engineer | Extreme Car Driving Simulator",
      company: "Axes In Motion",
      location: "Spain",
      summary: "Design, enhancement, and maintenance of the car physics engine.",
      bullets: [
        "Mobile Development",
        "Unity Physics Engine",
        "Google Play, App Store"
      ],
      tags: ["C#", "Unity", "Vehicle Physics", "Data-Driven", "Mobile", "PC"],
      media: [
        {
          id: "m2",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/mX74p4OBFN0",
          title: "Vehicle physics",
          caption: "Handling / physics screenshot",
          isPrimary: true
        },
        {
          id: "m2-image",
          type: "image",
          url: "./assets/images/axes-placeholder.svg",
          title: "Axes screenshot placeholder",
          caption: "Replace this file with your real image asset.",
          isPrimary: false
        }
      ]
    },
    {
      id: "atexis",
      order: 3,
      start: "2017",
      end: "2019",
      role: "Simulation Engineer | Virtual Procedure Trainer",
      company: "Atexis",
      location: "Spain",
      summary: "Interactive 3D training for pilots and maintenance personnel.",
      bullets: [
        "Operational & maintenance procedures",
        "Cockpit 3D simulation",
        "Virtual Reality Environment"
      ],
      tags: ["C#", "Unity", "C++", "CBT", "Embedded", "VR"],
      media: [
        {
          id: "m3",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/yXU6xgd10hE",
          title: "Cockpit training",
          caption: "Interactive simulation view",
          isPrimary: true
        },
        {
          id: "m3-image",
          type: "image",
          url: "./assets/images/atexis-placeholder.svg",
          title: "Atexis screenshot placeholder",
          caption: "Replace this file with your real image asset.",
          isPrimary: false
        }
      ]
    }
  ],

  highlights: [
    {
      id: "vehicle-physics",
      order: 1,
      title: "Realistic vehicle physics engine",
      subtitle: "Rocket-boosted cars that can jump in an open world",
      description: "",
      tags: ["C#", "Unity"],
      media: [
        {
          id: "h1",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/PcpaNqKoQtg",
          title: "Demo video",
          caption: "Short demo clip",
          isPrimary: true
        }
      ]
    }
  ],

  skillGroups: [
    {
      name: "Languages & Tools",
      items: [
        "C#",
        "C++",
        "Unity",
        "Unreal",
        "Python",
        "Matlab",
        "BigQuery",
        "Firebase",
        "Remote Config",
        "Admob"
      ]
    },
    {
      name: "Working Style",
      items: ["Scrum", "Kanban", "Confluence", "Jira", "Git"]
    }
  ],

  contact: [
    {
      order: 1,
      label: "Email",
      value: "salvador.gamedev@gmail.com",
      url: "mailto:salvador.gamedev@gmail.com"
    },
    {
      order: 2,
      label: "LinkedIn",
      value: "salvador-reyes-martínez",
      url: "https://www.linkedin.com/in/salvador-reyes-mart%C3%ADnez-62647398/"
    }
  ]
};
