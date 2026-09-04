export type Project = {
  id: string
  title: string
  category: string
  year: string
  description: string
  heroImage: string
  tags: string[]
  color: string
  role?: string
  timeline?: string
  tools?: string
  problem?: string
  solution?: string
  story?: string[]
  outcome?: string
  research?: string
  researchImage?: string
  researchVideo?: string
  visualExplorationsImage?: string
  moreFlowsImage1?: string
  moreFlowsImage2?: string
  moreFlowsImage3?: string
  showcaseImages?: { src: string; caption: string }[]
  processImages?: { src: string; caption: string }[]
}

export const projects: Project[] = [
  {
    id: "cleverfolks",
    title: "CleverFolks",
    category: "AI SaaS · Web Design",
    year: "2024",
    description: "A complete AI workforce platform giving businesses access to four specialized AI employees — replacing traditional hiring at a fraction of the cost.",
    heroImage: "/images/cleverfolks-hero.png",
    tags: ["Product Design", "Web", "AI", "SaaS"],
    color: "#7F77DD",
    role: "UI/UX Designer",
    timeline: "2024",
    tools: "Figma",
    problem: "Small businesses and freelancers can't afford full teams, yet still need expert-level support across operations, data, communication, and content.",
    solution: "CleverFolks delivers a complete AI workforce — four specialized AI employees that work 24/7 across business consulting, data analysis, virtual assistance, and copywriting.",
    story: [
      "CleverFolks needed an interface that made AI feel less like software and more like a team. The design challenge was humanizing automation without making it gimmicky — giving each AI employee a distinct visual identity and personality while keeping the overall product feel cohesive and premium.",
      "The product needed to scale from a single dashboard into four distinct specialized tools, each with its own workflows and data visualizations, all while maintaining one unified design language.",
    ],
    outcome: "Delivered a complete AI workforce platform interface across four distinct product personas, each with its own visual identity within a unified system.",
    research: "The research phase focused on understanding how businesses currently handle tasks like content creation, data analysis, research, and virtual assistance — and where those workflows break down. We conducted interviews with small business owners, freelancers, and operations leads to map the real cost of task overload, tool fragmentation, and hiring constraints. Competitive analysis revealed that most AI tools feel impersonal and transactional, leaving users to distrust outputs or micromanage every step. The biggest opportunity wasn't just automation — it was trust. Businesses didn't need more software; they needed tools that felt like capable teammates, with enough personality and reliability to hand over real work without second-guessing every result.",
    researchImage: "/images/cleverfolks/cleverfolks-research-board.png",
    visualExplorationsImage: "/images/cleverfolks/cleverfolks-process-bento-v2.png",
    moreFlowsImage1: "/images/cleverfolks/cleverfolks-moreflows-1.png",
    moreFlowsImage2: "/images/cleverfolks/cleverfolks-moreflows-2.png",
    showcaseImages: [],
  },
  {
    id: "nanaade",
    title: "Nanaade",
    category: "EdTech · Web Design",
    year: "2024",
    description: "A talent platform bridging the gap between education and employment for young Africans, powered by AI-matched career opportunities.",
    heroImage: "/images/nanaade-hero.png",
    tags: ["Product Design", "Web", "EdTech", "Dashboard"],
    color: "#378ADD",
    role: "UI/UX Designer",
    timeline: "2023–2024",
    tools: "Figma, FigJam",
    researchImage: "/images/nanaade/nanaade-research-board.png",
    researchVideo: "/images/nanaade/nanaade-research-assets.mp4",
    visualExplorationsImage: "/images/nanaade/nanaade-explorations-bento.png",
    moreFlowsImage1: "/images/nanaade/nanaade-moreflows-1.jpg",
    moreFlowsImage2: "/images/nanaade/nanaade-moreflows-2.png",
    moreFlowsImage3: "/images/nanaade/nanaade-moreflows-3.png",
    research: "The research phase focused on understanding how young Africans experience the gap between education and employment. We conducted interviews with jobseekers, students, and career switchers across multiple markets, alongside competitive analysis of existing job platforms and journey mapping of the full path from graduation to hire. Early findings showed that job boards alone weren't enough — people needed active guidance, not just listings. Designing for a pan-African audience also meant accounting for language differences, device constraints, and varying levels of digital literacy from the start.",
    problem: "Young Africans face a disconnected job market — career guidance, skill-building, and employment opportunities exist in silos, making it difficult to find a clear path from education to employment.",
    solution: "Nanaade bridges that gap with an AI-powered platform that matches users to career pathways, tracks skill development, and connects them directly to relevant opportunities.",
    story: [
      "Nanaade's mission centers on a powerful idea: every young African deserves a clear path to opportunity. The team set out to design an experience that felt empowering rather than overwhelming — especially for first-time job seekers navigating an unfamiliar system.",
      "Early research revealed that users needed more than job listings — they needed guidance. This shaped the core interaction model: a dashboard that actively tracks readiness, suggests next steps, and celebrates progress along the way.",
      "Designing for a pan-African audience also meant being intentional about cultural nuance, device constraints, and varying levels of digital literacy — every flow was tested and refined with real users across multiple markets.",
      "Skill assessment and career matching required a delicate balance — the system needed to feel encouraging rather than evaluative. Gamified progress tracking and milestone celebrations were woven into the experience to keep users motivated through longer-term skill-building journeys.",
      "The final design system was built to scale across multiple African markets with different languages and opportunity landscapes, while maintaining a single coherent product identity that felt personal and locally relevant rather than generic and global.",
    ],
    outcome: "Increased user retention by 43% through improved navigation and a more guided onboarding experience.",
    showcaseImages: [],
  },
  {
    id: "addicto",
    title: "Addicto",
    category: "Fashion · E-commerce",
    year: "2024",
    description: "An editorial e-commerce experience for a streetwear brand built to outlast trends — every seam a signature, every fabric with a reason.",
    heroImage: "/images/addicto-hero.png",
    tags: ["Web Design", "E-commerce", "Fashion", "Editorial"],
    color: "#1A1A1A",
    role: "UI/UX Designer",
    timeline: "2024",
    tools: "Figma",
    problem: "The brand needed an e-commerce experience that matched its uncompromising identity — most streetwear sites feel templated and fail to capture genuine brand presence.",
    solution: "An editorial, image-forward e-commerce experience built around bold typography and atmospheric photography that lets the product and the brand's attitude speak for themselves.",
    story: [
      "Addicto's brief was clear from the start: \"each piece is made to outlast trends.\" That philosophy needed to live in every pixel of the site, not just the product photography. The design leans into darkness, contrast, and restraint — letting negative space and bold type carry the same weight as the imagery.",
      "Every interaction was considered through the lens of confidence — nothing flashy, nothing desperate for attention. The result is a shopping experience that feels less like a storefront and more like stepping into the brand's world.",
    ],
    outcome: "Built an editorial e-commerce experience that captures the brand's raw, confident identity.",
    showcaseImages: [],
  },
  {
    id: "dexcimal",
    title: "Dexcimal",
    category: "Fintech · Mobile",
    year: "2024",
    description: "A mobile-first mortgage and property investment platform that combines real estate discovery with fintech infrastructure into one seamless experience.",
    heroImage: "/images/dexcimal-hero.png",
    tags: ["Product Design", "Mobile", "Fintech", "PropTech"],
    color: "#5DCAA5",
    role: "UI/UX Designer",
    timeline: "2024",
    tools: "Figma",
    problem: "Property discovery and mortgage financing existed as separate, disconnected processes — forcing users to juggle multiple platforms just to take the first step toward homeownership.",
    solution: "Dexcimal unifies property discovery with fintech infrastructure into one mobile-first platform, letting users browse verified listings, check mortgage eligibility, and fund payments without ever leaving the app.",
    story: [
      "Dexcimal began with a simple but ambitious goal: make the path to homeownership feel less fragmented and more achievable. Traditional mortgage and property platforms operate in silos, leaving users to manually piece together financing, verification, and purchasing across disconnected tools.",
      "Through user research and competitive analysis, the team identified that trust and transparency were the biggest barriers to adoption. Users needed to see verified properties, understand their mortgage eligibility instantly, and feel confident every step of the way.",
      "The final design balances simplicity with depth — a clean onboarding flow that doesn't overwhelm, paired with powerful financial tools underneath. Every screen was built to reduce friction at the exact moments users are most likely to hesitate.",
      "Visual design decisions were guided by trust signals throughout — verified badges, clear progress indicators, and transparent fee breakdowns at every step of the mortgage application flow. Nothing was hidden behind unnecessary clicks or confusing financial jargon.",
      "The mobile-first approach meant rethinking how complex financial data could be digested on a small screen. Charts were simplified, forms were broken into digestible steps, and critical information was always visible without excessive scrolling. The result is a platform that feels less like banking software and more like a guided conversation toward homeownership.",
    ],
    outcome: "A streamlined platform that transforms a traditionally fragmented process into a single, trustworthy digital journey.",
    showcaseImages: [],
  },
  {
    id: "repmirror",
    title: "RepMirror",
    category: "Fitness · Mobile App",
    year: "2024",
    description: "An AI-powered personal training app that uses computer vision to track workout form in real-time, count reps, and generate personalized plans — all on-device.",
    heroImage: "/images/repmirror-hero.png",
    tags: ["Product Design", "Mobile", "AI", "Health"],
    color: "#F2A623",
    role: "UI/UX Designer",
    timeline: "2024",
    tools: "Figma, Protopie",
    problem: "Most home workout apps lack real-time feedback, leaving users uncertain whether they're performing exercises correctly — risking injury and stalling progress.",
    solution: "RepMirror uses on-device computer vision to track form in real time, count reps automatically, and deliver instant corrections — all through a smartphone camera, with zero data leaving the device.",
    story: [
      "Privacy and trust were central to RepMirror's design from day one. Since the app analyzes users through their camera, every screen needed to reassure users their data stays on-device — this informed both the onboarding messaging and the overall tone of the interface.",
      "The challenge was making real-time feedback feel encouraging rather than critical. The interface uses warm, energetic colors and clear visual hierarchy so users get actionable corrections without feeling judged mid-workout.",
    ],
    outcome: "Designed a real-time AI fitness coaching experience that makes professional-level form correction accessible from any smartphone.",
    showcaseImages: [],
  },
]
