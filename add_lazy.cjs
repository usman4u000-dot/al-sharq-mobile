const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Replace <img ...> with <img loading="lazy" ...> if it doesn't have loading="lazy"
      // But we shouldn't do this for Hero.tsx as it's above the fold
      if (fullPath.includes('Hero.tsx')) continue;
      
      content = content.replace(/<img\s+([^>]+)>/g, (match, attrs) => {
        if (!attrs.includes('loading=')) {
          modified = true;
          return `<img loading="lazy" ${attrs}>`;
        }
        return match;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('./src');
