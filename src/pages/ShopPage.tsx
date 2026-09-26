import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Smartphone, 
  Watch, 
  Headphones, 
  Tablet, 
  Laptop,
  Star, 
  Shield, 
  Tag, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PreOwnedDevices from '../components/PreOwnedDevices';
import { useLanguage } from '../contexts/LanguageContext';
import UAEDirhamSymbol from '../components/UAEDirhamSymbol';
import FlashSaleReservationModal, { FlashSaleItem } from '../components/FlashSaleReservationModal';
import { getEffectiveStock, getStoredSession } from '../services/customerTrackingService';
import GCCMonthlyCampaignBanner from '../components/GCCMonthlyCampaignBanner';
import { convertToGCC } from '../services/campaignScheduleService';

export interface ProductItem {
  id: number;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Huawei' | 'Oppo' | 'Xiaomi' | 'Other';
  marketPrice: number;
  price: number;
  savingsAED: number;
  condition: string;
  category: 'Phones' | 'Watches' | 'Earbuds' | 'Tablets' | 'Laptops';
  colors: { name: string; hex: string }[];
  specs: string[];
  image: string;
  badge: string;
  rating: number;
  stock: number;
}

export default function ShopPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [selectedRegionCode, setSelectedRegionCode] = useState<string>('ae');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<number, string>>({});
  const [modalProduct, setModalProduct] = useState<FlashSaleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [claimedStockOverrides, setClaimedStockOverrides] = useState<Record<number, number>>({});

  // Restore persistent zero-stock overrides from customer session so refreshes never revert stock
  useEffect(() => {
    const session = getStoredSession();
    if (session.claimedProductIds) {
      const overrides: Record<number, number> = {};
      Object.keys(session.claimedProductIds).forEach(k => {
        overrides[Number(k)] = 0;
      });
      setClaimedStockOverrides(overrides);
    }
  }, []);

  const handleStockZero = (productId: number) => {
    setClaimedStockOverrides(prev => ({ ...prev, [productId]: 0 }));
  };

  const handleOpenFlashScarcity = (product: ProductItem) => {
    const chosenColor = selectedColorMap[product.id] || product.colors[0]?.name;
    const currentStock = claimedStockOverrides[product.id] !== undefined
      ? claimedStockOverrides[product.id]
      : getEffectiveStock(product.id, product.stock);

    setModalProduct({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      marketPrice: product.marketPrice,
      savingsAED: product.savingsAED,
      selectedColor: chosenColor,
      image: product.image,
      stock: currentStock
    });
    setIsModalOpen(true);
  };

  const products: ProductItem[] = [
    // --- PHONES: IPHONE 18, 17, 16 ---
    {
      id: 201,
      name: "iPhone 18 Pro Max",
      brand: "Apple",
      marketPrice: 5299,
      price: 4240, // 20% down
      savingsAED: 1059,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Cosmic Titanium", hex: "#4b4845" },
        { name: "Desert Bronze", hex: "#c4a381" },
        { name: "Natural Titanium", hex: "#9a9791" },
        { name: "Silver", hex: "#e2e4e6" }
      ],
      specs: ["256GB / 512GB Storage", "2nm A20 Pro Bionic", "200MP Quad Periscope", "1-Year Apple Warranty"],
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
      badge: "20% Below Market Price",
      rating: 5,
      stock: 1 // Only 1 left!
    },
    {
      id: 202,
      name: "iPhone 18 Pro",
      brand: "Apple",
      marketPrice: 4699,
      price: 3759, // 20% down
      savingsAED: 940,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Desert Bronze", hex: "#c4a381" },
        { name: "Midnight Emerald", hex: "#1e3a34" },
        { name: "Natural Titanium", hex: "#9a9791" },
        { name: "Black Titanium", hex: "#2b2b2b" }
      ],
      specs: ["256GB Storage", "A20 Pro Silicon", "120Hz ProMotion LTPO 3.0", "Official TDRA/TRA"],
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800",
      badge: "Inbound Batch in 4-5 Days",
      rating: 5,
      stock: 0 // Out of Stock!
    },
    {
      id: 203,
      name: "iPhone 18",
      brand: "Apple",
      marketPrice: 3699,
      price: 2959, // 20% down
      savingsAED: 740,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Midnight Emerald", hex: "#1e3a34" },
        { name: "Ultramarine", hex: "#3b5998" },
        { name: "Starlight White", hex: "#f0f2f5" },
        { name: "Space Black", hex: "#1f2022" }
      ],
      specs: ["128GB / 256GB", "A20 Bionic Chip", "Ceramic Shield 3", "All-Day 4,200mAh"],
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800",
      badge: "20% OFF",
      rating: 5,
      stock: 2 // 2 units left
    },
    {
      id: 204,
      name: "iPhone 17 Pro Max",
      brand: "Apple",
      marketPrice: 4899,
      price: 3919, // 20% down
      savingsAED: 980,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Titanium Blue", hex: "#2f384a" },
        { name: "Natural Titanium", hex: "#9a9791" },
        { name: "White Titanium", hex: "#f5f5f7" },
        { name: "Black Titanium", hex: "#202124" }
      ],
      specs: ["256GB Storage", "A19 Pro Bionic", "48MP Triple Fusion Camera", "Action Button"],
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
      badge: "Best Seller",
      rating: 5,
      stock: 3 // 3 units left
    },
    {
      id: 205,
      name: "iPhone 16 Pro Max",
      brand: "Apple",
      marketPrice: 4499,
      price: 3599, // 20% down
      savingsAED: 900,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Desert Titanium", hex: "#c4a381" },
        { name: "Natural Titanium", hex: "#9a9791" },
        { name: "White Titanium", hex: "#f5f5f7" },
        { name: "Black Titanium", hex: "#202124" }
      ],
      specs: ["256GB Storage", "A18 Pro Silicon", "5x Optical Telephoto", "Apple Intelligence Ready"],
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
      badge: "Special Deal",
      rating: 5,
      stock: 1 // Only 1 left!
    },
    {
      id: 206,
      name: "iPhone 16",
      brand: "Apple",
      marketPrice: 3299,
      price: 2639, // 20% down
      savingsAED: 660,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Ultramarine", hex: "#28448f" },
        { name: "Teal Green", hex: "#497d74" },
        { name: "Pink", hex: "#d87d95" },
        { name: "Black", hex: "#1f2022" }
      ],
      specs: ["128GB Storage", "A18 Chip", "Camera Control Button", "Ceramic Shield"],
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800",
      badge: "20% OFF",
      rating: 5,
      stock: 4 // 4 units left
    },

    // --- SAMSUNG PHONES ---
    {
      id: 207,
      name: "Samsung Galaxy S26 Ultra 5G",
      brand: "Samsung",
      marketPrice: 4999,
      price: 3999, // 20% down
      savingsAED: 1000,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Titanium Silver", hex: "#d1d5db" },
        { name: "Phantom Black", hex: "#111827" },
        { name: "Marble Gray", hex: "#6b7280" }
      ],
      specs: ["512GB Storage", "Snapdragon 8 Gen 5", "200MP ISOCELL Zoom", "Embedded S-Pen"],
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800",
      badge: "20% Below Retail",
      rating: 5,
      stock: 2 // 2 units left
    },
    {
      id: 208,
      name: "Samsung Galaxy Z Fold 7 5G",
      brand: "Samsung",
      marketPrice: 6299,
      price: 5039, // 20% down
      savingsAED: 1260,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Crafted Black", hex: "#18181b" },
        { name: "Shadow Silver", hex: "#a1a1aa" },
        { name: "Navy Blue", hex: "#1e3a5f" }
      ],
      specs: ["512GB Storage", "Ultra-Thin Creaseless OLED", "Armor Aluminum 3", "Dex Desktop"],
      image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=800",
      badge: "Batch in 4-5 Days",
      rating: 5,
      stock: 0 // Sold out
    },

    // --- HUAWEI & OPPO PHONES ---
    {
      id: 209,
      name: "Huawei Mate 70 Pro 5G",
      brand: "Huawei",
      marketPrice: 3999,
      price: 3199, // 20% down
      savingsAED: 800,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Spruce Green", hex: "#2d4a3e" },
        { name: "Obsidian Black", hex: "#1c1917" },
        { name: "Pure White", hex: "#fafaf9" }
      ],
      specs: ["512GB Storage", "Kunlun Glass 3", "XMAGE Periscope Camera", "HarmonyOS Global"],
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
      badge: "Pre-Order 4-5 Days",
      rating: 5,
      stock: 0 // Sold out
    },
    {
      id: 210,
      name: "Huawei Pura 80 Ultra",
      brand: "Huawei",
      marketPrice: 4899,
      price: 3919, // 20% down
      savingsAED: 980,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Starburst Gold", hex: "#d4af37" },
        { name: "Glaze White", hex: "#f8fafc" },
        { name: "Carbon Black", hex: "#18181b" }
      ],
      specs: ["512GB Storage", "Retractable 1-Inch Sensor", "100W SuperCharge", "Satellite Calling"],
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800",
      badge: "Master Camera",
      rating: 5,
      stock: 1 // 1 left
    },
    {
      id: 211,
      name: "Oppo Find X8 Pro 5G",
      brand: "Oppo",
      marketPrice: 3799,
      price: 3039, // 20% down
      savingsAED: 760,
      condition: "Brand New Sealed",
      category: "Phones",
      colors: [
        { name: "Space Black", hex: "#09090b" },
        { name: "Pearl White", hex: "#f4f4f5" },
        { name: "Ocean Blue", hex: "#0284c7" }
      ],
      specs: ["512GB Storage", "Hasselblad Dual Periscope", "Dimensity 9400", "5,910mAh Silicon Battery"],
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800",
      badge: "20% Below Retail",
      rating: 5,
      stock: 3 // 3 units left
    },

    // --- SMARTWATCHES (SAMSUNG, HUAWEI, OPPO, APPLE) ---
    {
      id: 212,
      name: "Samsung Galaxy Watch 8 Ultra",
      brand: "Samsung",
      marketPrice: 2499,
      price: 1999, // 20% down
      savingsAED: 500,
      condition: "Brand New Sealed",
      category: "Watches",
      colors: [
        { name: "Titanium Gray", hex: "#4b5563" },
        { name: "Titanium White", hex: "#f3f4f6" },
        { name: "Titanium Silver", hex: "#9ca3af" }
      ],
      specs: ["Grade 4 Titanium Case", "100m Water Resistance", "Dual-Frequency GPS", "100-Hr Battery"],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      badge: "20% OFF",
      rating: 5,
      stock: 2 // 2 units left
    },
    {
      id: 213,
      name: "Huawei Watch Ultimate Design",
      brand: "Huawei",
      marketPrice: 2899,
      price: 2319, // 20% down
      savingsAED: 580,
      condition: "Brand New Sealed",
      category: "Watches",
      colors: [
        { name: "Ceramic Black & Gold", hex: "#18181b" },
        { name: "Titanium Silver", hex: "#d1d5db" }
      ],
      specs: ["Zirconium Liquid Metal", "100m Scuba Diving Certified", "14-Day Battery", "ECG Health Monitor"],
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800",
      badge: "Luxury Titanium",
      rating: 5,
      stock: 0 // Sold out
    },
    {
      id: 214,
      name: "Oppo Watch X",
      brand: "Oppo",
      marketPrice: 1299,
      price: 1039, // 20% down
      savingsAED: 260,
      condition: "Brand New Sealed",
      category: "Watches",
      colors: [
        { name: "Mars Brown", hex: "#78350f" },
        { name: "Platinum Black", hex: "#18181b" }
      ],
      specs: ["Dual-Engine Architecture", "Sapphire Crystal Glass", "Wear OS by Google", "100-Hr Smart Mode"],
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
      badge: "Top Value",
      rating: 5,
      stock: 4 // 4 units left
    },
    {
      id: 215,
      name: "Apple Watch Ultra 3",
      brand: "Apple",
      marketPrice: 3199,
      price: 2559, // 20% down
      savingsAED: 640,
      condition: "Brand New Sealed",
      category: "Watches",
      colors: [
        { name: "Natural Titanium", hex: "#9a9791" },
        { name: "Black Titanium", hex: "#1f2022" }
      ],
      specs: ["49mm Titanium Case", "3,000 Nits Display", "S10 SiP Chip", "Satellite Emergency SOS"],
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      badge: "20% OFF",
      rating: 5,
      stock: 1 // 1 left
    },

    // --- EARBUDS / AUDIO (SAMSUNG, HUAWEI, OPPO, APPLE) ---
    {
      id: 216,
      name: "Samsung Galaxy Buds 3 Pro",
      brand: "Samsung",
      marketPrice: 849,
      price: 679, // 20% down
      savingsAED: 170,
      condition: "Brand New Sealed",
      category: "Earbuds",
      colors: [
        { name: "Silver Blade", hex: "#94a3b8" },
        { name: "Frost White", hex: "#f8fafc" }
      ],
      specs: ["Blade Light Design", "24-bit Hi-Fi Sound", "Adaptive ANC 2.0", "Galaxy AI Interpreter"],
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
      badge: "20% Below Retail",
      rating: 5,
      stock: 3 // 3 units left
    },
    {
      id: 217,
      name: "Huawei FreeBuds Pro 4",
      brand: "Huawei",
      marketPrice: 799,
      price: 639, // 20% down
      savingsAED: 160,
      condition: "Brand New Sealed",
      category: "Earbuds",
      colors: [
        { name: "Silver Frost", hex: "#64748b" },
        { name: "Ceramic White", hex: "#f8fafc" }
      ],
      specs: ["Dual-Driver Acoustic System", "Intelligent Dynamic ANC 3.0", "L2HC 3.0 Lossless Codec", "33-Hr Playtime"],
      image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&q=80&w=800",
      badge: "Hi-Res Audio",
      rating: 5,
      stock: 2 // 2 units left
    },
    {
      id: 218,
      name: "Oppo Enco X3",
      brand: "Oppo",
      marketPrice: 699,
      price: 559, // 20% down
      savingsAED: 140,
      condition: "Brand New Sealed",
      category: "Earbuds",
      colors: [
        { name: "Moonlight White", hex: "#f1f5f9" },
        { name: "Night Black", hex: "#0f172a" }
      ],
      specs: ["Co-created with Dynaudio", "50dB Smart Active Noise Cancellation", "Dual DAC Architecture", "Spatial Audio"],
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800",
      badge: "Dynaudio Tuning",
      rating: 5,
      stock: 4 // 4 units left
    },
    {
      id: 219,
      name: "Apple AirPods Pro 3",
      brand: "Apple",
      marketPrice: 999,
      price: 799, // 20% down
      savingsAED: 200,
      condition: "Brand New Sealed",
      category: "Earbuds",
      colors: [
        { name: "Classic White", hex: "#ffffff" }
      ],
      specs: ["H3 Chip Audio Processing", "2x Stronger Active Noise Cancellation", "Heart Rate Sensor", "USB-C MagSafe Case"],
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800",
      badge: "Incoming Batch 4-5 Days",
      rating: 5,
      stock: 0 // Sold out
    },

    // --- TABLETS (SAMSUNG, HUAWEI, OPPO, APPLE) ---
    {
      id: 220,
      name: "Samsung Galaxy Tab S10 Ultra (14.6\")",
      brand: "Samsung",
      marketPrice: 5199,
      price: 4159, // 20% down
      savingsAED: 1040,
      condition: "Brand New Sealed",
      category: "Tablets",
      colors: [
        { name: "Moonstone Gray", hex: "#475569" },
        { name: "Platinum Silver", hex: "#e2e8f0" }
      ],
      specs: ["14.6\" Dynamic AMOLED 2X", "MediaTek Dimensity 9300+", "Anti-Reflective Coating", "IP68 S-Pen Included"],
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
      badge: "20% Below Retail",
      rating: 5,
      stock: 2 // 2 units left
    },
    {
      id: 221,
      name: "Huawei MatePad Pro 13.2\" OLED",
      brand: "Huawei",
      marketPrice: 3899,
      price: 3119, // 20% down
      savingsAED: 780,
      condition: "Brand New Sealed",
      category: "Tablets",
      colors: [
        { name: "Golden Black", hex: "#1c1917" },
        { name: "Crystal Blue", hex: "#38bdf8" }
      ],
      specs: ["13.2\" Flexible OLED (94% Screen-to-Body)", "NearLink M-Pencil Stylus", "88W SuperCharge", "5.5mm Ultra-Thin"],
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=800",
      badge: "Tandem OLED",
      rating: 5,
      stock: 1 // 1 unit left
    },
    {
      id: 222,
      name: "Oppo Pad 3 Pro 5G",
      brand: "Oppo",
      marketPrice: 2499,
      price: 1999, // 20% down
      savingsAED: 500,
      condition: "Brand New Sealed",
      category: "Tablets",
      colors: [
        { name: "Night Gray", hex: "#334155" },
        { name: "Aurora Gold", hex: "#fbbf24" }
      ],
      specs: ["12.1\" 3K 144Hz 7:5 Display", "Snapdragon 8 Gen 3 Leading", "Hi-Res Quad Speakers", "9,510mAh 67W SuperVOOC"],
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
      badge: "20% OFF",
      rating: 5,
      stock: 3 // 3 units left
    },
    {
      id: 223,
      name: "iPad Pro 13\" (M4 Silicon)",
      brand: "Apple",
      marketPrice: 5299,
      price: 4239, // 20% down
      savingsAED: 1060,
      condition: "Brand New Sealed",
      category: "Tablets",
      colors: [
        { name: "Space Black", hex: "#1f2022" },
        { name: "Silver", hex: "#e2e4e6" }
      ],
      specs: ["Ultra Retina XDR Tandem OLED", "M4 Chip (Pro Neural Engine)", "5.1mm Thin", "Apple Pencil Pro Ready"],
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
      badge: "M4 Powerhouse",
      rating: 5,
      stock: 0 // Sold out
    },

    // --- LAPTOPS (MACBOOK M4 MAX) ---
    {
      id: 224,
      name: "MacBook Pro 16\" (M4 Max)",
      brand: "Apple",
      marketPrice: 11999,
      price: 9599, // 20% down
      savingsAED: 2400,
      condition: "Brand New Sealed",
      category: "Laptops",
      colors: [
        { name: "Space Black", hex: "#1f2022" },
        { name: "Silver", hex: "#e2e4e6" }
      ],
      specs: ["M4 Max (16-Core CPU, 40-Core GPU)", "36GB Unified Memory", "1TB SSD", "Liquid Retina XDR"],
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
      badge: "Save AED 2,400",
      rating: 5,
      stock: 2 // 2 units left
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesBrand = activeBrand === 'All' || p.brand === activeBrand;
    return matchesCategory && matchesBrand;
  });

  const handleColorSelect = (productId: number, colorName: string) => {
    setSelectedColorMap(prev => ({ ...prev, [productId]: colorName }));
  };

  const handleOrderWhatsApp = (product: ProductItem) => {
    const chosenColor = selectedColorMap[product.id] || product.colors[0]?.name || 'Standard';
    const text = encodeURIComponent(
      `Hello Al Sharq Mobile Store! I want to reserve the ${product.name} (Color: ${chosenColor}) at your special 20% OFF wholesale price (Our Price: AED ${product.price}, Mall Price: AED ${product.marketPrice}). Please confirm availability.`
    );
    window.open(`https://wa.me/971507117043?text=${text}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Mobile Phone & Gadget Shop Sharjah | 20% Below Market Price | Al Sharq Mobile Store</title>
        <meta 
          name="description" 
          content="Buy brand new Apple iPhone 18, 17, 16, Samsung Galaxy S26, Watches, Earbuds, Tablets & MacBooks at 20% below shopping mall prices in Sharjah! Direct wholesale stock with official warranties." 
        />
        <meta 
          name="keywords" 
          content="iPhone 18 price Sharjah, iPhone 17 UAE discount, iPhone 16 Sharjah, Samsung S26 Ultra 20% off, Galaxy Watch 8 Ultra price, Huawei Mate 70 Sharjah, Oppo Find X8 UAE, cheap tablets Sharjah, ارخص محل جوالات في الشارقة" 
        />
        <link rel="canonical" href="https://allsharq.com/shop" />
      </Helmet>

      <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 20% Discount Banner with UAE Dirham Symbol */}
          <div className="bg-gradient-to-r from-red-600 via-brand-orange to-amber-600 text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              
              <div className="text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{isAr ? 'عروض الجملة للأفراد • أقل بـ 20% من أسعار المولات' : 'Wholesale Direct to Consumer • 20% Below Mall Prices'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 leading-tight">
                  {isAr ? (
                    <>أحدث الهواتف، الساعات، الإيربودز والتابلت بخصم <span className="underline decoration-white">20%</span></>
                  ) : (
                    <>Phones, Watches, Earbuds & Tablets <span className="underline decoration-white">20% Below Market</span></>
                  )}
                </h1>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
                  {isAr
                    ? 'نوفر أحدث أجهزة آيفون (18، 17، 16)، سامسونج، هواوی، أوبو، بالإضافة إلى الساعات الذكية وسماعات الأذن والأجهزة اللوحية بتغليف المصنع الأصلي وضمان معتمد.'
                    : 'Authentic sealed iPhone 18/17/16, Samsung Galaxy S26, smartwatches, wireless earbuds & tablets. Official TDRA/TRA certified stock direct from port import shipments.'}
                </p>

                {/* UAE Dirham Official Emblem Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/25 backdrop-blur-md rounded-xl text-xs font-bold text-amber-100">
                  <UAEDirhamSymbol size={18} className="text-amber-300" />
                  <span>{isAr ? 'الأسعار الرسمية بالدرهم الإماراتي الجديد (د.إ / AED)' : 'Official UAE Dirham Pricing (New AED Symbol Applied)'}</span>
                </div>
              </div>

              {/* Instant Call CTA Box */}
              <div className="shrink-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 rounded-3xl shadow-xl flex flex-col gap-3 w-full sm:w-auto text-center border border-slate-100 dark:border-slate-800">
                <div className="text-xs uppercase font-extrabold text-gray-500 dark:text-gray-400">
                  {isAr ? 'اتصل لحجز الجهاز وتثبيت السعر' : 'Call Sales Desk to Lock 20% Price'}
                </div>

                <a
                  href="tel:+971507117043"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  <span>+971 50 711 7043</span>
                </a>

                <a
                  href="https://wa.me/971507117043?text=Hello%20Al%20Sharq!%20I%20want%20to%20reserve%20a%20flagship%20device%20at%2020%%20off%20market%20price."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'حجز فوري عبر واتساب' : 'Reserve on WhatsApp'}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Category Tabs: Phones, Watches, Earbuds, Tablets, Laptops */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {[
              { id: 'All', icon: Sparkles, labelEn: 'All Products', labelAr: 'جميع المنتجات' },
              { id: 'Phones', icon: Smartphone, labelEn: 'Phones (18/17/16 & Galaxy)', labelAr: 'الهواتف الذكية' },
              { id: 'Watches', icon: Watch, labelEn: 'Smartwatches', labelAr: 'الساعات الذكية' },
              { id: 'Earbuds', icon: Headphones, labelEn: 'Earbuds & Audio', labelAr: 'سماعات الأذن' },
              { id: 'Tablets', icon: Tablet, labelEn: 'Tablets (Tab S10 / iPad)', labelAr: 'الأجهزة اللوحية' },
              { id: 'Laptops', icon: Laptop, labelEn: 'MacBooks & Laptops', labelAr: 'الماك بوك واللابتوب' }
            ].map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/25 scale-105' 
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Brand Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-xs font-bold text-gray-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> {isAr ? 'تصفية حسب الشركة:' : 'Filter Brand:'}
            </span>
            {['All', 'Apple', 'Samsung', 'Huawei', 'Oppo'].map(brand => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeBrand === brand
                    ? 'bg-brand-orange text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-slate-300 dark:hover:bg-slate-750'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product, index) => {
              const selectedColor = selectedColorMap[product.id] || product.colors[0]?.name;
              const currentProductStock = claimedStockOverrides[product.id] !== undefined
                ? claimedStockOverrides[product.id]
                : getEffectiveStock(product.id, product.stock);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 group flex flex-col justify-between hover:border-brand-orange/40 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image & Badges */}
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img 
                        loading="lazy" 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full shadow-lg flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>{product.badge}</span>
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs font-bold rounded-full shadow-md bg-white/95 dark:bg-slate-850/95 text-slate-900 dark:text-white backdrop-blur-md">
                          {product.condition}
                        </span>
                      </div>

                      {/* Live Stock Scarcity Tag on Image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className={`px-2.5 py-1 text-white text-[11px] font-black rounded-lg backdrop-blur-md shadow-md flex items-center gap-1.5 ${
                          currentProductStock === 0 ? 'bg-slate-900/95 text-amber-300' : 'bg-red-600/95 animate-pulse'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${currentProductStock === 0 ? 'bg-amber-400' : 'bg-white'}`}></span>
                          <span>
                            {currentProductStock === 0
                              ? (isAr ? 'المخزون: 0 (نفدت الكمية)' : 'Stock: 0 (Sold Out)')
                              : currentProductStock === 1
                                ? (isAr ? 'متبقي قطعة واحدة فقط!' : 'Only 1 Unit Left Online!')
                                : (isAr ? `متبقي ${currentProductStock} قطع أونلاين` : `Only ${currentProductStock} Units Left!`)}
                          </span>
                        </span>
                        <span className="px-2 py-0.5 bg-black/75 text-amber-300 text-[10px] font-black rounded-md backdrop-blur-sm">
                          Online Exclusive
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">{product.brand}</span>
                          <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{product.name}</h3>
                        </div>
                      </div>

                      {/* Color Selector Swatches */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="my-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-semibold">
                            <span>{isAr ? 'اللون المحدد:' : 'Available Colors:'}</span>
                            <span className="text-slate-800 dark:text-slate-200 font-bold">{selectedColor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.colors.map((c, i) => (
                              <button
                                key={i}
                                onClick={() => handleColorSelect(product.id, c.name)}
                                title={c.name}
                                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                                  selectedColor === c.name 
                                    ? 'border-brand-orange scale-110 shadow-md ring-2 ring-brand-orange/30' 
                                    : 'border-slate-300 dark:border-slate-600 hover:scale-105'
                                }`}
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price Box with UAE Dirham Symbol */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-100 dark:border-slate-700 my-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-400 line-through font-semibold">
                              Mall Price: AED {product.marketPrice}
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                              <UAEDirhamSymbol size={22} className="text-emerald-600 dark:text-emerald-400" />
                              <span>{product.price}</span>
                              <span className="text-xs font-mono text-gray-400 uppercase">AED</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="px-2.5 py-1 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-black text-xs rounded-full inline-block">
                              Save {product.savingsAED} AED
                            </span>
                          </div>
                        </div>

                        {/* Online Scarcity Banner with Realistic Stock */}
                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold">
                          <span className="text-amber-800 dark:text-amber-300">
                            ⚡ {isAr ? 'حصري أونلاين (غير متوفر بالمحل بهذا السعر)' : 'Online Only (20% OFF)'}
                          </span>
                          {currentProductStock === 0 ? (
                            <span className="text-red-600 dark:text-red-400 font-black flex items-center gap-1 bg-red-100 dark:bg-red-950/70 px-2 py-0.5 rounded-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                              {isAr ? 'المخزون: 0 (نفد - شحنة جديدة)' : 'Stock: 0 (Sold Out)'}
                            </span>
                          ) : currentProductStock === 1 ? (
                            <span className="text-red-600 dark:text-red-400 font-black flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                              {isAr ? 'المخزون: قطعة 1 فقط!' : 'Stock: Only 1 left!'}
                            </span>
                          ) : (
                            <span className="text-amber-700 dark:text-amber-400 font-extrabold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              {isAr ? `المخزون: ${currentProductStock} قطع` : `Stock: ${currentProductStock} units`}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Specs */}
                      <ul className="space-y-1.5 mb-2 text-xs text-gray-600 dark:text-gray-300">
                        {product.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions: Primary Scarcity Booking Button & Call/WhatsApp */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => handleOpenFlashScarcity(product)}
                      className={`w-full py-3 mb-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
                        currentProductStock === 0
                          ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 shadow-slate-900/30 border border-amber-500/40'
                          : 'bg-gradient-to-r from-red-600 via-brand-orange to-amber-600 hover:from-red-700 hover:to-orange-700 text-white shadow-orange-500/25'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {currentProductStock === 0
                          ? (isAr ? 'احجز في الشحنة القادمة (4-5 أيام)' : 'Pre-Order Inbound Batch (4-5 Days)')
                          : (isAr ? `حجز بالخصم (المتبقي: ${currentProductStock})` : 'Claim 20% Online Deal')}
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:+971507117043"
                        className="py-2.5 px-2 bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{isAr ? 'اتصل للاستفسار' : 'Call Desk'}</span>
                      </a>

                      <button
                        onClick={() => handleOpenFlashScarcity(product)}
                        className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{isAr ? 'طلب أونلاين' : 'Order Online'}</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Pre-Owned Devices Module */}
          <div className="mt-16">
            <PreOwnedDevices />
          </div>

          {/* Trade-In Banner */}
          <div className="mt-16 bg-brand-blue dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-3">Trade In Your Old Device for Maximum Cash in Sharjah</h2>
              <p className="text-sm sm:text-base text-blue-100 mb-8 max-w-2xl mx-auto">
                Bring any working, cracked, or water-damaged iPhone, Samsung, Huawei, or MacBook to our Muwaileh store. Get instant store credit toward your new 20% discounted flagship!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/repair-estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-black hover:bg-orange-600 transition-all shadow-lg">
                  <span>Get Instant Trade-In Value</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+971507117043" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>Call Store (+971 50 711 7043)</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Global Flash Scarcity & Priority Allocation Modal with Firestore and Session Persistence */}
      <FlashSaleReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={modalProduct}
        onStockZero={handleStockZero}
      />
    </>
  );
}
