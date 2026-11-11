// Builds the demo pages from demo/body.html:
//   demo/index.html          – standalone page, loads ../dist/sony-pvm.js
//   demo/pvm-9042qm-demo.html – single file with the bundle inlined
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const body = fs.readFileSync(path.join(root, 'demo/body.html'), 'utf8');
const bundle = fs.readFileSync(path.join(root, 'dist/sony-pvm.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const marker = '<script type="module">\n/*__BUNDLE__*/\n</script>';
if (!body.includes(marker)) throw new Error('bundle marker missing');
fs.writeFileSync(path.join(root, 'demo/pvm-9042qm-demo.html'), body.replace(marker, () => `<script type="module">\n${bundle}\n</script>`));
fs.writeFileSync(path.join(root, 'demo/index.html'),
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body style="margin:0">\n${body.replace(marker, '<script type="module" src="../dist/sony-pvm.js"></script>')}\n</body>\n</html>\n`);
console.log('demo built');
