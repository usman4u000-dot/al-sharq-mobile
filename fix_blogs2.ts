import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/data/blogPosts.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/(author: '[^']+')\n\s*},/g, `$1,\n    category: 'Mobile Phones',\n    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'\n  },`);

fs.writeFileSync(file, content);
console.log("Fixed blogPosts.tsx");
