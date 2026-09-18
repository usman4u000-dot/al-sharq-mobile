import fs from 'fs';
import path from 'path';

console.log("Merging blogs...");

// The idea is to read blogPosts.tsx, insert the imports at the top, and concatenate the arrays.
let file = path.join(process.cwd(), 'src/data/blogPosts.tsx');
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('seoBlogs1')) {
  // Add imports
  content = content.replace(
    `import React from 'react';`, 
    `import React from 'react';\nimport { seoBlogs1 } from './seoBlogs1';\nimport { seoBlogs2 } from './seoBlogs2';\nimport { seoBlogs3 } from './seoBlogs3';`
  );

  // Re-export combined array. Right now it's:
  // export const blogPosts: BlogPost[] = [ ... ];
  // We want to add ...seoBlogs1, etc at the end before closing bracket.
  
  content = content.replace(
    /\n\];\n*$/,
    `\n  ,...seoBlogs1,\n  ...seoBlogs2,\n  ...seoBlogs3\n];\n`
  );

  fs.writeFileSync(file, content);
  console.log("Successfully merged SEO blogs.");
} else {
  console.log("Already merged.");
}
