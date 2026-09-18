import fs from 'fs';

const dbDataNew = {
  Phone: {
    Apple: {
      'iPhone 15 Pro Max': { 'Cracked or Broken Screen': 'AED 650', 'Battery Issues': 'AED 350', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'AED 200', 'Camera Repair': 'AED 350', 'Audio Issues': 'AED 250', 'Button/Body Damage': 'AED 450', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 300' },
      'iPhone 14 Pro': { 'Cracked or Broken Screen': 'AED 450', 'Battery Issues': 'AED 280', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'AED 150', 'Camera Repair': 'AED 250', 'Audio Issues': 'AED 200', 'Button/Body Damage': 'AED 300', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 300' },
      'iPhone 13': { 'Cracked or Broken Screen': 'AED 300', 'Battery Issues': 'AED 220', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'AED 150', 'Camera Repair': 'AED 200', 'Audio Issues': 'AED 150', 'Button/Body Damage': 'AED 200', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 300' },
    },
    Samsung: {
      'Galaxy S24 Ultra': { 'Cracked or Broken Screen': 'AED 950', 'Battery Issues': 'AED 250', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'AED 200', 'Camera Repair': 'AED 400', 'Audio Issues': 'AED 200', 'Button/Body Damage': 'AED 300', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 300' },
      'Galaxy S23 Ultra': { 'Cracked or Broken Screen': 'AED 750', 'Battery Issues': 'AED 200', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'AED 150', 'Camera Repair': 'AED 300', 'Audio Issues': 'AED 150', 'Button/Body Damage': 'AED 250', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 300' },
    },
    Other: { 'Other Brands': { 'Cracked or Broken Screen': 'Contact for Quote', 'Battery Issues': 'Contact for Quote', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'Contact for Quote', 'Camera Repair': 'Contact for Quote', 'Audio Issues': 'Contact for Quote', 'Button/Body Damage': 'Contact for Quote', 'Software Issues': 'Contact for Quote', 'Data Recovery': 'Contact for Quote' } },
  },
  Laptop: {
    Apple: {
      'MacBook Pro 16" (M2/M3)': { 'Cracked or Broken Screen': 'AED 2500', 'Battery Issues': 'AED 800', 'Water/Liquid Damage': 'Diagnostic: AED 150', 'Charging Port Problems': 'AED 400', 'Camera Repair': 'AED 350', 'Audio Issues': 'AED 300', 'Button/Body Damage': 'AED 950', 'Software Issues': 'AED 200', 'Data Recovery': 'From AED 500' },
      'MacBook Air (M1/M2)': { 'Cracked or Broken Screen': 'AED 1200', 'Battery Issues': 'AED 500', 'Water/Liquid Damage': 'Diagnostic: AED 150', 'Charging Port Problems': 'AED 300', 'Camera Repair': 'AED 250', 'Audio Issues': 'AED 200', 'Button/Body Damage': 'AED 600', 'Software Issues': 'AED 150', 'Data Recovery': 'From AED 500' },
    },
    Other: { 'Windows Laptops': { 'Cracked or Broken Screen': 'From AED 350', 'Battery Issues': 'From AED 200', 'Water/Liquid Damage': 'Diagnostic: AED 100', 'Charging Port Problems': 'From AED 150', 'Camera Repair': 'From AED 150', 'Audio Issues': 'From AED 150', 'Button/Body Damage': 'From AED 250', 'Software Issues': 'From AED 100', 'Data Recovery': 'From AED 400' } },
  },
  Tablet: {
    Apple: {
      'iPad Pro 12.9" (M2)': { 'Cracked or Broken Screen': 'AED 1100', 'Battery Issues': 'AED 450', 'Water/Liquid Damage': 'Diagnostic: AED 100', 'Charging Port Problems': 'AED 250', 'Camera Repair': 'AED 300', 'Audio Issues': 'AED 200', 'Button/Body Damage': 'AED 500', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 400' },
      'iPad Air (M1)': { 'Cracked or Broken Screen': 'AED 600', 'Battery Issues': 'AED 350', 'Water/Liquid Damage': 'Diagnostic: AED 100', 'Charging Port Problems': 'AED 200', 'Camera Repair': 'AED 250', 'Audio Issues': 'AED 150', 'Button/Body Damage': 'AED 350', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 400' },
    },
    Samsung: {
      'Galaxy Tab S9 Ultra': { 'Cracked or Broken Screen': 'AED 1200', 'Battery Issues': 'AED 400', 'Water/Liquid Damage': 'Diagnostic: AED 100', 'Charging Port Problems': 'AED 250', 'Camera Repair': 'AED 350', 'Audio Issues': 'AED 200', 'Button/Body Damage': 'AED 450', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 400' },
      'Galaxy Tab S8': { 'Cracked or Broken Screen': 'AED 750', 'Battery Issues': 'AED 300', 'Water/Liquid Damage': 'Diagnostic: AED 100', 'Charging Port Problems': 'AED 200', 'Camera Repair': 'AED 250', 'Audio Issues': 'AED 150', 'Button/Body Damage': 'AED 350', 'Software Issues': 'AED 100', 'Data Recovery': 'From AED 400' },
    },
    Other: { 'Other Tablets': { 'Cracked or Broken Screen': 'From AED 200', 'Battery Issues': 'From AED 150', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'From AED 100', 'Camera Repair': 'From AED 100', 'Audio Issues': 'From AED 100', 'Button/Body Damage': 'From AED 150', 'Software Issues': 'From AED 100', 'Data Recovery': 'From AED 250' } },
  }
};

const brands = [
  "Huawei", "Nokia", "Sony", "LG", "HTC", 
  "Motorola", "Lenovo", "Xiaomi", "Google", "Honor", "Oppo", 
  "Realme", "OnePlus", "Nothing", "vivo", "Meizu", "Ulefone", 
  "Alcatel", "ZTE", "RugOne", "Umidigi", "Coolpad", "Oscal", 
  "Sharp", "Micromax", "Infinix", "Asus", "Tecno", "Doogee", 
  "Blackview", "Cubot", "Oukitel", "Itel", "TCL"
];

for (const b of brands) {
  dbDataNew.Phone[b] = { "All Models": { 'Cracked or Broken Screen': 'From AED 180', 'Battery Issues': 'From AED 120', 'Water/Liquid Damage': 'Diagnostic: AED 50', 'Charging Port Problems': 'From AED 100', 'Camera Repair': 'From AED 120', 'Audio Issues': 'From AED 100', 'Button/Body Damage': 'From AED 150', 'Software Issues': 'From AED 100', 'Data Recovery': 'From AED 250' } };
}

let content = fs.readFileSync("src/components/CostEstimator.tsx", "utf8");

// replace everything between const dbData = { and };
const regex = /const dbData = {[\s\S]*?};\n\n/m;
const modified = content.replace(regex, "const dbData = " + JSON.stringify(dbDataNew, null, 2) + ";\n\n");

fs.writeFileSync("src/components/CostEstimator.tsx", modified);
console.log("Done");
