const fs = require('fs');
const path = require('path');

let navbarContent = `<!-- Logo -->
[![](https://docsify.js.org/_media/icon.svg)](/)

<!-- Title -->
Golang Doc\n\n`

function walkDir(dir, baseDir = '', currentLevel = 0) {
    const files = fs.readdirSync(dir);
    let content = '';

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subDirContent = walkDir(filePath, path.join(baseDir, file), currentLevel + 1);
            if (subDirContent) {
                const dirName = file;
                content += `${'  '.repeat(currentLevel)}* ${dirName}\n${subDirContent}`;
            }
        } else if (path.extname(file) === '.md') {
            const relativePath = encodeURIComponent(path.join(baseDir, file).replace(/\\/g, '/'));
            const displayName = file.slice(0, -3);  // 去掉 `.md` 扩展名
            content += `${'  '.repeat(currentLevel)}* [${displayName}](${relativePath})\n`;
        }
    });

    return content;
}

function generateNavbar(dirPath, outputFile) {
    navbarContent += walkDir(dirPath, dirPath);
    fs.writeFileSync(outputFile, navbarContent);
    console.log(`_navbar.md generated at ${outputFile}`);
}

const directoryToScan = './docs';
const outputFilePath = '_navbar.md';

generateNavbar(directoryToScan, outputFilePath);
