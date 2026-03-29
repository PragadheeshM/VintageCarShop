const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !['login.html','register.html','user-dashboard.html','admin-dashboard.html','404.html','coming-soon.html'].includes(f));

const newDesktopNav = `<div class="hidden lg:flex items-center gap-8 desktop-nav">
        <div class="nav-dropdown"><a href="#" class="nav-link flex items-center gap-1">Home <i class="fa-solid fa-chevron-down text-xs"></i></a><div class="nav-dropdown-menu"><a href="index.html"><i class="fa-solid fa-home mr-2"></i>Homepage 1</a><a href="index2.html"><i class="fa-solid fa-layer-group mr-2"></i>Homepage 2</a></div></div>
        <a href="about.html" class="nav-link">About</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="pricing.html" class="nav-link">Pricing</a>
        <div class="nav-dropdown"><a href="#" class="nav-link flex items-center gap-1">Blog <i class="fa-solid fa-chevron-down text-xs"></i></a><div class="nav-dropdown-menu"><a href="blog.html"><i class="fa-solid fa-newspaper mr-2"></i>Blog Listing</a><a href="blog-details.html"><i class="fa-solid fa-file-lines mr-2"></i>Blog Details</a></div></div>
        <div class="nav-dropdown"><a href="#" class="nav-link flex items-center gap-1">Dashboard <i class="fa-solid fa-chevron-down text-xs"></i></a><div class="nav-dropdown-menu"><a href="user-dashboard.html"><i class="fa-solid fa-gauge mr-2"></i>User Dashboard</a><a href="admin-dashboard.html"><i class="fa-solid fa-shield mr-2"></i>Admin Dashboard</a></div></div>
        <a href="contact.html" class="nav-link">Contact</a>
      </div>`;

const newMobileMenu = `<div id="mobile-menu" class="mobile-menu lg:hidden">
      <a href="#" class="mobile-dropdown-toggle">Home <i class="fa-solid fa-chevron-down text-xs ml-1"></i></a>
      <div class="mobile-submenu"><a href="index.html">Homepage 1</a><a href="index2.html">Homepage 2</a></div>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="pricing.html">Pricing</a>
      <a href="#" class="mobile-dropdown-toggle">Blog <i class="fa-solid fa-chevron-down text-xs ml-1"></i></a>
      <div class="mobile-submenu"><a href="blog.html">Blog Listing</a><a href="blog-details.html">Blog Details</a></div>
      <a href="#" class="mobile-dropdown-toggle">Dashboard <i class="fa-solid fa-chevron-down text-xs ml-1"></i></a>
      <div class="mobile-submenu"><a href="user-dashboard.html">User Dashboard</a><a href="admin-dashboard.html">Admin Dashboard</a></div>
      <a href="contact.html">Contact</a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    </div>`;

let updated = 0;
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace desktop nav - match from desktop-nav div opening to its closing
  // Pattern: <div class="hidden lg:flex items-center gap-8 desktop-nav"> ... </div> (can span multiple lines)
  const desktopNavRegex = /<div class="hidden lg:flex items-center gap-8 desktop-nav">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*(?=\s*<\/div>)/;
  
  // Simpler approach: find the desktop-nav opening and replace until we find the matching close
  // Let's use a different strategy - find by unique markers
  
  // Strategy: replace everything between "desktop-nav">" and the right-actions div
  const desktopStart = content.indexOf('desktop-nav');
  if (desktopStart !== -1) {
    // Find the start of the div containing desktop-nav
    let divStart = content.lastIndexOf('<div', desktopStart);
    // Find the end - look for the right actions div or hamburger
    // The desktop nav div ends before the "Right actions" or "flex items-center gap-3" div
    const rightActionsMarkers = ['<!-- Right actions -->', '<div class="flex items-center gap-3">'];
    let divEnd = -1;
    for (const marker of rightActionsMarkers) {
      const idx = content.indexOf(marker, desktopStart);
      if (idx !== -1 && (divEnd === -1 || idx < divEnd)) {
        divEnd = idx;
      }
    }
    
    if (divEnd !== -1) {
      // We need to find where the desktop-nav div actually closes before the right actions
      // Find the last </div> before divEnd after desktopStart
      let searchArea = content.substring(divStart, divEnd);
      // Count the divs to find the proper closing
      // Actually, let's just replace the whole section
      content = content.substring(0, divStart) + newDesktopNav + '\n      ' + content.substring(divEnd);
    }
  }

  // Replace mobile menu
  const mobileStart = content.indexOf('<div id="mobile-menu"');
  if (mobileStart !== -1) {
    // Find the closing </div> for mobile menu
    // The mobile menu ends with </div> followed by </nav>
    let depth = 0;
    let mobileEnd = mobileStart;
    let inTag = false;
    for (let i = mobileStart; i < content.length; i++) {
      if (content[i] === '<') {
        inTag = true;
        if (content.substring(i, i + 4) === '<div') {
          depth++;
        } else if (content.substring(i, i + 6) === '</div>') {
          depth--;
          if (depth === 0) {
            mobileEnd = i + 6;
            break;
          }
        }
      }
    }
    
    if (mobileEnd > mobileStart) {
      content = content.substring(0, mobileStart) + newMobileMenu + content.substring(mobileEnd);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log(`Updated: ${file}`);
});

console.log(`\nDone! Updated ${updated} files.`);
