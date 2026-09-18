import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Laptop, Tablet, ArrowRight, Settings, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type DeviceType = 'Phone' | 'Laptop' | 'Tablet';
type Brand = string;
type Model = string;
type Issue = string;

const dbData = {
  "Phone": {
    "Apple": {
      "iPhone 17 Pro Max": {
        "Cracked or Broken Screen": "AED 1200",
        "Battery Issues": "AED 450",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "AED 300",
        "Camera Repair": "AED 600",
        "Audio Issues": "AED 350",
        "Button/Body Damage": "AED 600",
        "Software Issues": "AED 150",
        "Data Recovery": "From AED 500"
      },
      "iPhone 15 Pro Max": {
        "Cracked or Broken Screen": "AED 650",
        "Battery Issues": "AED 350",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 200",
        "Camera Repair": "AED 350",
        "Audio Issues": "AED 250",
        "Button/Body Damage": "AED 450",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 300"
      },
      "iPhone 14 Pro": {
        "Cracked or Broken Screen": "AED 450",
        "Battery Issues": "AED 280",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 150",
        "Camera Repair": "AED 250",
        "Audio Issues": "AED 200",
        "Button/Body Damage": "AED 300",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 300"
      },
      "iPhone 13": {
        "Cracked or Broken Screen": "AED 300",
        "Battery Issues": "AED 220",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 150",
        "Camera Repair": "AED 200",
        "Audio Issues": "AED 150",
        "Button/Body Damage": "AED 200",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 300"
      }
    },
    "Samsung": {
      "Galaxy S26 Ultra 5G": {
        "Cracked or Broken Screen": "AED 1150",
        "Battery Issues": "AED 350",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "AED 250",
        "Camera Repair": "AED 600",
        "Audio Issues": "AED 300",
        "Button/Body Damage": "AED 400",
        "Software Issues": "AED 150",
        "Data Recovery": "From AED 400"
      },
      "Galaxy A57 5G": {
        "Cracked or Broken Screen": "AED 450",
        "Battery Issues": "AED 200",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 150",
        "Camera Repair": "AED 200",
        "Audio Issues": "AED 100",
        "Button/Body Damage": "AED 150",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 200"
      },
      "Galaxy A56": {
        "Cracked or Broken Screen": "AED 400",
        "Battery Issues": "AED 180",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 120",
        "Camera Repair": "AED 180",
        "Audio Issues": "AED 100",
        "Button/Body Damage": "AED 120",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 200"
      },
      "Galaxy A17 5G": {
        "Cracked or Broken Screen": "AED 200",
        "Battery Issues": "AED 150",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 100",
        "Camera Repair": "AED 120",
        "Audio Issues": "AED 80",
        "Button/Body Damage": "AED 100",
        "Software Issues": "AED 80",
        "Data Recovery": "From AED 150"
      },
      "Galaxy S24 Ultra": {
        "Cracked or Broken Screen": "AED 950",
        "Battery Issues": "AED 250",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 200",
        "Camera Repair": "AED 400",
        "Audio Issues": "AED 200",
        "Button/Body Damage": "AED 300",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 300"
      },
      "Galaxy S23 Ultra": {
        "Cracked or Broken Screen": "AED 750",
        "Battery Issues": "AED 200",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "AED 150",
        "Camera Repair": "AED 300",
        "Audio Issues": "AED 150",
        "Button/Body Damage": "AED 250",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 300"
      }
    },
    "Other": {
      "Other Brands": {
        "Cracked or Broken Screen": "Contact for Quote",
        "Battery Issues": "Contact for Quote",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "Contact for Quote",
        "Camera Repair": "Contact for Quote",
        "Audio Issues": "Contact for Quote",
        "Button/Body Damage": "Contact for Quote",
        "Software Issues": "Contact for Quote",
        "Data Recovery": "Contact for Quote"
      }
    },
    "Huawei": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Nokia": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Sony": {
      "Xperia 1 VIII 5G": {
        "Cracked or Broken Screen": "From AED 450",
        "Battery Issues": "From AED 200",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 150",
        "Camera Repair": "From AED 200",
        "Audio Issues": "From AED 150",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 250"
      },
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "LG": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "HTC": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Motorola": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Lenovo": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Xiaomi": {
      "Redmi Note 15 5G": {
        "Cracked or Broken Screen": "From AED 250",
        "Battery Issues": "From AED 150",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 120",
        "Camera Repair": "From AED 150",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 120",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 200"
      },
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Google": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Honor": {
      "Magic8 Pro 5G": {
        "Cracked or Broken Screen": "From AED 450",
        "Battery Issues": "From AED 200",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 180",
        "Camera Repair": "From AED 220",
        "Audio Issues": "From AED 150",
        "Button/Body Damage": "From AED 180",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 250"
      },
      "600 Pro 5G": {
        "Cracked or Broken Screen": "From AED 350",
        "Battery Issues": "From AED 180",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 150",
        "Camera Repair": "From AED 180",
        "Audio Issues": "From AED 120",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 220"
      },
      "600 5G": {
        "Cracked or Broken Screen": "From AED 300",
        "Battery Issues": "From AED 150",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 120",
        "Camera Repair": "From AED 150",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 120",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 200"
      },
      "X9d 5G": {
        "Cracked or Broken Screen": "From AED 250",
        "Battery Issues": "From AED 130",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 80",
        "Button/Body Damage": "From AED 100",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 180"
      },
      "600 Lite 5G": {
        "Cracked or Broken Screen": "From AED 200",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 100",
        "Audio Issues": "From AED 80",
        "Button/Body Damage": "From AED 100",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 150"
      },
      "Play11 Plus 5G": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 90",
        "Camera Repair": "From AED 100",
        "Audio Issues": "From AED 80",
        "Button/Body Damage": "From AED 100",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 150"
      },
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Oppo": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Realme": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "OnePlus": {
      "Nord CE6 5G": {
        "Cracked or Broken Screen": "From AED 280",
        "Battery Issues": "From AED 150",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 120",
        "Camera Repair": "From AED 150",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 120",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 200"
      },
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Nothing": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "vivo": {
      "X300 FE 5G": {
        "Cracked or Broken Screen": "From AED 300",
        "Battery Issues": "From AED 160",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 130",
        "Camera Repair": "From AED 180",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 130",
        "Software Issues": "From AED 80",
        "Data Recovery": "From AED 220"
      },
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Meizu": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Ulefone": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Alcatel": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "ZTE": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "RugOne": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Umidigi": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Coolpad": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Oscal": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Sharp": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Micromax": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Infinix": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Asus": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Tecno": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Doogee": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Blackview": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Cubot": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Oukitel": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "Itel": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    },
    "TCL": {
      "All Models": {
        "Cracked or Broken Screen": "From AED 180",
        "Battery Issues": "From AED 120",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 120",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    }
  },
  "Laptop": {
    "Apple": {
      "MacBook Pro 16\" (M2/M3)": {
        "Cracked or Broken Screen": "AED 2500",
        "Battery Issues": "AED 800",
        "Water/Liquid Damage": "Diagnostic: AED 150",
        "Charging Port Problems": "AED 400",
        "Camera Repair": "AED 350",
        "Audio Issues": "AED 300",
        "Button/Body Damage": "AED 950",
        "Software Issues": "AED 200",
        "Data Recovery": "From AED 500"
      },
      "MacBook Air (M1/M2)": {
        "Cracked or Broken Screen": "AED 1200",
        "Battery Issues": "AED 500",
        "Water/Liquid Damage": "Diagnostic: AED 150",
        "Charging Port Problems": "AED 300",
        "Camera Repair": "AED 250",
        "Audio Issues": "AED 200",
        "Button/Body Damage": "AED 600",
        "Software Issues": "AED 150",
        "Data Recovery": "From AED 500"
      }
    },
    "Other": {
      "Windows Laptops": {
        "Cracked or Broken Screen": "From AED 350",
        "Battery Issues": "From AED 200",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "From AED 150",
        "Camera Repair": "From AED 150",
        "Audio Issues": "From AED 150",
        "Button/Body Damage": "From AED 250",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 400"
      }
    }
  },
  "Tablet": {
    "Apple": {
      "iPad Pro 12.9\" (M2)": {
        "Cracked or Broken Screen": "AED 1100",
        "Battery Issues": "AED 450",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "AED 250",
        "Camera Repair": "AED 300",
        "Audio Issues": "AED 200",
        "Button/Body Damage": "AED 500",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 400"
      },
      "iPad Air (M1)": {
        "Cracked or Broken Screen": "AED 600",
        "Battery Issues": "AED 350",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "AED 200",
        "Camera Repair": "AED 250",
        "Audio Issues": "AED 150",
        "Button/Body Damage": "AED 350",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 400"
      }
    },
    "Samsung": {
      "Galaxy Tab S9 Ultra": {
        "Cracked or Broken Screen": "AED 1200",
        "Battery Issues": "AED 400",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "AED 250",
        "Camera Repair": "AED 350",
        "Audio Issues": "AED 200",
        "Button/Body Damage": "AED 450",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 400"
      },
      "Galaxy Tab S8": {
        "Cracked or Broken Screen": "AED 750",
        "Battery Issues": "AED 300",
        "Water/Liquid Damage": "Diagnostic: AED 100",
        "Charging Port Problems": "AED 200",
        "Camera Repair": "AED 250",
        "Audio Issues": "AED 150",
        "Button/Body Damage": "AED 350",
        "Software Issues": "AED 100",
        "Data Recovery": "From AED 400"
      }
    },
    "Other": {
      "Other Tablets": {
        "Cracked or Broken Screen": "From AED 200",
        "Battery Issues": "From AED 150",
        "Water/Liquid Damage": "Diagnostic: AED 50",
        "Charging Port Problems": "From AED 100",
        "Camera Repair": "From AED 100",
        "Audio Issues": "From AED 100",
        "Button/Body Damage": "From AED 150",
        "Software Issues": "From AED 100",
        "Data Recovery": "From AED 250"
      }
    }
  }
};

export default function CostEstimator({ onBookNow }: { onBookNow: (s?: string) => void }) {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState<DeviceType | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [model, setModel] = useState<Model | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);

  const getPrice = () => {
    if (device && brand && model && issue) {
      // @ts-ignore
      return dbData[device][brand][model][issue];
    }
    return null;
  };

  const handleReset = () => {
    setDevice(null);
    setBrand(null);
    setModel(null);
    setIssue(null);
    setStep(1);
  }

  const renderStepIcon = (currentStep: number) => {
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= currentStep ? 'bg-brand-orange text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
        {step > currentStep ? <CheckCircle2 className="w-5 h-5" /> : currentStep}
      </div>
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">Instant Repair Estimate</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Select your device to get an immediate, transparent repair quote.</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-200 dark:border-slate-700">
          
          {/* Mobile Step Header */}
          <div className="sm:hidden flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Step {step} of 4</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {step === 1 && 'Select Device'}
                {step === 2 && 'Select Brand'}
                {step === 3 && 'Select Model'}
                {step === 4 && 'Select Issue'}
                {step === 5 && 'Estimate'}
              </span>
            </div>
            {step > 1 && step < 5 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="text-xs font-bold text-brand-orange hover:text-orange-600 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800"
              >
                Back
              </button>
            )}
          </div>

          {/* Desktop Progress Indicator */}
          <div className="hidden sm:flex items-center justify-between mb-10 relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10 -translate-y-1/2"></div>
            <div className="absolute left-0 top-1/2 h-1 bg-brand-orange -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2">
              {renderStepIcon(1)}
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Device</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2">
              {renderStepIcon(2)}
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Brand</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2">
              {renderStepIcon(3)}
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Model</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2">
              {renderStepIcon(4)}
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Issue</span>
            </div>
          </div>

          <div className="min-h-[260px] sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Device */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-3 gap-2.5 sm:gap-6">
                  {[
                    { type: 'Phone', icon: Smartphone },
                    { type: 'Laptop', icon: Laptop },
                    { type: 'Tablet', icon: Tablet }
                  ].map((d) => (
                    <button
                      key={d.type}
                      onClick={() => { setDevice(d.type as DeviceType); setStep(2); }}
                      className="flex flex-col items-center justify-center gap-2 sm:gap-4 p-4 sm:p-8 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-orange dark:hover:border-brand-orange hover:shadow-lg transition-all"
                    >
                      <div className="p-2.5 sm:p-4 bg-brand-blue/10 rounded-full">
                        <d.icon className="w-6 h-6 sm:w-10 sm:h-10 text-brand-blue dark:text-blue-400" />
                      </div>
                      <span className="font-bold text-sm sm:text-lg dark:text-white">{d.type}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Brand */}
              {step === 2 && device && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.keys(dbData[device]).map((b) => (
                      <button
                        key={b}
                        onClick={() => { setBrand(b); setStep(3); }}
                        className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-orange transition-all"
                      >
                        <span className="font-bold text-base dark:text-white truncate">{b}</span>
                        <ChevronRight className="text-slate-400 w-4 h-4 shrink-0" />
                      </button>
                    ))}
                </motion.div>
              )}

              {/* Step 3: Model */}
              {step === 3 && device && brand && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* @ts-ignore */}
                  {Object.keys(dbData[device][brand]).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setModel(m); setStep(4); }}
                      className="text-left p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-orange transition-all font-semibold text-slate-800 dark:text-slate-200"
                    >
                      {m}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Step 4: Issue */}
              {step === 4 && device && brand && model && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* @ts-ignore */}
                  {Object.keys(dbData[device][brand][model]).map((i) => (
                    <button
                      key={i}
                      onClick={() => { setIssue(i); setStep(5); }}
                      className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-orange transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-brand-orange" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{i}</span>
                      </div>
                      <ChevronRight className="text-slate-400" />
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Result */}
              {step === 5 && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Estimate Ready</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                    Repairing your <span className="font-bold text-slate-900 dark:text-white">{model}</span> ({issue})
                  </p>
                  
                  <div className="inline-block bg-white dark:bg-slate-800 border-2 border-brand-orange/30 px-8 py-6 rounded-2xl shadow-lg mb-8">
                    <span className="block text-sm font-semibold text-brand-orange uppercase tracking-wider mb-2">Estimated Cost</span>
                    <span className="block text-5xl font-black text-brand-blue dark:text-white tracking-tight">{getPrice()}</span>
                    <span className="block text-xs text-slate-500 mt-3">*Final price may vary based on actual physical inspection.</span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button 
                      onClick={() => onBookNow(`${model} - ${issue}`)}
                      className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      Book This Repair <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleReset}
                      className="w-full sm:w-auto px-8 py-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      Start Over
                    </button>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm text-slate-500 mb-3 font-medium cursor-default">Payment options: Cash, Card, or BNPL</span>
                      <div className="flex flex-wrap justify-center gap-2 items-center">
                        <span className="px-3 py-1 bg-[#EEFDF4] text-[#1D9968] border border-[#1D9968]/20 rounded-lg font-black tracking-tight text-sm">tabby</span>
                        <span className="px-3 py-1 bg-[#FFF4F0] text-[#E58869] border border-[#E58869]/20 rounded-lg font-black tracking-tight text-sm">tamara</span>
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-medium text-slate-600 dark:text-slate-300 text-xs">Credit/Debit Card</span>
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-medium text-slate-600 dark:text-slate-300 text-xs">Cash</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step > 1 && step < 5 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50 flex justify-between">
              <button onClick={() => setStep(s => s - 1)} className="text-slate-500 hover:text-brand-orange font-semibold transition-colors">
                &larr; Back
              </button>
              <button onClick={handleReset} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold transition-colors">
                Cancel
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
