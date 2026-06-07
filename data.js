// Technology Radar Data
// Bubble size maps to the value/maturity level (1-5)
// Position is based on quadrant (focus area) and ring (adoption stage)

const radarData = [
    // Reservoir Potential - Adopt Ring
    {
        id: 1,
        name: "Advanced Seismic Imaging",
        focusArea: "Reservoir Potential",
        ring: "Adopt",
        value: 5,
        description: "3D/4D seismic imaging for enhanced reservoir characterization",
        details: "ML-powered interpretation, real-time updates, cost reduction: 30%"
    },
    {
        id: 2,
        name: "Pressure Management Systems",
        focusArea: "Reservoir Potential",
        ring: "Adopt",
        value: 4,
        description: "Real-time pressure monitoring and optimization",
        details: "Prevents overburden damage, extends well life by 25%"
    },
    {
        id: 3,
        name: "Horizontal Well Technology",
        focusArea: "Reservoir Potential",
        ring: "Adopt",
        value: 5,
        description: "Extended reach drilling for improved recovery rates",
        details: "20-40% production increase, reduces environmental footprint"
    },

    // Reservoir Potential - Trial Ring
    {
        id: 4,
        name: "AI-Driven Resource Estimation",
        focusArea: "Reservoir Potential",
        ring: "Trial",
        value: 4,
        description: "Machine learning for reserve calculation accuracy",
        details: "Reduces estimation error to <5%, enables faster decision-making"
    },
    {
        id: 5,
        name: "Microseismic Monitoring",
        focusArea: "Reservoir Potential",
        ring: "Trial",
        value: 3,
        description: "Real-time fracture propagation tracking",
        details: "Optimizes stimulation design, currently in pilot phase"
    },

    // Reservoir Potential - Assess Ring
    {
        id: 6,
        name: "Quantum Reservoir Simulation",
        focusArea: "Reservoir Potential",
        ring: "Assess",
        value: 2,
        description: "Quantum computing for complex reservoir modeling",
        details: "Early research phase, potential 1000x speedup"
    },

    // HSSE - Adopt Ring
    {
        id: 7,
        name: "Wearable Safety Sensors",
        focusArea: "HSSE",
        ring: "Adopt",
        value: 5,
        description: "IoT wearables for real-time worker safety monitoring",
        details: "Detects hazards, prevents accidents, 40% incident reduction"
    },
    {
        id: 8,
        name: "Drone Inspection Systems",
        focusArea: "HSSE",
        ring: "Adopt",
        value: 4,
        description: "Autonomous drones for facility and pipeline inspection",
        details: "Reduces manual inspection time by 70%, improves coverage"
    },
    {
        id: 9,
        name: "Environmental Monitoring Network",
        focusArea: "HSSE",
        ring: "Adopt",
        value: 4,
        description: "Continuous air and water quality monitoring",
        details: "Regulatory compliance, real-time alerts, predictive analysis"
    },

    // HSSE - Trial Ring
    {
        id: 10,
        name: "AR Safety Training",
        focusArea: "HSSE",
        ring: "Trial",
        value: 3,
        description: "Augmented reality for immersive safety training",
        details: "75% faster learning, better retention than traditional methods"
    },
    {
        id: 11,
        name: "Predictive Health Analytics",
        focusArea: "HSSE",
        ring: "Trial",
        value: 3,
        description: "AI-powered occupational health risk prediction",
        details: "Identifies health risks before issues arise"
    },

    // HSSE - Assess Ring
    {
        id: 12,
        name: "Neural Implants for Hazard Detection",
        focusArea: "HSSE",
        ring: "Assess",
        value: 1,
        description: "Emerging biotech for autonomous hazard sensing",
        details: "Highly speculative, regulatory challenges ahead"
    },

    // Operations - Adopt Ring
    {
        id: 13,
        name: "SCADA Systems Optimization",
        focusArea: "Operations",
        ring: "Adopt",
        value: 5,
        description: "Supervisory control and data acquisition optimization",
        details: "Real-time operational control, 15% efficiency gain"
    },
    {
        id: 14,
        name: "Predictive Maintenance",
        focusArea: "Operations",
        ring: "Adopt",
        value: 5,
        description: "ML-based equipment failure prediction",
        details: "Reduces downtime by 35%, maintenance costs by 25%"
    },
    {
        id: 15,
        name: "Cloud-Based Operations Center",
        focusArea: "Operations",
        ring: "Adopt",
        value: 4,
        description: "Centralized cloud operations management platform",
        details: "Multi-site coordination, real-time dashboards"
    },

    // Operations - Trial Ring
    {
        id: 16,
        name: "Digital Twin Technology",
        focusArea: "Operations",
        ring: "Trial",
        value: 4,
        description: "Virtual replicas of physical assets for simulation",
        details: "Test scenarios safely, optimize performance before deployment"
    },
    {
        id: 17,
        name: "Autonomous Equipment",
        focusArea: "Operations",
        ring: "Trial",
        value: 3,
        description: "Self-operating vehicles and equipment in field operations",
        details: "Currently in controlled pilot environments"
    },

    // Operations - Assess Ring
    {
        id: 18,
        name: "Blockchain Supply Chain",
        focusArea: "Operations",
        ring: "Assess",
        value: 2,
        description: "Distributed ledger for supply chain transparency",
        details: "Evaluating scalability and energy efficiency"
    },

    // AI & Automation - Adopt Ring
    {
        id: 19,
        name: "Data Analytics Platform",
        focusArea: "AI",
        ring: "Adopt",
        value: 5,
        description: "Enterprise-wide big data analytics infrastructure",
        details: "Petabyte scale, real-time processing, 90% data utilization"
    },
    {
        id: 20,
        name: "Machine Learning Pipelines",
        focusArea: "AI",
        ring: "Adopt",
        value: 5,
        description: "Automated ML model development and deployment",
        details: "MLOps, continuous learning, production-grade models"
    },
    {
        id: 21,
        name: "Process Automation (RPA)",
        focusArea: "AI",
        ring: "Adopt",
        value: 4,
        description: "Robotic process automation for back-office tasks",
        details: "60% labor cost reduction, 99.9% accuracy"
    },

    // AI & Automation - Trial Ring
    {
        id: 22,
        name: "Generative AI for Reporting",
        focusArea: "AI",
        ring: "Trial",
        value: 4,
        description: "GPT-based automated report generation",
        details: "Creates technical summaries in seconds, in pilot with teams"
    },
    {
        id: 23,
        name: "Computer Vision for QA",
        focusArea: "AI",
        ring: "Trial",
        value: 3,
        description: "Visual AI for quality control and defect detection",
        details: "Testing in manufacturing and inspection workflows"
    },

    // AI & Automation - Assess Ring
    {
        id: 24,
        name: "Neuromorphic Computing",
        focusArea: "AI",
        ring: "Assess",
        value: 2,
        description: "Brain-inspired AI architecture for energy efficiency",
        details: "Research stage, potential for extreme low-power AI"
    },

    // AI & Automation - Hold Ring
    {
        id: 25,
        name: "Unproven Quantum ML",
        focusArea: "AI",
        ring: "Hold",
        value: 1,
        description: "Quantum machine learning algorithms",
        details: "Too immature, wait for hardware and algorithms to mature"
    }
];

// Focus areas for filtering
const focusAreas = [
    "Reservoir Potential",
    "HSSE",
    "Operations",
    "AI"
];

// Tech clusters (adoption stages)
const techClusters = [
    "Adopt",
    "Trial",
    "Assess",
    "Hold"
];

// Color mapping for rings
const ringColors = {
    "Adopt": "#ff6b35",    // Orange-red
    "Trial": "#f7931e",    // Orange
    "Assess": "#fdb913",   // Yellow
    "Hold": "#c0c0c0"      // Gray
};

// Quadrant angles (in degrees) for each focus area
const quadrantAngles = {
    "Reservoir Potential": 45,
    "HSSE": 135,
    "Operations": 225,
    "AI": 315
};

// Export for use in radar.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        radarData,
        focusAreas,
        techClusters,
        ringColors,
        quadrantAngles
    };
}
