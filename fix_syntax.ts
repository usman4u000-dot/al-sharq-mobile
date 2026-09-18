import fs from 'fs';
import path from 'path';

let file = path.join(process.cwd(), 'src/data/blogPosts.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace any trailing/double }, 
// e.g. },\n  },\n
content = content.replace(/},\n\s*},\n/g, '},\n');
content = content.replace(/},\n\s*},\n/g, '},\n');
content = content.replace(/},\n\s*},\n/g, '},\n');

fs.writeFileSync(file, content);
