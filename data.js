window.PORTFOLIO_DATA = {
  settings: {
    siteTitle: "Salvador Reyes · Developer Portfolio",
    heroEyebrow: "Aeronautical & Software Engineer",
    heroTitle: "Building reliable systems with a human touch.",
    heroSubtitle:
      "Software Engineer with 6+ years of experience in C++, C#, Unreal Engine, and Unity. Specialized in gameplay programming, physics systems, build optimization, cross-platform deployment, and data-informed product iteration supported by analytics and A/B testing.",
    portraitImageUrl: "./assets/images/portrait-placeholder.png",
    location: "Zurich, Switzerland",
    availability: "Open to new opportunities",
    email: "salvador.gamedev@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/salvador-reyes-mart%C3%ADnez-62647398/",
    githubUrl: "",
    cvUrl: "./assets/cv/ResumeSalvaReyes.pdf"
  },

  about: [
    {
      id: "what-im-looking-for",
      order: 1,
      title: "What I'm Looking For",
      description: "A product-focused engineering role where I can build robust gameplay and software systems, collaborate closely with design and art, and continue growing in technical ownership.",
      sprite: {
        sheetUrl: "./assets/images/sprites/Barril_Gran_Roca_Explosion.png",
        cols: 4,
        rows: 4,
        frameCount: 16,
        maxDisplay: 96,
        scale: 2,
        offsetX: 0,
        pingPong: true,
        offsetY: 0,
        fps: 8
      }
    },
    {
      id: "what-im-passionate-about",
      order: 2,
      title: "What I'm Passionate About",
      description: "Designing interactive experiences that feel great to players, from controls and physics to performance tuning, fast iteration loops, and data-informed decisions that improve the final product.",
      sprite: {
        sheetUrl: "./assets/images/sprites/PalmeraTrampa.png",
        cols: 5,
        rows: 3,
        frameCount: 15,
        maxDisplay: 96,
        scale: 2,
        offsetX: 0,
        offsetY: 0,
        pingPong: true,
        fps: 6
      }
    },
    {
      id: "what-i-offer",
      order: 3,
      title: "What I Offer to a Company",
      description: "Hands-on end-to-end delivery, strong technical execution in C#/C++ with Unity and Unreal, a production mindset, and the ability to turn ambiguous ideas into reliable, shippable features.",
      sprite: {
        sheetUrl: "./assets/images/sprites/Run.png",
        cols: 4,
        rows: 16,
        frameCount: 64,
        maxDisplay: 96,
        scale: 3,
        offsetX: 0,
        pingPong: true,
        offsetY: 0,
        fps: 8
      }
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
        "Designed and implemented core gameplay systems",
        "Implemented cross-device progression and Addressables workflows",
        "Prepared and released builds across multiple stores"
      ],
      links: [
        {
          label: "PC · CrazyGames",
          url: "https://www.crazygames.com/game/john-mambo---pixel-arcade-shooter-xdn"
        },
        {
          label: "Android · Google Play",
          url: "https://play.google.com/store/apps/details?id=com.JohnMambo.RetroPixelAction"
        }
      ],
      tags: ["C#", "Unity", "C++", "Unreal", "Data Analytics"],
      media: [
        {
          id: "m1",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/EdB112cc4oE",
          title: "Demo video",
          caption: "Short demo clip",
          isPrimary: true
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
      summary: "Contributed to the design, improvement, and maintenance of the vehicle physics engine.",
      bullets: [
        "Helped evolve the product with a data-driven development approach",
        "Improved realistic vehicle physics in an open-world driving game",
        "Contributed to a title with over 500 million downloads on Google Play"
      ],
      links: [
        {
          label: "Android · Google Play",
          url: "https://play.google.com/store/apps/details?id=com.aim.racing"
        },
        {
          label: "iOS · App Store",
          url: "https://apps.apple.com/ch/app/extreme-car-driving-simulator/id959498315?l=en-GB"
        }
      ],
      tags: ["C#", "Unity", "Vehicle Physics", "Data Analytics", "A/B Test"],
      media: [
        {
          id: "m2",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/mX74p4OBFN0",
          title: "Vehicle physics",
          caption: "Handling / physics screenshot",
          isPrimary: true
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
        "Developed operational and maintenance training procedures",
        "Built cockpit-focused 3D simulation experiences",
        "Delivered features for virtual reality training environments"
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
        }
      ]
    }
  ],

  highlights: [
    {
      id: "vehicle-physics",
      order: 1,
      title: "Multiplayer car simulator",
      subtitle: "A self-initiated Unity project where I designed and built an open-world multiplayer driving experience with Photon, rocket-boosted cars, jump mechanics, and physics-driven stunts.",
      description: "Owned the full development cycle, from concept and gameplay design to vehicle physics, networked multiplayer implementation, synchronization, gameplay tuning, and publishing preparation, with a strong focus on game feel, stability, and player engagement.",
      links: [
        {
          label: "Android · Google Play Games",
          url: "https://play.google.com/pc-store/games/details?id=com.Rocket.Car.Games.Rocket.Car.Speed.Driving"
        },
        {
          label: "Windows · Google Play Games",
          url: "https://play.google.com/pc-store/games/details?id=com.Rocket.Car.Games.Rocket.Car.Speed.Driving"
        }
      ],
      tags: ["C#", "Unity", "Photon", "Multiplayer", "Blender", "Shaders", "VFX", "Particle System", "Analytics", "Ads", "In App Purchases"],
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
    },
    {
      id: "gamified-learning-unity",
      order: 2,
      title: "Gamified learning experiences for children",
      subtitle: "Interactive Unity applications designed to make early learning feel playful, tactile, and rewarding for young children.",
      description: "Built child-friendly learning activities with simple controls, clear feedback loops, and game-like progression, focusing on accessibility, visual clarity, and engagement for younger audiences.",
      tags: ["C#", "Unity", "Educational Apps", "Gamification", "Touch Interaction", "UI", "Game Feel"],
      media: [
        {
          id: "h2",
          type: "image",
          url: "./assets/images/highlights/gamified-learning-unity.jpg",
          title: "Gamified learning Unity application",
          caption: "Interactive learning activity built in Unity",
          isPrimary: true
        }
      ]
    },
    {
      id: "unity-cfd-wind-tunnel",
      order: 3,
      title: "GPU CFD wind tunnel prototype",
      subtitle: "A Unity-based CFD tool for analyzing airflow behavior around objects at characteristic wind tunnel speeds.",
      description: "Implemented the simulation and visualization pipeline with compute shaders and fragment shaders, enabling interactive flow analysis, quick object comparisons, and clear visual feedback directly inside Unity.",
      tags: ["C#", "Unity", "CFD", "Compute Shaders", "Fragment Shaders", "GPU Programming", "Fluid Simulation", "Wind Tunnel"],
      media: [
        {
          id: "h3",
          type: "youtube",
          url: "https://www.youtube-nocookie.com/embed/yTKRM2LV3sQ",
          title: "Unity CFD wind tunnel demo",
          caption: "GPU-based CFD simulation in Unity",
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
        "Photon",
        "Multiplayer",
        "Unreal",
        "Python",
        "MATLAB",
        "BigQuery",
        "Firebase",
        "Remote Config",
        "AdMob"
      ]
    },
    {
      name: "Working Style",
      items: ["Scrum", "Kanban", "Confluence", "Jira", "Git"]
    }
  ],

  thanks: {
    eyebrow: "Thank You",
    title: "Thanks for reaching the end of my portfolio.",
    message: "I really appreciate your time. If my background matches what your team needs, I'd be happy to connect and discuss how I can contribute.",
    sprite: {
      sheetUrl: "./assets/images/sprites/Mambo-Macarena.png",
      cols: 13,
      rows: 3,
      frameCount: 39,
      maxDisplay: 128,
      scale: 2,
      offsetX: 0,
      offsetY: 0,
      fps: 8
    }
  },

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
