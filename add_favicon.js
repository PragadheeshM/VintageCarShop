const fs = require('fs');
const path = require('path');
const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const faviconText = '  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\'%3E%3Cpath fill=\'%23c8a951\' d=\'M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z\'/%3E%3C/svg%3E" type="image/svg+xml">';

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  if (!content.includes('rel="icon"')) {
    content = content.replace('</head>', faviconText + '\n</head>');
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    count++;
  }
});
console.log('Added favicon to ' + count + ' files.');
