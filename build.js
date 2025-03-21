const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process'); // Import child_process
const nunjucks = require('nunjucks');

// Configure Nunjucks to use the current directory
nunjucks.configure('.', { autoescape: false });

const pagesDir = 'pages';
const distDir = 'docs';
const assetDirs = ['img', 'js', 'css']; // Directories to copy

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Function to compile Tailwind CSS
function compileTailwind() {
    console.log('Compiling Tailwind CSS...');
    const result = spawnSync('npx', [
        'tailwindcss',
        '-i', 'css/styles.css', // Input file
        '-o', 'css/styles2.css', // Output file
        '--minify' // Minify the output CSS
    ], { stdio: 'inherit' });

    if (result.error) {
        console.error('Error compiling Tailwind:', result.error);
        process.exit(1);
    }
    console.log('Tailwind CSS compiled successfully!');
}

// Compile Tailwind before copying assets
compileTailwind();

// Process HTML pages
const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.njk'));

pages.forEach(page => {
    const content = fs.readFileSync(`${pagesDir}/${page}`, 'utf8');

    // Extract front matter (if present)
    const [_, frontMatter, body] = content.match(/---\n(.*?)\n---\n([\s\S]*)/s) || [null, '', content];

    const context = frontMatter
        ? Object.fromEntries(frontMatter.split('\n').map(line => line.split(': ').map(s => s.trim())))
        : {};

    context.content = nunjucks.renderString(body, context); // Allow includes inside pages

    const output = nunjucks.render('templates/base.html', context);
    fs.writeFileSync(`${distDir}/${page.replace('.njk', '.html')}`, output);
    console.log(`Generated: ${distDir}/${page.replace('.njk', '.html')}`);
});

// Function to copy directories
function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) return; // Skip if the source directory doesn't exist
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath); // Recursively copy subdirectories
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Copy asset directories (including compiled CSS)
assetDirs.forEach(dir => {
    copyDirectory(dir, path.join(distDir, dir));
    console.log(`Copied: ${dir} -> ${distDir}/${dir}`);
});

console.log('Build complete!');