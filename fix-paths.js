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
      (item.name.endsWith('.html') || item.name.endsWith('.css') || item.name.endsWith('.js'))
    ) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Ensure paths work for relative routing on GitHub Pages subdirectory
      let updated = content
        .replace(/src="\/_next\//g, 'src="./_next/')
        .replace(/href="\/_next\//g, 'href="./_next/')
        .replace(/src="\/images\//g, 'src="./images/')
        .replace(/href="\/images\//g, 'href="./images/')
        .replace(/"\/_next\/static\//g, '"./_next/static/')
        .replace(/'\/_next\/static\//g, "'./_next/static/")
        .replace(/url\(\/\_next\//g, 'url(./_next/');

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
