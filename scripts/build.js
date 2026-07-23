#!/usr/bin/env node

// Build script for HomeQuest Solutions multi-page site
// Copies all HTML files and assets to dist/ for GitHub Pages deployment

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = __dirname.replace('/scripts', '');
const DIST_DIR = path.join(SOURCE_DIR, 'dist');

const FILES_TO_COPY = [
    // HTML pages
    'index.html',
    'about.html',
    'options.html',
    'process.html',
    'contact.html',
    'faq.html',
    'privacy.html',
    'sms-terms.html',
    'thank-you.html',
    
    // Config files
    'CNAME',
    
    // JS files
    'js/leads.js',
    'js/utils.js',
];

const DIRS_TO_COPY = [
    'images',
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
}

function copyFile(src, dest) {
    try {
        ensureDir(path.dirname(dest));
        fs.copyFileSync(src, dest);
        console.log(`Copied: ${path.relative(SOURCE_DIR, src)} -> ${path.relative(DIST_DIR, dest)}`);
    } catch (err) {
        console.error(`Error copying ${src}:`, err.message);
    }
}

function copyDir(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`Source directory not found: ${src}`);
        return;
    }
    
    ensureDir(dest);
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            copyFile(srcPath, destPath);
        }
    }
}

function main() {
    console.log('🏗️  Building HomeQuest Solutions website...\n');
    
    // Clean dist directory
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true });
        console.log('Cleaned previous build');
    }
    
    ensureDir(DIST_DIR);
    
    // Copy individual files
    console.log('\n📄 Copying HTML pages...');
    for (const file of FILES_TO_COPY) {
        const src = path.join(SOURCE_DIR, file);
        const dest = path.join(DIST_DIR, file);
        copyFile(src, dest);
    }
    
    // Copy directories
    console.log('\n📁 Copying asset directories...');
    for (const dir of DIRS_TO_COPY) {
        const src = path.join(SOURCE_DIR, dir);
        const dest = path.join(DIST_DIR, dir);
        copyDir(src, dest);
    }
    
    // Verify build
    console.log('\n✅ Verifying build...');
    const distFiles = [];
    function walk(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else {
                distFiles.push(path.relative(DIST_DIR, fullPath));
            }
        }
    }
    walk(DIST_DIR);
    
    console.log(`\n📦 Build complete! ${distFiles.length} files in dist/`);
    console.log('\n📋 Files:');
    distFiles.sort().forEach(f => console.log(`   ${f}`));
    
    console.log('\n🚀 Ready for deployment!');
    console.log('   Run: ./deploy.sh');
}

main();