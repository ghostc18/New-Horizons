# GitHub Pages Deployment Guide

## 🚀 Quick Start

This guide will help you deploy your New Horizons website to GitHub Pages.

## 📁 Current Project Structure

Your project files are in:
```
/mnt/c/Users/Isaia/OneDrive/Documents/GitHub/New Horizons/
├── index.html                    # Main website (needs update)
├── js/
│   ├── leads.js                 # EmailJS form handler (updated)
│   └── utils.js                  # Utility functions
├── src/
│   ├── css/
│   │   ├── base.css             # Foundation styles
│   │   ├── mobile-first.css     # Responsive design (4 breakpoints)
│   │   └── styles.css           # Components & utilities
│   └── js/                       # Source JavaScript
└── package.json                 # Build tools
└── vite.config.js               # Build configuration
└── postcss.config.js            # CSS optimization
```

## 🛠️ Prerequisites

1. **GitHub Account** - Create one at [github.com](https://github.com)
2. **GitHub Pages Repository** - Must be a public repo
3. **EmailJS Account** - At [emailjs.com](https://www.emailjs.com)

## 📋 Step-by-Step Deployment

### Step 1: Create GitHub Pages Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Repository name: `username.github.io` or `username.github.io/new-horizons`
4. Public: ✅ Yes
5. Initialize with README: ✅ No
6. Create from template: ❌ No

### Step 2: Deploy Your Files

**Option A: Clone Your Local Repository**

```bash
# Clone from your local GitHub directory
cd ~/Documents/GitHub

# If New Horizons repo is separate, clone it
# git clone https://github.com/username/NewHorizons.git
# cd NewHorizons

# Push existing files to the new GitHub repo
git add .
git commit -m "Initial deployment via GitHub Pages"
git remote add origin https://github.com/username/NewHorizons.git
git push -u origin master
```

**Option B: Copy Files Directly**

1. In your local folder, create a `dist/` folder:
```bash
cd "/mnt/c/Users/Isaia/OneDrive/Documents/GitHub/New Horizons"
mkdir -p dist
```

2. Copy your production files:
```bash
# Copy the essential files to dist/
cp index.html dist/
cp -r js/ dist/
cp -r images/ dist/
cp -r css/ dist/  # If you have static CSS
```

### Step 3: Configure GitHub Pages

1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Source: "Deploy from a branch"
4. Branch: `master` (or `gh-pages`)
5. Folder: `/root` (or `/dist` if you used Option B)
6. Click "Save"

### Step 4: Update EmailJS Configuration

**Important**: Before deploying, you need to configure EmailJS:

1. Go to [emailjs.com](https://www.emailjs.com)
2. Get your actual template IDs
3. Update `js/leads.js`:
```javascript
const EMAILJS_CONFIG = {
    serviceId: "service_xgvc5pa",
    templateId: "YOUR_ACTUAL_TEMPLATE_ID_HERE",  // ⚠️ UPDATE THIS
    publicKey: "EisHia78uRV6zncJE",
    senderEmail: "isaiahjrod5@gmail.com"
};
```

### Step 5: Test Your Deployment

1. Visit your GitHub Pages URL (usually `https://username.github.io`)
2. Check the website loads correctly
3. Test the contact form
4. Verify EmailJS functionality
5. Test mobile responsiveness

## 📁 Required Files for GitHub Pages

### Essential Files:
- `index.html` - Main website
- `js/leads.js` - EmailJS integration (updated)
- `images/` - Images directory

### Recommended Files:
- `css/` - CSS stylesheets (if you want inline styles)
- `README.md` - Project documentation

## 🔧 GitHub Pages Branch Strategy

### Option 1: Deploy from `master`
- Best for most projects
- Auto-build when you push to master

### Option 2: Deploy from `gh-pages`
- Separate branch for GitHub Pages
- More control over static hosting

## 🛠️ Build Process for GitHub Pages

### If Using Static Deployment (Simplest):
```bash
# Build static HTML
npm run build  # Creates dist/ folder

# Copy to GitHub Pages repo
# (Or use gh-pages npm package)
npm install gh-pages --save-dev

# Update package.json scripts
"scripts": {
    "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### If Using GitHub Actions:

Create `.github/workflows/github-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build project
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📱 Mobile Testing

After deployment, test your site:

1. **Desktop**: `https://username.github.io`
2. **Mobile**: Use browser DevTools:
   - F12 → Ctrl+Shift+M (Chrome)
   - Select device emulator
   - Test 320px, 768px, 1024px

## 🔧 Troubleshooting

### Common Issues:

**1. GitHub Pages not loading**
```
# Check if index.html exists
ls dist/
```

**2. Form not working**
```
# Check if leads.js is deployed
ls dist/js/leads.js
```

**3. SSL Certificate issues**
```
# GitHub Pages should auto-obtain SSL
# Visit https://yourusername.github.io
```

### Error Messages:

- "GitHub Pages can only be deployed from the master branch"
  → Push your changes to master branch

- "Your repository does not have a default branch"
  → Make sure your default branch is master

## 🧪 Testing Your Deployment

### Test Form Functionality:
1. Open your GitHub Pages site
2. Fill out the contact form
3. Check browser console for errors
4. Check EmailJS dashboard for incoming emails
5. Verify success/error messages

### Test Mobile Responsiveness:
1. Use browser DevTools device toolbar
2. Test different screen sizes
3. Check touch targets (44px+)
4. Verify form inputs work on mobile

## ✅ Success Criteria

Your deployment is successful when:

✅ Site loads without errors
✅ All images display correctly
✅ Contact form works
✅ EmailJS receives emails
✅ Mobile responsive design works
✅ No broken links
✅ Accessibility features work

## 🚀 Final Steps

1. **Deploy to GitHub Pages**
2. **Test everything thoroughly**
3. **Fix any issues**
4. **Share the link with others**
5. **Monitor performance**

## 📞 Need Help?

For specific errors or issues:
1. Check console errors in browser
2. Review GitHub Actions logs
3. Visit [github.com](https://github.com) help pages
4. Ask for specific error details

---

**Quick Reference Commands:**

```bash
# Build locally
cd "New Horizons"
npm run build

# Deploy to GitHub Pages
npm install gh-pages --save-dev
npm run deploy

# Or manual copy
cp index.html dist/
cp -r js/ dist/
cp -r images/ dist/
```

Your website is ready for deployment! 🚀