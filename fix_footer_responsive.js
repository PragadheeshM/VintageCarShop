const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix Footer grid at 1024px (lg)
  if (content.includes('lg:grid-cols-4 gap-10 mb-12')) {
    content = content.replace('lg:grid-cols-4 gap-10 mb-12', 'lg:grid-cols-2 xl:grid-cols-4 gap-10 mb-12');
    changed = true;
  } else if (content.includes('lg:grid-cols-4 gap-8 mb-12')) { // some might have gap-8
    content = content.replace('lg:grid-cols-4 gap-8 mb-12', 'lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12');
    changed = true;
  }

  // Double check form responsiveness
  if (content.includes('newsletter-form flex')) {
    if (!content.includes('w-full max-w-full')) {
         content = content.replace('newsletter-form flex', 'newsletter-form flex w-full max-w-full');
         changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed footer/newsletter responsiveness in: ${file}`);
  }
});
