export const mockPresentations = [
  {
    _id: "pres-001",
    projectTitle: "ZK-Mesh: Offline Zero-Knowledge P2P Emergency Network",
    hackathonName: "ETHIndia 2024",
    hackathonCategory: "Web3 & Blockchain",
    year: 2024,
    award: "Grand Prize Winner (1st Place Overall)",
    team: "Team ZeroMesh (4 members)",
    presentationUrl: "https://docs.google.com/presentation/d/sample-zkmesh",
    demoVideoUrl: "https://youtube.com/watch?v=sample-zkmesh",
    githubUrl: "https://github.com/sample/zk-mesh",
    pitchSummary: "A decentralized mobile mesh communication protocol that enables encrypted message relaying and crisis resource allocation during natural disaster power blackouts without internet.",
    whyTheyWon: [
      "Immediate problem hook: Demonstrated a simulated cellular tower outage in the first 45 seconds of the pitch.",
      "Live hardware demo: Used 3 Android devices on Airplane Mode communicating over Bluetooth LE and Wi-Fi Direct with instant ZK-proof generation.",
      "Judges praised the clear separation of technical slides: 1 slide on protocol architecture, 1 slide on state compression, 0 fluffy buzzwords.",
      "Unmatched Q&A defense: Answered security questions on Sybil attack mitigation using deterministic stake bonding in 20 seconds flat."
    ],
    rubrics: [
      {
        parameter: "Technical Complexity & Execution",
        maxScore: 30,
        scoreAwarded: 30,
        remarks: "Unbelievable depth: wrote custom Circom circuits, compiled to WASM on-device, and ran real-time Bluetooth mesh relays."
      },
      {
        parameter: "Innovation & Originality",
        maxScore: 25,
        scoreAwarded: 25,
        remarks: "Novel concept of using zero-knowledge proofs to verify message integrity without exposing sender location."
      },
      {
        parameter: "Real-World Impact & Utility",
        maxScore: 20,
        scoreAwarded: 20,
        remarks: "Directly applicable to NDRF disaster response teams and flood rescue operations."
      },
      {
        parameter: "Pitch & Presentation Quality",
        maxScore: 15,
        scoreAwarded: 15,
        remarks: "Flawless delivery, crisp slides with high contrast, and perfectly timed live demo."
      },
      {
        parameter: "UI/UX & Accessibility",
        maxScore: 10,
        scoreAwarded: 9,
        remarks: "Clean high-contrast offline UI with one-tap emergency broadcast."
      }
    ],
    totalScore: 99,
    tags: ["Zero-Knowledge", "Mesh Networking", "Web3", "Emergency Response"]
  },
  {
    _id: "pres-002",
    projectTitle: "NeuroScan AI: Ultra-Fast Stroke Triage on Edge CT Devices",
    hackathonName: "PennApps XXIV",
    hackathonCategory: "Healthcare & Biotech",
    year: 2024,
    award: "1st Place Overall & Best Healthcare Hack",
    team: "Cerebro Health (3 members - Penn & Johns Hopkins)",
    presentationUrl: "https://slideshare.net/sample-neuroscan",
    demoVideoUrl: "https://youtube.com/watch?v=sample-neuroscan",
    githubUrl: "https://github.com/sample/neuroscan-ai",
    pitchSummary: "Edge computer vision model running on Raspberry Pi connected to portable CT scanners that detects ischemic stroke hemorrhages in 14 seconds instead of 45 minutes.",
    whyTheyWon: [
      "The 'Golden Hour' narrative: Built the entire pitch around the medical fact that 1.9 million brain cells die every minute during an untreated stroke.",
      "Quantified efficacy: Showed a side-by-side video of radiologist review (38 mins) vs. Edge AI heatmapping (14 seconds).",
      "Regulatory & Deployment awareness: Addressed HIPAA compliance and DICOM medical file interoperability upfront in slide 5.",
      "Engaging judge interaction: Handed an iPad to the lead judge to upload a sample CT scan and witness real-time hemorrhage segmentation."
    ],
    rubrics: [
      {
        parameter: "Technical Complexity & Execution",
        maxScore: 30,
        scoreAwarded: 29,
        remarks: "Quantized 3D U-Net running locally via ONNX Runtime on edge hardware without cloud dependency."
      },
      {
        parameter: "Innovation & Originality",
        maxScore: 25,
        scoreAwarded: 24,
        remarks: "Bridged the gap between hospital-grade imaging pipelines and low-cost emergency medical equipment."
      },
      {
        parameter: "Real-World Impact & Utility",
        maxScore: 20,
        scoreAwarded: 20,
        remarks: "Life-saving clinical application with immediate adoption feasibility for ambulance transit."
      },
      {
        parameter: "Pitch & Presentation Quality",
        maxScore: 15,
        scoreAwarded: 15,
        remarks: "Masterclass in storytelling; balanced deep clinical validation with accessible engineering analogies."
      },
      {
        parameter: "UI/UX & Accessibility",
        maxScore: 10,
        scoreAwarded: 9,
        remarks: "Minimalist alert interface designed specifically for emergency room lighting conditions."
      }
    ],
    totalScore: 97,
    tags: ["Healthcare", "Computer Vision", "Edge AI", "Deep Learning"]
  },
  {
    _id: "pres-003",
    projectTitle: "FlowState: Instant Distributed Microservice Tracing",
    hackathonName: "HackMIT 2024",
    hackathonCategory: "Developer Tools & Infra",
    year: 2024,
    award: "Grand Prize Winner & Best Developer Tool",
    team: "KernelDevs (4 members)",
    presentationUrl: "https://pitch.com/sample-flowstate",
    demoVideoUrl: "https://youtube.com/watch?v=sample-flowstate",
    githubUrl: "https://github.com/sample/flowstate-trace",
    pitchSummary: "Zero-overhead eBPF-based distributed tracing tool that automatically visualizes cross-cluster microservice bottlenecks without modifying application source code.",
    whyTheyWon: [
      "Instant 'Aha!' moment: Demonstrated injecting their tracing agent into a running Kubernetes cluster with 1 single curl command.",
      "Zero code instrumentation: Compared their approach to OpenTelemetry (which requires manual code changes) vs. their automated Linux kernel probe.",
      "Clean visual flamegraph: Displayed an intuitive 3D topology map showing exact latency spikes between Redis, Postgres, and Node servers.",
      "Addressed enterprise adoption: Outlined clear CPU overhead metrics (<0.8% overhead measured live)."
    ],
    rubrics: [
      {
        parameter: "Technical Complexity & Execution",
        maxScore: 30,
        scoreAwarded: 30,
        remarks: "Wrote raw Linux eBPF kernel bytecode and connected it to a high-speed ring buffer in Go."
      },
      {
        parameter: "Innovation & Originality",
        maxScore: 25,
        scoreAwarded: 24,
        remarks: "Eliminated developer toil by intercepting TCP socket syscalls at the OS level."
      },
      {
        parameter: "Real-World Impact & Utility",
        maxScore: 20,
        scoreAwarded: 19,
        remarks: "Solves high-cost observability bill problems for DevOps and SRE teams."
      },
      {
        parameter: "Pitch & Presentation Quality",
        maxScore: 15,
        scoreAwarded: 14,
        remarks: "Precise technical slides with concise architectural diagrams."
      },
      {
        parameter: "UI/UX & Accessibility",
        maxScore: 10,
        scoreAwarded: 9,
        remarks: "Interactive SVG flamegraphs and real-time WebSocket waterfall charts."
      }
    ],
    totalScore: 96,
    tags: ["eBPF", "Kubernetes", "DevTools", "Distributed Systems"]
  },
  {
    _id: "pres-004",
    projectTitle: "AgriSense: Autonomous Hyper-Local Soil Microbiome Drone",
    hackathonName: "CalHacks 11.0",
    hackathonCategory: "Social Good & Climate",
    year: 2024,
    award: "Grand Prize & Climate Innovation Award",
    team: "TerraTech (4 members)",
    presentationUrl: "https://canva.com/sample-agrisense",
    demoVideoUrl: "https://youtube.com/watch?v=sample-agrisense",
    githubUrl: "https://github.com/sample/agrisense-drone",
    pitchSummary: "An autonomous low-altitude drone equipped with multispectral optical sensors and ground penetrative radar to map soil nitrogen deficiency and prevent over-fertilization.",
    whyTheyWon: [
      "Compelling economic & climate dual angle: Showed that farmers save $3,400/acre/year while reducing nitrous oxide agricultural emissions by 40%.",
      "Physical prototype on stage: Brought the actual custom 3D-printed sensor payload to the stage and demoed live spectral data calibration.",
      "Simplicity in farmer UI: Replaced complicated satellite NDVI indices with a simple green-to-red fertilizer spray route generator.",
      "Clear go-to-market plan: Partnered with 2 local Salinas Valley farms during the 36-hour hackathon to test sample field datasets."
    ],
    rubrics: [
      {
        parameter: "Technical Complexity & Execution",
        maxScore: 30,
        scoreAwarded: 28,
        remarks: "Combined drone flight controller telemetry, multispectral spectral index algorithms, and GIS mapping."
      },
      {
        parameter: "Innovation & Originality",
        maxScore: 25,
        scoreAwarded: 25,
        remarks: "Hyper-local centimetre-level resolution vastly outperforms coarse 10m satellite imagery."
      },
      {
        parameter: "Real-World Impact & Utility",
        maxScore: 20,
        scoreAwarded: 20,
        remarks: "Tackles both smallholder farmer profitability and global agricultural runoff."
      },
      {
        parameter: "Pitch & Presentation Quality",
        maxScore: 15,
        scoreAwarded: 15,
        remarks: "Incredible pacing, compelling farmer persona story, and energetic physical demonstration."
      },
      {
        parameter: "UI/UX & Accessibility",
        maxScore: 10,
        scoreAwarded: 8,
        remarks: "Mobile web app optimized for daylight outdoor viewing on low-cost smartphones."
      }
    ],
    totalScore: 96,
    tags: ["ClimateTech", "Drones", "IoT", "Computer Vision"]
  },
  {
    _id: "pres-005",
    projectTitle: "OmniVoice: Real-Time Multilingual Code-Switching Speech AI",
    hackathonName: "Hack The North 2024",
    hackathonCategory: "AI & Machine Learning",
    year: 2024,
    award: "1st Place Winner Overall",
    team: "Polyglot Labs (3 members - Waterloo & Toronto)",
    presentationUrl: "https://speakerdeck.com/sample-omnivoice",
    demoVideoUrl: "https://youtube.com/watch?v=sample-omnivoice",
    githubUrl: "https://github.com/sample/omnivoice",
    pitchSummary: "A streaming speech-to-speech translation model that handles mid-sentence linguistic code-switching (e.g. Spanglish, Hinglish) with sub-300ms latency.",
    whyTheyWon: [
      "Interactive multilingual demo: The presenter spoke a rapid mix of Hindi and English; the audience heard synchronized English audio with zero robotic lag.",
      "Direct technical insight: Demonstrated how traditional ASR models fail when speakers switch languages mid-sentence and how their acoustic token router solved it.",
      "Benchmark transparency: Showed latency and Word Error Rate (WER) charts comparing OmniVoice against Whisper and Google Speech API.",
      "Polished delivery: Every speaker had an assigned 45-second section, seamlessly handing off the microphone."
    ],
    rubrics: [
      {
        parameter: "Technical Complexity & Execution",
        maxScore: 30,
        scoreAwarded: 29,
        remarks: "Fine-tuned streaming Conformer architecture with WebRTC audio chunk streaming pipeline."
      },
      {
        parameter: "Innovation & Originality",
        maxScore: 25,
        scoreAwarded: 25,
        remarks: "Tackled code-switching, which is traditionally ignored by Western-centric speech models."
      },
      {
        parameter: "Real-World Impact & Utility",
        maxScore: 20,
        scoreAwarded: 19,
        remarks: "Empowers 2 billion multilingual speakers worldwide in telehealth and remote work."
      },
      {
        parameter: "Pitch & Presentation Quality",
        maxScore: 15,
        scoreAwarded: 15,
        remarks: "Captivated the audience with a jaw-dropping live interactive speech test."
      },
      {
        parameter: "UI/UX & Accessibility",
        maxScore: 10,
        scoreAwarded: 9,
        remarks: "Ultra-responsive waveform visualization and real-time subtitle stream."
      }
    ],
    totalScore: 97,
    tags: ["Speech AI", "Deep Learning", "WebRTC", "Accessibility"]
  },
  {
    _id: "pres-006",
    projectTitle: "ExoSight: Automated Gravitational Lens Discovery Engine",
    hackathonName: "NASA Space Apps Challenge 2024",
    hackathonCategory: "AI & Machine Learning",
    year: 2024,
    award: "Global Winner: Galactic Impact Award",
    team: "AstroLens (4 members)",
    presentationUrl: "https://docs.google.com/presentation/d/sample-exosight",
    demoVideoUrl: "https://youtube.com/watch?v=sample-exosight",
    githubUrl: "https://github.com/sample/exosight",
    pitchSummary: "A transformer-based astronomical vision pipeline analyzing petabytes of James Webb Space Telescope (JWST) deep field survey images to identify undiscovered gravitational lenses.",
    whyTheyWon: [
      "Science validation: Discovered 2 previously cataloged candidate Einstein rings during hackathon data processing.",
      "Direct alignment with NASA rubrics: Targeted the exact Space Apps challenge parameter of open science accessibility.",
      "Clear visual diagrams of Einstein ring physics: Educated non-specialist judges in 30 seconds before diving into the transformer architecture.",
      "Open-source data tool: Packaged as a 1-line Python library for astrophysical researchers."
    ],
    rubrics: [
      {
        parameter: "Technical Complexity & Execution",
        maxScore: 30,
        scoreAwarded: 29,
        remarks: "Processed multi-band FITS scientific imaging files with Vision Transformers on GPU clusters."
      },
      {
        parameter: "Innovation & Originality",
        maxScore: 25,
        scoreAwarded: 24,
        remarks: "Applied self-attention spatial mechanisms to astronomical curvature anomalies."
      },
      {
        parameter: "Real-World Impact & Utility",
        maxScore: 20,
        scoreAwarded: 20,
        remarks: "Accelerates dark matter mapping and deep cosmos exploration."
      },
      {
        parameter: "Pitch & Presentation Quality",
        maxScore: 15,
        scoreAwarded: 14,
        remarks: "Breathtaking visual assets rendered from actual JWST public FITS datasets."
      },
      {
        parameter: "UI/UX & Accessibility",
        maxScore: 10,
        scoreAwarded: 8,
        remarks: "Interactive sky-map viewer with coordinate zoom and confidence sliders."
      }
    ],
    totalScore: 95,
    tags: ["Astrophysics", "Transformers", "NASA JWST", "Open Data"]
  }
];
