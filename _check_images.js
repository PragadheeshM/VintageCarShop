const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let urls = new Set();
let fileMapping = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[a-zA-Z0-9\=\&]+/g);
  if (matches) {
    matches.forEach(url => {
      urls.add(url);
      if (!fileMapping[url]) fileMapping[url] = [];
      fileMapping[url].push(file);
    });
  }
});

console.log(`Found ${urls.size} unique Unsplash URLs. Checking which are broken...`);

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 400) {
        resolve({url, status: res.statusCode, broken: true});
      } else {
        resolve({url, status: res.statusCode, broken: false});
      }
    }).on('error', (e) => {
      resolve({url, status: 'Error', broken: true});
    });
  });
};

async function run() {
  const brokenUrls = [];
  for (const url of urls) {
    const res = await checkUrl(url);
    if (res.broken) {
      console.log(`❌ Broken: ${res.status} -> ${url}`);
      brokenUrls.push(url);
    } else {
      console.log(`✅ OK: ${url.substring(0, 60)}...`);
    }
  }
  
  console.log(`\nFound ${brokenUrls.length} broken URLs.`);
  
  // Working replacements (classic cars, mechanics, workshops)
  const replacements = [
    'https://images.unsplash.com/photo-1563720225132-faae862f9011?q=80', // Classic car
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80', // Classic car (known good)
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80', // Car interior/steering
    'https://images.unsplash.com/photo-1471344840450-424aebd8ea03?q=80', // Mechanic
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80'  // Red classic
  ];
  
  if (brokenUrls.length > 0) {
    console.log('Replacing broken URLs with known working ones...');
    let count = 0;
    
    htmlFiles.forEach(file => {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      brokenUrls.forEach((brokenUrl, idx) => {
        if (content.includes(brokenUrl)) {
          // Keep the original query params like ?w=100&... by extracting the base known good ID
          const safeBase = replacements[idx % replacements.length].split('?')[0];
          const queryParams = brokenUrl.includes('?') ? '?' + brokenUrl.split('?')[1] : '?fit=crop';
          const newUrl = safeBase + queryParams;
          
          content = content.replace(new RegExp(brokenUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
          modified = true;
          count++;
        }
      });
      
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    });
    console.log(`Replaced ${count} occurrences.`);
  }
}

run();
