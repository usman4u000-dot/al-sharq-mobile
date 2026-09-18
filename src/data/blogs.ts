export type BlogCategory = 'MacBook & Laptop Authority' | 'Smartphone & iPhone Expertise' | 'Trading & Local Consumer Tips' | 'Tech News' | 'Industry News' | 'Mobile Phones' | 'Software Updates' | 'Deep Tech' | 'Laptops & Computers';

export interface BlogPost {
  id: string;
  title: string;
  hook: string;
  category: BlogCategory;
  targetKeyword?: string;
}

export const blogPosts: BlogPost[] = [
  // New Phone Announcements
  {
    id: 'sony-xperia-1-viii-5g',
    title: 'Sony Xperia 1 VIII 5G announced: The Ultimate Creator Smartphone',
    hook: 'Sony is back with the Xperia 1 VIII 5G, boasting new camera sensors and a continuous optical zoom lens.',
    category: 'Mobile Phones',
  },
  {
    id: 'samsung-galaxy-a57-5g',
    title: 'Samsung Galaxy A57 5G: Redefining the Mid-Range Experience',
    hook: 'The Galaxy A57 5G aims to dominate the mid-tier market with flagship features at an accessible price point.',
    category: 'Mobile Phones',
  },
  {
    id: 'samsung-galaxy-s26-ultra-5g',
    title: 'Samsung Galaxy S26 Ultra 5G: The Undisputed King of Androids',
    hook: 'Samsung pushes the boundaries of AI, camera optics, and processing power with the highly anticipated S26 Ultra.',
    category: 'Mobile Phones',
  },
  {
    id: 'honor-600-pro-5g',
    title: 'Honor 600 Pro 5G: A Symphony of Design and Performance',
    hook: 'The Honor 600 Pro 5G makes waves with its stunning aesthetic and incredibly fast charging speeds.',
    category: 'Mobile Phones',
  },
  {
    id: 'honor-magic8-pro-5g',
    title: 'Honor Magic8 Pro 5G: Pushing the Boundaries of Magic',
    hook: 'Honor pushes AI and camera optics to the limits with the new Magic8 Pro 5G.',
    category: 'Mobile Phones',
  },
  {
    id: 'honor-600-5g',
    title: 'Honor 600 5G: Your Next Premium Mid-Ranger',
    hook: 'The standard Honor 600 5G brings most of the Pro-level features at a more accessible price point.',
    category: 'Mobile Phones',
  },
  {
    id: 'honor-x9d-5g',
    title: 'Honor X9d 5G: Indestructible Battery Life Meets Rugged Design',
    hook: 'Honor introduces the X9d 5G, boasting a nearly indestructible display and a mammoth battery.',
    category: 'Mobile Phones',
  },
  {
    id: 'honor-600-lite-5g',
    title: 'Honor 600 Lite 5G: Featherweight Champion of the Budget Tier',
    hook: 'The Honor 600 Lite offers incredibly slim design and impressive imaging for budget-conscious buyers.',
    category: 'Mobile Phones',
  },
  {
    id: 'honor-play11-plus-5g',
    title: 'Honor Play11 Plus 5G: Serious Gaming on a Budget',
    hook: 'For high framerates without the flagship price tag, the Honor Play11 Plus 5G arrives as the ultimate budget gaming option.',
    category: 'Mobile Phones',
  },
  {
    id: 'samsung-galaxy-a17-5g',
    title: 'Samsung Galaxy A17 5G: 5G Connectivity for the Masses',
    hook: 'Samsung\'s entry-level Galaxy A17 brings solid 5G performance and a robust battery to the budget segment.',
    category: 'Mobile Phones',
  },
  {
    id: 'apple-iphone-17-pro-max',
    title: 'Apple iPhone 17 Pro Max: What to Expect from Apple\'s upcoming Titan',
    hook: 'Thinner bezels, an under-display Face ID, and a supercharged A19 Pro chip headline the iPhone 17 Pro Max.',
    category: 'Smartphone & iPhone Expertise',
  },
  {
    id: 'xiaomi-redmi-note-15-5g-global',
    title: 'Xiaomi Redmi Note 15 5G (Global): The New Baseline for Value',
    hook: 'Xiaomi\'s wildly popular Redmi Note series gets an upgrade with the global launch of the Note 15 5G.',
    category: 'Mobile Phones',
  },
  {
    id: 'oneplus-nord-ce6-5g',
    title: 'OnePlus Nord CE6 5G: Core Edition Gets a Serious Power Boost',
    hook: 'OnePlus stays true to its roots with the Nord CE6, delivering smooth performance without draining your wallet.',
    category: 'Mobile Phones',
  },
  {
    id: 'vivo-x300-fe-5g',
    title: 'vivo X300 FE 5G: Flagship Imaging for Less',
    hook: 'The vivo X300 FE packs an impressive Zeiss camera system into a more affordable "Fan Edition" package.',
    category: 'Mobile Phones',
  },
  {
    id: 'samsung-galaxy-a56',
    title: 'Samsung Galaxy A56 goes official: The Quiet Middle Child Packs a Punch',
    hook: 'Bridging the gap between budget and premium, the Galaxy A56 offers a balanced experience for everyday users.',
    category: 'Mobile Phones',
  },

  // Tech & Industry News
  {
    id: 'dji-osmo-pocket-4p-announcement',
    title: 'DJI reveals the Osmo Pocket 4P tailored for independent filmmakers',
    hook: 'DJI has just announced its latest handheld stabilization camera, the Osmo Pocket 4P.',
    category: 'Industry News',
  },
  {
    id: 'realme-return-finnish-market',
    title: 'Realme announces return to Finnish market on May 18 with three devices',
    hook: 'Realme is making a strong comeback in Finland, announcing the launch of three new devices.',
    category: 'Mobile Phones',
  },
  {
    id: 'android-airdrop-support-quick-share',
    title: 'These Android phones will soon receive AirDrop support in Quick Share',
    hook: 'Google announced that Quick Share will soon support seamless AirDrop transfers.',
    category: 'Software Updates',
  },
  {
    id: 'android-share-files-iphone-qr-code',
    title: 'Android users can now share files with iPhones via QR code',
    hook: 'Android has rolled out a new QR code-based sharing feature to easily send files to iPhones.',
    category: 'Software Updates',
  },
  {
    id: 'honor-robot-phone-launch',
    title: "Honor Robot Phone's launch timeframe officially confirmed",
    hook: 'The launch window for Honor\'s innovative "Robot Phone" concept has just been revealed.',
    category: 'Deep Tech',
  },
  {
    id: 'honor-win-turbo-teaser',
    title: 'Honor Win Turbo is coming this month, teaser campaign officially kicks off',
    hook: 'The teaser for the new Win Turbo series of Windows laptops has begun.',
    category: 'Laptops & Computers',
  },
  {
    id: 'google-android-dialer-update',
    title: 'Google is bringing a long-awaited dialer update to Android',
    hook: 'Google Phone app is receiving a major visual and functional overhaul.',
    category: 'Software Updates',
  },
  {
    id: 'vivo-x500-series-7000mah',
    title: 'vivo X500 series once again tipped to pack 7,000mAh batteries',
    hook: 'Rumors suggest the vivo X500 series will feature a colossal 7,000mAh battery.',
    category: 'Mobile Phones',
  },
  {
    id: 'iqoo-z11-india-launch',
    title: "iQOO Z11 is headed to India, here's when to expect it and how much it will cost",
    hook: 'The highly anticipated performance phone, the iQOO Z11, is launching soon in India.',
    category: 'Mobile Phones',
  },
  {
    id: 'samsung-dimensity-9500-chipset',
    title: 'Samsung will be using the Dimensity 9500 chipset',
    hook: 'Samsung is reportedly equipping some upcoming premium devices with MediaTek\'s Dimensity 9500.',
    category: 'Mobile Phones',
  },
  {
    id: 'sam-kolder-vivo-x300-ultra-film',
    title: "Here's a short film shot by Sam Kolder exclusively on the vivo X300 Ultra",
    hook: 'Renowned filmmaker Sam Kolder releases a breathtaking short film.',
    category: 'Industry News',
  },

  // MacBook & Laptop Authority (The Specialist Series)
  {
    id: 'm4-macbook-logic-board-repair',
    title: 'M4 MacBook Logic Board Repair: Why You Don’t Need a Full Replacement',
    hook: 'Explaining how chip-level repair at Al Sharq saves customers 50% compared to official service centers.',
    category: 'MacBook & Laptop Authority',
  },
  {
    id: 'spilled-coffee-macbook-emergency',
    title: 'Spilled Coffee on Your MacBook? The 3-Step Emergency Guide for Muwaileh Students',
    hook: 'Immediate advice to prevent corrosion before bringing it to your shop.',
    category: 'MacBook & Laptop Authority',
  },
  {
    id: 'upgrade-windows-laptop-2026-ai',
    title: 'How to Upgrade Your Windows Laptop for 2026 AI Software',
    hook: 'Focusing on NVMe Gen5 SSDs and RAM upgrades for smoother performance.',
    category: 'MacBook & Laptop Authority',
  },
  {
    id: 'blue-screen-of-death-fix',
    title: 'The "Blue Screen of Death" Fix: Common Windows 11 Errors We Solve Daily',
    hook: 'Troubleshooting common software crashes for Sharjah business owners.',
    category: 'MacBook & Laptop Authority',
  },
  {
    id: 'macbook-battery-life-sharjah-heat',
    title: 'MacBook Battery Life in Sharjah’s Heat: Tips to Avoid Swelling',
    hook: 'Crucial maintenance for the UAE climate.',
    category: 'MacBook & Laptop Authority',
  },

  // Smartphone & iPhone Expertise
  {
    id: 'iphone-17-vs-16-upgrade',
    title: 'iPhone 17 vs. iPhone 16: Is the Upgrade Worth It for Sharjah Users?',
    hook: 'A local perspective on new features like the 2026 AI capabilities.',
    category: 'Smartphone & iPhone Expertise',
  },
  {
    id: 'truth-about-original-screens-s26',
    title: 'The Truth About "Original" Screens: What Al Sharq Uses for Samsung S26 Repairs',
    hook: 'Building trust by explaining the difference between OLED, Refurbished, and Copy screens.',
    category: 'Smartphone & iPhone Expertise',
  },
  {
    id: 'faceid-stopped-working-diy-fix',
    title: 'Why Your FaceID Stopped Working After a DIY Screen Fix',
    hook: 'Warning customers about sensor pairing and why professional calibration matters.',
    category: 'Smartphone & iPhone Expertise',
  },
  {
    id: '5-reasons-phone-overheating-summer',
    title: '5 Reasons Your Phone is Overheating This Summer (And How to Fix It)',
    hook: 'Identifying battery vs. motherboard issues caused by the UAE sun.',
    category: 'Smartphone & iPhone Expertise',
  },
  {
    id: 'data-recovery-101-dead-phone',
    title: 'Data Recovery 101: Can We Get Your Photos Back from a Dead Phone?',
    hook: 'Reassuring customers that "Dead" doesn\'t always mean "Gone."',
    category: 'Smartphone & iPhone Expertise',
  },

  // Trading & Local Consumer Tips
  {
    id: 'maximum-trade-in-value-muwaileh',
    title: 'How to Get the Maximum Trade-In Value for Your Used Device in Muwaileh',
    hook: 'A checklist on cleaning, backing up, and timing your sale.',
    category: 'Trading & Local Consumer Tips',
  },
  {
    id: '2026-guide-buying-pre-owned',
    title: 'The 2026 Guide to Buying Pre-Owned: What Our "Certified" Check Covers',
    hook: 'Promoting your "Certified Pre-Owned" stock over unregulated marketplaces like Dubizzle.',
    category: 'Trading & Local Consumer Tips',
  },
  {
    id: 'university-city-students-emergency-repairs',
    title: 'Why University City Students Choose Al Sharq for Emergency Repairs',
    hook: 'Highlighting your proximity and speed for students on a deadline.',
    category: 'Trading & Local Consumer Tips',
  },
  {
    id: 'best-accessories-galaxy-s26',
    title: 'The Best Accessories for Your New Galaxy S26: Protection Meets Style',
    hook: 'Showcasing your Graphene cases and fast chargers.',
    category: 'Trading & Local Consumer Tips',
  },
  {
    id: '12-years-sharjah-al-sharq-trusted-name',
    title: '12 Years in Sharjah: How Al Sharq Became a Trusted Name',
    hook: 'A "Brand Story" post that builds emotional connection and local pride.',
    category: 'Trading & Local Consumer Tips',
  },
];
