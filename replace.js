const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.json')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace the specific string
    content = content.replace(/Al Sharq Mobile Phone & Computer Trading LLC \(Techfix & Gidgets\)/g, 'Al Sharq Mobile Phone & Computer Trading LLC');
    
    // Also catch other variations just in case
    content = content.replace(/Al Sharq Mobile Phone & Computer Trading LLC \(TechFix & Gadgets\)/g, 'Al Sharq Mobile Phone & Computer Trading LLC');
    content = content.replace(/TechFix & Gadgets \(Al Sharq Mobile Phone & Computer Trading LLC\)/g, 'Al Sharq Mobile Phone & Computer Trading LLC');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
