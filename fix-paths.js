const fs = require('fs');
const path = require('path');

function replaceInDir(dirPath, rootDir) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const item of items) {
    if (
      item.name === '.next' ||
      item.name === 'node_modules' ||
      item.name === '.git' ||
      item.name === 'package-lock.json' ||
      item.name === 'package.json' ||
      item.name === 'poly.js' ||
      item.name === 'tsconfig.json' ||
      item.name === 'mc-server'
    ) continue;

    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      replaceInDir(fullPath, rootDir);
    } else if (
      item.isFile() &&
      (item.name.endsWith('.html') || item.name.endsWith('.js') || item.name.endsWith('.json') || item.name.endsWith('.txt'))
    ) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Determine relative path to root directory
      const relDir = path.relative(rootDir, path.dirname(fullPath));
      let relPrefix = './';
      if (relDir && relDir !== '.') {
        const depth = relDir.split(path.sep).filter(Boolean).length;
        relPrefix = '../'.repeat(depth);
      }

      const targetNext = relPrefix + 'next/';

      // Replace all variants of _next or incorrect ./next/ or ./next/
      let updated = content;

      // 1. Replace ./next/ or ./next/ or ./next/
      updated = updated.replace(/\/XD-VERSE\/_next\//g, targetNext);
      updated = updated.replace(/(\.\.\/|\.\/|\/)?_next\//g, targetNext);
      
      // 2. Fix any incorrect ./next/ in root files
      if (relPrefix === './') {
        updated = updated.replace(/\.\.\/next\//g, './next/');
      }

      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf8');
      }
    }
  }
}

// Ensure .nojekyll exists in root and out
fs.writeFileSync(path.join(__dirname, '.nojekyll'), '');

// 1. Process files in out directory
const outDir = path.join(__dirname, 'out');
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
  const outNext = path.join(outDir, '_next');
  const outTargetNext = path.join(outDir, 'next');
  if (fs.existsSync(outNext)) {
    if (fs.existsSync(outTargetNext)) fs.rmSync(outTargetNext, { recursive: true, force: true });
    fs.renameSync(outNext, outTargetNext);
  }
  replaceInDir(outDir, outDir);

  // 2. Copy out contents to root
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

// 3. Process root directory files
replaceInDir(__dirname, __dirname);

console.log('Post-build path transformation completed successfully!');
