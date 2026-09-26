const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove specific playfair classes
    content = content.replace(/font-\[family-name:--font-playfair\] italic/g, '');
    content = content.replace(/font-\[family-name:--font-playfair\]/g, '');
    
    // Clean up any double spaces in classNames
    content = content.replace(/className=" /g, 'className="');
    content = content.replace(/ "/g, '"');
    content = content.replace(/  +/g, ' ');
    
    if (original !== content) {
      fs.writeFileSync(filePath, content);
      console.log('Updated', filePath);
    }
  }
});
