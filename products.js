/**
 * E-Commerce Product Catalog Database (Mock Data)
 * Enhanced with Specs, Color Variants, Stock Status & Verified Customer Reviews
 */
const PRODUCTS = [
  {
    id: 1,
    title: "Aura Sound Pro Wireless Headphones",
    category: "Audio",
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewsCount: 342,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Active Noise Cancellation, 40-hour ultra-long battery life, high-resolution audio drivers with spatial audio support.",
    features: ["Active Noise Cancelling", "40h Battery Life", "Bluetooth 5.3", "Built-in Mic"],
    colors: ["#111827", "#f1f5f9", "#3b82f6"],
    warranty: "2 Years Nexus Care",
    stock: 24,
    reviews: [
      { author: "Alex R.", rating: 5, date: "Yesterday", text: "Incredible bass and the ANC blocks out subway noise completely!" },
      { author: "Priya S.", rating: 5, date: "3 days ago", text: "Super comfortable for all-day coding sessions." }
    ]
  },
  {
    id: 2,
    title: "Chrono Apex Smartwatch Titanium",
    category: "Wearables",
    price: 219.00,
    originalPrice: 299.00,
    rating: 4.9,
    reviewsCount: 512,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "Aircraft-grade titanium body, sapphire crystal AMOLED display, heart-rate tracking, ECG, sleep tracking & GPS.",
    features: ["AMOLED 1.4\" Display", "7-Day Battery", "5ATM Waterproof", "ECG & SpO2"],
    colors: ["#1e293b", "#94a3b8", "#d97706"],
    warranty: "1 Year International",
    stock: 15,
    reviews: [
      { author: "Marcus K.", rating: 5, date: "1 week ago", text: "Titanium finish feels luxury tier. Battery easily lasts a week." }
    ]
  },
  {
    id: 3,
    title: "Veloce Minimalist Runner Sneakers",
    category: "Footwear",
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.6,
    reviewsCount: 198,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Ultra-breathable knit upper, responsive cloud foam cushioning, and high-traction rubber outsole designed for all-day comfort.",
    features: ["Cloud Cushioning", "Breathable Mesh", "Orthopedic Sole", "Eco-friendly"],
    colors: ["#dc2626", "#0f172a", "#ffffff"],
    warranty: "6 Months Sole Guarantee",
    stock: 30,
    reviews: [
      { author: "David B.", rating: 5, date: "2 weeks ago", text: "Walked 20,000 steps on holiday with zero foot fatigue." }
    ]
  },
  {
    id: 4,
    title: "Horizon 4K Ultra OLED Action Camera",
    category: "Electronics",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewsCount: 145,
    badge: "New",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    description: "Crystal clear 4K 60fps recording, dual touchscreens, 6-axis gimbal stabilization, and waterproof down to 18 meters without case.",
    features: ["4K 60FPS", "6-Axis Stabilization", "Waterproof 18m", "Dual Touchscreens"],
    colors: ["#0f172a"],
    warranty: "2 Years Replacement",
    stock: 8,
    reviews: [
      { author: "Elena T.", rating: 4.5, date: "5 days ago", text: "Stabilization is on par with $500 action cams." }
    ]
  },
  {
    id: 5,
    title: "Heritage Full-Grain Leather Backpack",
    category: "Accessories",
    price: 139.50,
    originalPrice: 180.00,
    rating: 4.9,
    reviewsCount: 220,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Handcrafted from vegetable-tanned genuine leather with dedicated 16-inch padded laptop compartment and brass hardware.",
    features: ["Full Grain Leather", "16\" Laptop Slot", "Water Resistant", "YKK Zippers"],
    colors: ["#78350f", "#1c1917"],
    warranty: "Lifetime Craftsmanship",
    stock: 12,
    reviews: [
      { author: "Lucas M.", rating: 5, date: "1 month ago", text: "The leather smell and quality stitching is unmatched." }
    ]
  },
  {
    id: 6,
    title: "CyberDeck RGB Mechanical Keyboard",
    category: "Electronics",
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.7,
    reviewsCount: 289,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    description: "Hot-swappable custom lubricated switches, gasket mount design, sound-dampening silicone foam, and per-key RGB backlighting.",
    features: ["Hot-Swappable Switches", "Gasket Mount", "Per-Key RGB", "Bluetooth & Type-C"],
    colors: ["#18181b", "#ffffff"],
    warranty: "1 Year Official",
    stock: 19,
    reviews: [
      { author: "Gamer99", rating: 5, date: "3 days ago", text: "Thocky sound profile right out of the box!" }
    ]
  },
  {
    id: 7,
    title: "Lumina Studio Minimalist Desk Lamp",
    category: "Accessories",
    price: 54.99,
    originalPrice: 75.00,
    rating: 4.5,
    reviewsCount: 88,
    badge: "",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    description: "Sleek aluminum architecture, stepless touch dimming, color temperature memory, and integrated 15W fast wireless charging pad.",
    features: ["Touch Dimmer", "3 Color Temps", "15W Wireless Qi", "Aluminum Finish"],
    colors: ["#475569", "#ffffff"],
    warranty: "1 Year Warranty",
    stock: 22,
    reviews: [
      { author: "Sarah W.", rating: 4, date: "4 days ago", text: "Charges my phone fast and looks like modern art." }
    ]
  },
  {
    id: 8,
    title: "Pulse Wireless Bluetooth Earbuds",
    category: "Audio",
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewsCount: 410,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    description: "Pocket-sized ergonomic buds with deep bass profile, IPX7 sweat resistance, and 32-hour playback with the wireless charging case.",
    features: ["IPX7 Sweatproof", "32h Total Playtime", "Touch Controls", "Low Latency Gaming"],
    colors: ["#020617", "#ffffff", "#0284c7"],
    warranty: "1 Year Replacement",
    stock: 45,
    reviews: [
      { author: "Kenji H.", rating: 5, date: "Yesterday", text: "Stay tightly in ears while jogging. Great mic clarity too." }
    ]
  },
  {
    id: 9,
    title: "Solstice Polarized Aviator Sunglasses",
    category: "Accessories",
    price: 79.00,
    originalPrice: 110.00,
    rating: 4.8,
    reviewsCount: 167,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    description: "Premium optical-grade polarized TAC lenses with anti-reflective coating and ultra-lightweight stainless steel frames.",
    features: ["100% UV400 Protection", "Polarized TAC", "Stainless Steel", "Leather Case"],
    colors: ["#eab308", "#0f172a", "#94a3b8"],
    warranty: "1 Year Scratch Guarantee",
    stock: 18,
    reviews: [
      { author: "Chloe L.", rating: 5, date: "2 weeks ago", text: "Lightweight and crystal clear vision while driving." }
    ]
  },
  {
    id: 10,
    title: "Terra Grip Outdoor Trail Running Shoes",
    category: "Footwear",
    price: 115.00,
    originalPrice: 145.00,
    rating: 4.7,
    reviewsCount: 134,
    badge: "New",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    description: "Built for tough terrains with aggressive Vibram tread patterns, rock protection plate, and quick-dry water repellent weave.",
    features: ["Vibram Traction", "Rock Protection Plate", "Water-Repellent", "Reinforced Toe"],
    colors: ["#15803d", "#0f172a"],
    warranty: "6 Months Outdoor Warranty",
    stock: 14,
    reviews: [
      { author: "Brad P.", rating: 5, date: "Last month", text: "Zero slips on wet muddy trails. Highly recommend." }
    ]
  },
  {
    id: 11,
    title: "Velocity Wireless Ergonomic Mouse",
    category: "Electronics",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviewsCount: 204,
    badge: "",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
    description: "Scientifically engineered 57-degree vertical angle to relieve wrist strain, high-precision 4000 DPI sensor, and multi-device pairing.",
    features: ["57° Natural Grip", "Silent Clicks", "Multi-Device Pairing", "Type-C Fast Charge"],
    colors: ["#1e293b", "#cbd5e1"],
    warranty: "1 Year Replacement",
    stock: 28,
    reviews: [
      { author: "Samantha", rating: 5, date: "1 week ago", text: "My wrist pain vanished after 3 days of using this mouse." }
    ]
  },
  {
    id: 12,
    title: "FitTrack Pro Smart Fitness Tracker",
    category: "Wearables",
    price: 59.95,
    originalPrice: 85.00,
    rating: 4.4,
    reviewsCount: 301,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
    description: "Continuous SpO2 blood oxygen monitor, 120+ sport modes, guided breathing sessions, and feather-light all-day wearable comfort.",
    features: ["SpO2 & Heart Rate", "14-Day Battery", "Waterproof 50m", "120+ Sports Modes"],
    colors: ["#0f172a", "#ec4899", "#0284c7"],
    warranty: "1 Year Warranty",
    stock: 35,
    reviews: [
      { author: "Arjun V.", rating: 4, date: "3 days ago", text: "Best budget fitness tracker. Sleep analytics are very accurate." }
    ]
  }
];
