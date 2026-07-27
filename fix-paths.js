const fs = require('fs');
const path = require('path');

function replaceInDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      replaceInDir(fullPath);
    } else if (item.isFile() && (item.name.endsWith('.html') || item.name.endsWith('.js') || item.name.endsWith('.json') || item.name.endsWith('.txt'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('_next') || content.includes('../next')) {
        content = content.replace(/\/XD-VERSE\/_next\//g, './next/');
        content = content.replace(/\/_next\//g, './next/');
        content = content.replace(/\.\.\/next\//g, './next/');
        content = content.replace(/_next\//g, 'next/');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

// 1. Process files in out directory
if (fs.existsSync(path.join(__dirname, 'out'))) {
  const outNext = path.join(__dirname, 'out', '_next');
  const outTargetNext = path.join(__dirname, 'out', 'next');
  if (fs.existsSync(outNext)) {
    if (fs.existsSync(outTargetNext)) fs.rmSync(outTargetNext, { recursive: true, force: true });
    fs.renameSync(outNext, outTargetNext);
  }
  replaceInDir(path.join(__dirname, 'out'));
}

// 2. Copy out to root
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  const items = fs.readdirSync(outDir);
  for (const item of items) {
    const src = path.join(outDir, item);
    const dest = path.join(__dirname, item);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.cpSync(src, dest, { recursive: true });
  }
}

// 3. Extra pass on root index.html to guarantee ./next/
replaceInDir(__dirname);

console.log('Post-build path transformation completed successfully!');
