import fs from 'fs';
import path from 'path';

let file = path.join(process.cwd(), 'src/data/blogPosts.tsx');
let content = fs.readFileSync(file, 'utf8');

const regex = /{\s*id:\s*'(convenience-revolution|swollen-phone-battery-dangers|accessory-protection-playbook|gaming-computer-repair-sharjah|emergency-phone-fix-same-day|ultimate-2026-buyers-guide|apple-samsung-repair-sharjah|slow-computer-fix-ssd-upgrade|repair-rescue-guide)',[\s\S]*?(?=\n\s*},\n\s*{|\n\s*},\n\s*\.\.\.)/g;

content = content.replace(regex, '');
// some might have trailing '},'
content = content.replace(/},\n\s*},\n/g, '},\n'); // Clean up any double closure

fs.writeFileSync(file, content);
console.log("Filtered old matching posts.");
