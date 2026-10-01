// js/vehicles-data.js
// Centralized vehicle data for E-Royce Motors
// Each vehicle has: name, slug, category, tagline, description, colors with images,
// highlights, specifications, features

const EROYCE_VEHICLES = [
  {
    name: "eBull",
    slug: "ebull",
    category: "commercial",
    categoryLabel: "Commercial 3-Wheeler",
    tagline: "Built for heavy-duty last-mile cargo.",
    description: "The E-Royce eBull is a high-payload electric cargo three-wheeler engineered for demanding Indian logistics. With a reinforced chassis, heavy-duty BLDC motor, and LFP battery, it delivers consistent performance across urban and semi-urban routes.",
    colors: [
      { name: "Standard", hex: "#F59E0B", image: "assets/images/ebull.png" }
    ],
    highlights: [
      { value: "110 km",  label: "Max Range" },
      { value: "25 km/h", label: "Top Speed" },
      { value: "750 kg",  label: "Payload Capacity" },
      { value: "8 hrs",   label: "Full Charge" },
      { value: "36 mo",   label: "Battery Warranty" },
      { value: "LFP",     label: "Battery Type" }
    ],
    specs: [
      { param: "Category",         value: "Commercial Electric 3-Wheeler" },
      { param: "Motor Type",       value: "BLDC (Brushless DC)" },
      { param: "Motor Power",      value: "1000W" },
      { param: "Battery Type",     value: "LFP (Lithium Iron Phosphate)" },
      { param: "Operating Voltage",value: "60V" },
      { param: "Range",            value: "50 – 110 km / charge" },
      { param: "Top Speed",        value: "25 km/h" },
      { param: "Charging Time",    value: "8 hours" },
      { param: "Payload Capacity", value: "Up to 750 kg" },
      { param: "Braking System",   value: "Drum Brakes (F & R)" },
      { param: "Tyre Type",        value: "Tubeless" },
      { param: "Suspension (F)",   value: "Leaf Spring" },
      { param: "Suspension (R)",   value: "Coil Spring" },
      { param: "Motor Warranty",   value: "12 Months" },
      { param: "Battery Warranty", value: "36 Months" },
      { param: "ARAI Compliant",   value: "Yes" }
    ],
    features: [
      "High Payload Capacity (750 kg)",
      "LFP Battery — safest chemistry",
      "Heavy-Duty Reinforced Chassis",
      "Low running cost: ₹0.45/km",
      "No RTO — Low-speed vehicle",
      "Digital Instrument Cluster",
      "Anti-Theft Alarm System",
      "Full LED Lighting"
    ]
  },
  {
    name: "Sardar",
    slug: "sardar",
    category: "2wheeler",
    categoryLabel: "Electric Scooter",
    tagline: "Stylish, high-speed everyday electric scooter.",
    description: "The E-Royce Sardar is a premium electric scooter with a bold retro-inspired design, smooth ride quality, and a high-efficiency BLDC hub motor. Built for comfortable, high-speed daily commuting.",
    colors: [
      { name: "Red",    hex: "#dc2626", image: "assets/images/sardar red.png" },
      { name: "Blue",   hex: "#2563eb", image: "assets/images/sardar blue.png" },
      { name: "Grey",   hex: "#6b7280", image: "assets/images/sardar grey.png" },
      { name: "Black",  hex: "#171717", image: "assets/images/sardar black.png" },
      { name: "Peach",  hex: "#ffdab9", image: "assets/images/sardar peach.png" }
    ],
    highlights: [
      { value: "100 km", label: "Max Range" },
      { value: "60 km/h",label: "Top Speed" },
      { value: "4 hrs",  label: "Full Charge" },
      { value: "2.3 kWh",label: "Battery" },
      { value: "36 mo",  label: "Battery Warranty" },
      { value: "BLDC",   label: "Hub Motor" }
    ],
    specs: [
      { param: "Category",         value: "Electric Scooter" },
      { param: "Motor Type",       value: "BLDC Hub Motor" },
      { param: "Battery Type",     value: "Li-Ion, 2.3 kWh" },
      { param: "Operating Voltage",value: "60V" },
      { param: "Range",            value: "90 – 100 km / charge" },
      { param: "Top Speed",        value: "60 km/h" },
      { param: "Charging Time",    value: "4 hours" },
      { param: "Braking System",   value: "Disc (F) / Drum (R)" },
      { param: "Tyre Type",        value: "Tubeless" },
      { param: "Motor Warranty",   value: "12 Months" },
      { param: "Battery Warranty", value: "36 Months" },
      { param: "ARAI Compliant",   value: "Yes" }
    ],
    features: [
      "Bold Retro-Inspired Design",
      "Disc Brakes (Front) for Safety",
      "60 km/h High-Speed Capability",
      "Comfortable Ride — Low NVH",
      "Zero Tailpipe Emissions",
      "LED Lighting System",
      "Anti-Theft Alarm",
      "Keyless Entry System"
    ]
  },
  {
    name: "Spike",
    slug: "spike",
    category: "2wheeler",
    categoryLabel: "Electric Scooter",
    tagline: "Stylish license-free urban commuter.",
    description: "The E-Royce Spike is a premium low-speed electric scooter with front disc brakes, digital display, and keyless start. No RTO registration or driving license required — the smart way to commute every day.",
    colors: [
      { name: "Red",   hex: "#dc2626", image: "assets/images/Spike-Red1-1.png" },
      { name: "Blue",  hex: "#2563eb", image: "assets/images/spike blue.png" },
      { name: "White", hex: "#ffffff", image: "assets/images/spike white.png" }
    ],
    highlights: [
      { value: "80 km",  label: "Max Range" },
      { value: "25 km/h",label: "Top Speed" },
      { value: "4 hrs",  label: "Full Charge" },
      { value: "Disc",   label: "Front Brake" },
      { value: "36 mo",  label: "Battery Warranty" },
      { value: "0 Docs", label: "License Free" }
    ],
    specs: [
      { param: "Category",         value: "Low-Speed Electric Scooter" },
      { param: "Motor Type",       value: "BLDC" },
      { param: "Motor Power",      value: "250W" },
      { param: "Battery Type",     value: "Lithium" },
      { param: "Operating Voltage",value: "60V" },
      { param: "Range",            value: "70 – 80 km / charge" },
      { param: "Top Speed",        value: "25 km/h" },
      { param: "Charging Time",    value: "4 hours" },
      { param: "Payload Capacity", value: "150 kg" },
      { param: "Braking System",   value: "Front Disc / Rear Drum" },
      { param: "Dimensions (L×W×H)", value: "1800 × 700 × 1100 mm" },
      { param: "Tyre Size",        value: "90/100-10 inch Tubeless" },
      { param: "Ground Clearance", value: "160 mm" },
      { param: "Speedometer",      value: "Digital" },
      { param: "Key Features",     value: "Anti-Theft, Keyless Entry" },
      { param: "Motor Warranty",   value: "12 Months" },
      { param: "Battery Warranty", value: "36 Months" },
      { param: "RTO Registration", value: "Not Applicable" },
      { param: "ARAI / ICAT Approved", value: "Yes" },
      { param: "Available Colors", value: "Red, Blue, White" }
    ],
    features: [
      "No RTO Registration Required",
      "No Driving License Required",
      "Front Disc Brake for Safety",
      "Digital Instrument Display",
      "Keyless Entry System",
      "Anti-Theft Alarm",
      "USB Charging Port",
      "LED Headlamp"
    ]
  },
  {
    name: "RS90",
    slug: "rs90",
    category: "2wheeler",
    categoryLabel: "Electric Scooter",
    tagline: "Reliable everyday performance scooter.",
    description: "The E-Royce RS90 is a versatile electric scooter delivering up to 90 km on a single charge. Perfect for daily commuters who need reliability, comfort, and style — all in one package.",
    colors: [
      { name: "Blue",      hex: "#2563eb", image: "assets/images/blue.png" },
      { name: "Dark Blue", hex: "#1e3a8a", image: "assets/images/dk blue.png" },
      { name: "Grey",      hex: "#6b7280", image: "assets/images/grey.png" },
      { name: "Red",       hex: "#dc2626", image: "assets/images/red.png" }
    ],
    highlights: [
      { value: "90 km",  label: "Max Range" },
      { value: "25 km/h",label: "Top Speed" },
      { value: "4 hrs",  label: "Full Charge" },
      { value: "150 kg", label: "Payload" },
      { value: "36 mo",  label: "Battery Warranty" },
      { value: "LFP",    label: "Battery" }
    ],
    specs: [
      { param: "Category",         value: "Electric Scooter" },
      { param: "Motor Type",       value: "BLDC" },
      { param: "Motor Power",      value: "250W" },
      { param: "Battery Type",     value: "Lithium / LFP" },
      { param: "Operating Voltage",value: "60V" },
      { param: "Range",            value: "50 – 90 km / charge" },
      { param: "Top Speed",        value: "25 km/h" },
      { param: "Charging Time",    value: "4 hours" },
      { param: "Payload Capacity", value: "150 kg" },
      { param: "Braking System",   value: "Front Disc / Rear Drum" },
      { param: "Tyre Size",        value: "90/100-10 inch Tubeless" },
      { param: "Ground Clearance", value: "160 mm" },
      { param: "Speedometer",      value: "Digital" },
      { param: "Motor Warranty",   value: "12 Months" },
      { param: "Battery Warranty", value: "36 Months" },
      { param: "ARAI Compliant",   value: "Yes" },
      { param: "Available Colors", value: "Blue, Dark Blue, Grey, Red" }
    ],
    features: [
      "Up to 90 km Range Per Charge",
      "Front Disc Brake",
      "Digital Instrument Cluster",
      "Anti-Theft System",
      "Keyless Ignition",
      "Tubeless Tyres",
      "LED Lighting",
      "USB Charging Port"
    ]
  },
  {
    name: "RS180",
    slug: "rs180",
    category: "2wheeler",
    categoryLabel: "Electric Scooter",
    tagline: "Power-packed scooter for demanding commutes.",
    description: "The E-Royce RS180 is a performance-oriented electric scooter with an upgraded motor and enhanced battery capacity. Designed for those who need more power and greater range for their daily rides.",
    colors: [
      { name: "Black",  hex: "#0a0a0a", image: "assets/images/rs 180 black.png" },
      { name: "Grey",   hex: "#6b7280", image: "assets/images/rs 180 grey.png" },
      { name: "Yellow", hex: "#F59E0B", image: "assets/images/rs 180 yellow.png" }
    ],
    highlights: [
      { value: "90 km",  label: "Max Range" },
      { value: "25 km/h",label: "Top Speed" },
      { value: "4 hrs",  label: "Full Charge" },
      { value: "180W",   label: "Motor Power" },
      { value: "36 mo",  label: "Battery Warranty" },
      { value: "Digital",label: "Instrument" }
    ],
    specs: [
      { param: "Category",         value: "Electric Scooter" },
      { param: "Motor Type",       value: "BLDC" },
      { param: "Motor Power",      value: "350W" },
      { param: "Battery Type",     value: "Lithium / LFP" },
      { param: "Operating Voltage",value: "60V" },
      { param: "Range",            value: "50 – 90 km / charge" },
      { param: "Top Speed",        value: "25 km/h" },
      { param: "Charging Time",    value: "4 hours" },
      { param: "Payload Capacity", value: "150 kg" },
      { param: "Braking System",   value: "Front Disc / Rear Drum" },
      { param: "Tyre Size",        value: "90/100-10 inch Tubeless" },
      { param: "Ground Clearance", value: "165 mm" },
      { param: "Speedometer",      value: "Digital" },
      { param: "Motor Warranty",   value: "12 Months" },
      { param: "Battery Warranty", value: "36 Months" },
      { param: "ARAI Compliant",   value: "Yes" },
      { param: "Available Colors", value: "Black, Grey, Yellow" }
    ],
    features: [
      "Enhanced Motor for Steep Inclines",
      "Extended Range Up to 90 km",
      "Front Disc Brake",
      "Digital Speedometer",
      "Anti-Theft & Keyless Entry",
      "Wider Tubeless Tyres",
      "Full LED Lighting",
      "USB Charging Port"
    ]
  }
];

// Helper: get vehicle by slug
function getVehicleBySlug(slug) {
  return EROYCE_VEHICLES.find(v => v.slug === slug) || null;
}
