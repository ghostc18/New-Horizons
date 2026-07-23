# HomeQuest Solutions Website

A modern, mobile-first multi-page website for HomeQuest Solutions - a cash buyer real estate service helping homeowners compare practical selling options.

## Project Status: ✅ COMPLETE

## Features Implemented
- ✅ Multi-page responsive design (Home, Options, Process, About, Contact, FAQ, Privacy, SMS Terms, Thank You)
- ✅ Contact forms for instant property valuation quotes (EmailJS + Google Sheets integration)
- ✅ Mobile-optimized for quick browsing (4 breakpoints: 320px - 2048px+)
- ✅ Clean, professional presentation of services
- ✅ Fast loading times optimized for conversions
- ✅ No login system (removed as requested)
- ✅ No property listings (removed as requested)
- ✅ Full rebrand from "New Horizons" to "HomeQuest Solutions"

## Tech Stack
- ✅ HTML5 + CSS3 with modern Flexbox/Grid
- ✅ Vanilla JavaScript for interactivity
- ✅ EmailJS for contact form submissions
- ✅ Google Apps Script for spreadsheet integration
- ✅ Vite for development/build
- ✅ PostCSS for CSS processing
- ✅ Google Fonts (Inter) for typography
- ✅ GitHub Pages deployment ready

## Website Structure
- **index.html** - Home page with hero, quick-start form, promises, options preview, process overview, trust section, full contact form
- **options.html** - Detailed comparison of all selling paths (Cash, Home Advantage, FSBO, Realtor, Keep/Delay)
- **process.html** - Four-step process with detailed breakdowns and situation guide
- **about.html** - Company story, commitments, "HomeQuest Standard" comparison
- **contact.html** - Full contact form + quick address capture
- **faq.html** - 10 commonly asked questions with straight answers
- **privacy.html** - Privacy policy with data handling details
- **sms-terms.html** - SMS consent terms and opt-out instructions
- **thank-you.html** - Post-submission confirmation page

## Key Features
- **Quick Quote Form**: Instant cash offer requests from homepage
- **Service Showcase**: Cash buyer, Home Advantage, FSBO, Realtor, Keep/Delay
- **Trust Indicators**: No commissions, fast closing, buy-as-is, no pressure
- **Mobile-First Design**: Optimized for all devices
- **Professional Branding**: Modern, clean aesthetic with HomeQuest identity

## What's Configured
1. ✅ EmailJS integration (service_xgvc5pa, template_7f7aqwc, public key configured)
2. ✅ Google Sheets webhook endpoint configured
3. ✅ Business email: isaiahjrod5@gmail.com
4. ✅ Custom domain: homequestsolutions.com (CNAME configured)
5. ✅ Phone: (555) 123-4567 (placeholder - update with real number)
6. ✅ Contact email: hello@homequestsolutions.com (placeholder - update with real email)

## Deployment
The site is configured for GitHub Pages deployment:

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
./deploy.sh
```

## Next Steps for Production
1. **Update contact information**: Replace placeholder phone (555) 123-4567 and email hello@homequestsolutions.com
2. **Verify EmailJS**: Test contact form submissions end-to-end
3. **Verify Google Sheets**: Confirm leads populate in spreadsheet
4. **Add professional photos**: Replace placeholder images in `/images/`
5. **Customize branding**: Adjust colors/fonts in CSS variables if needed
6. **Configure DNS**: Point homequestsolutions.com to GitHub Pages
7. **Test thoroughly**: Form submissions, mobile responsiveness, cross-browser

## Project Structure
```
├── index.html              # Home page
├── options.html            # Your Options page
├── process.html            # Process page
├── about.html              # About/Our Standard page
├── contact.html            # Contact page
├── faq.html                # FAQ page
├── privacy.html            # Privacy policy
├── sms-terms.html          # SMS terms
├── thank-you.html          # Thank you page
├── _layout.html            # Shared layout template
├── CNAME                   # Custom domain config
├── package.json            # NPM config
├── vite.config.js          # Vite config
├── deploy.sh               # GitHub Pages deploy script
├── js/
│   ├── leads.js            # Form handling + EmailJS + Sheets
│   └── utils.js            # Utility functions
├── css/
│   └── custom.css          # Additional custom styles
├── images/                 # Logo & hero images
└── dist/                   # Build output (generated)
```

## Development
```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Build for production
npm run build
```

## Brand Identity
- **Primary**: Forest Green (#17634f) / Dark Forest (#0f4538)
- **Accent**: Orange (#e46f2b) / Dark Orange (#b95022)
- **Background**: Paper (#fffaf3) / White (#ffffff)
- **Text**: Ink (#17251f) / Muted (#5f685f)
- **Font**: Inter (UI), Georgia (Headlines)

---

**HomeQuest Solutions** - A clearer, calmer way to compare your home selling options.