# Getting Started - Installation & Testing

Complete guide to get your portfolio running locally and deployed.

---

## 🚀 Installation (5 minutes)

### Prerequisites
- Node.js 16+ installed ([download](https://nodejs.org))
- Terminal/Command line access
- Code editor (VS Code recommended)

### Step-by-Step

```bash
# 1. Navigate to portfolio folder
cd /Users/saadkhan/Documents/portfolio

# 2. Install dependencies (takes 2-3 minutes)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

You should see the homepage load with:
- Navigation bar at top
- Hero section with blue gradient
- Featured projects section
- Skills cards
- Footer

---

## ✅ Testing Checklist

### Homepage Tests

- [ ] **Navigation works**
  - Click "Home" → stays on homepage
  - Click "Zameen Analysis" → goes to /zameen
  - Click "About" → goes to /about
  - Mobile: Hamburger menu opens/closes

- [ ] **Hero section looks good**
  - Title visible
  - CTA buttons clickable
  - Text readable on mobile

- [ ] **Projects section displays**
  - Zameen project card shows
  - "Coming Soon" card shows (disabled state)
  - Cards have shadow and hover effects

- [ ] **Skills section looks clean**
  - 4 skill categories visible
  - Tags inside each category
  - Mobile: Single column on small screens

- [ ] **Footer visible**
  - Links present
  - Dark background
  - Social icons clickable

### Zameen Project Page Tests

Go to `http://localhost:3000/zameen`

- [ ] **Page loads**
  - Header with title visible
  - Stats cards show 202 properties, etc.

- [ ] **Charts render**
  - 3 charts display (Construction Cost, Cost/Sq Yd, Property Size)
  - Charts are responsive (try resizing browser)
  - Hover over chart data points for tooltips

- [ ] **Content sections visible**
  - Key Findings section (4 cards)
  - Methodology section (3 cards)
  - CTA section at bottom

- [ ] **Links work**
  - GitHub link (if present)
  - External links open in new tab

### Responsive Design Tests

Test on different screen sizes:

**Mobile (375px width)**
```bash
Press F12 → Toggle device toolbar → iPhone 12
```
- [ ] Navigation becomes hamburger menu
- [ ] Text is readable
- [ ] Single column layouts
- [ ] No horizontal scrolling

**Tablet (768px width)**
```bash
Change device to iPad
```
- [ ] 2-column grids show
- [ ] Navigation shows both mobile and desktop elements properly

**Desktop (1920px width)**
```bash
Maximize browser window
```
- [ ] Content doesn't exceed max-width (stays centered)
- [ ] Full navigation bar visible
- [ ] Multiple columns work

---

## 🔧 Making Changes

### Edit Homepage
File: `app/page.tsx`

Changes you might make:
```typescript
// Change hero title
<h1 className="...">
  Your new title here  // Change this
</h1>

// Add new project card
const projects = [
  // ... existing projects
  {
    title: 'My New Project',
    description: 'Description here',
    // ... other fields
  }
]
```

**After saving**: Browser auto-refreshes (hot reload)

### Edit Zameen Charts
File: `components/zameen/ConstructionCostChart.tsx`

Update data:
```javascript
const constructionData = [
  {
    precinct: 'P5',
    housePrice: 50000000,  // Change this
    plotPrice: 10500000,   // Or this
    // ... etc
  }
]
```

**Charts update automatically** when you save!

### Edit Colors
File: `tailwind.config.js`

```javascript
colors: {
  primary: '#2563eb',    // Change blue to different hex
  secondary: '#1f2937',  // Change gray
  accent: '#f59e0b',     // Change amber
}
```

**All components using these colors update automatically**

### Edit About Page
File: `app/about/page.tsx`

Replace template text with your story, background, etc.

---

## 🐛 Troubleshooting

### Issue: "Port 3000 is already in use"
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process (replace XXXX with PID from above)
kill -9 XXXX

# Try again
npm run dev
```

### Issue: Styles not updating
```bash
# Clear Next.js cache
rm -rf .next

# Restart server
npm run dev
```

### Issue: "Cannot find module" error
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: TypeScript errors in editor
```bash
# Check if there are real errors
npx tsc --noEmit

# If no output, it's just editor caching
# Restart your code editor
```

### Issue: Charts not displaying
- Check browser console for errors (F12 → Console)
- Ensure `recharts` is installed: `npm list recharts`
- Verify chart data is valid (no missing fields)

---

## 📦 Available npm Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Run production build locally
npm run lint     # Check code style
```

---

## 🌐 Ready to Deploy?

### Deploy to Vercel (Recommended)

**Step 1: Create GitHub Repository**
```bash
cd /Users/saadkhan/Documents/portfolio

git init
git add .
git commit -m "Initial portfolio setup"
git remote add origin https://github.com/YOUR_USERNAME/portfolio
git branch -M main
git push -u origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Find your portfolio repo
5. Click "Import"
6. Click "Deploy"

**That's it!** Your site will be live in ~1-2 minutes.

**Your URL**: `https://portfolio-YOUR_USERNAME.vercel.app`

---

## 🎯 Optimization Tips

### Before Deploying

1. **Update About page** with your info
2. **Update footer links** (GitHub, LinkedIn, email)
3. **Update Zameen data** if you have new analysis
4. **Test on mobile** (resize browser or use DevTools)
5. **Check console for errors** (F12 → Console tab)

### Performance Checks

```bash
# Build for production
npm run build

# Check build size
# You should see something like:
# ✓ Compiled successfully
# ○ Verifying types...
# • Functions...
```

If build is successful, you're good to deploy!

---

## 📚 File Reference

| File | Purpose | Edit? |
|------|---------|-------|
| `app/page.tsx` | Homepage | ✅ Edit content |
| `app/zameen/page.tsx` | Zameen project | ✅ Edit content/links |
| `app/about/page.tsx` | About page | ✅ Edit with your info |
| `components/Navbar.tsx` | Navigation | ✅ Add projects |
| `components/Footer.tsx` | Footer | ✅ Add links |
| `components/zameen/ConstructionCostChart.tsx` | Charts | ✅ Update data |
| `tailwind.config.js` | Colors/theme | ✅ Customize |
| `next.config.js` | Next.js settings | ⚠️ Only if needed |
| `package.json` | Dependencies | ⚠️ Careful editing |
| `app/globals.css` | Global styles | ⚠️ Only if needed |

---

## 🎓 Learning Resources (If Needed)

- **Next.js Basics**: https://nextjs.org/learn/foundations/about-nextjs
- **Tailwind CSS**: https://tailwindcss.com/docs/installation
- **React Fundamentals**: https://react.dev/learn
- **Recharts Tutorial**: https://recharts.org/en-US/guide/getting-started

---

## ✨ Quick Wins (Easy Customizations)

Do these first (each takes 5 minutes):

- [ ] Update your name in Navbar
- [ ] Change hero title to something personal
- [ ] Update social links in Footer
- [ ] Add your about section
- [ ] Change primary color to your preference

Then:

- [ ] Update Zameen data with latest analysis
- [ ] Add more projects to home page
- [ ] Deploy to Vercel
- [ ] Share the URL

---

## 🚀 Common Next Steps

After you get it running locally:

1. **Deploy to Vercel** (20 minutes)
   - Push to GitHub
   - Connect to Vercel
   - Share live URL

2. **Add more projects** (varies)
   - Create new folder in `app/`
   - Add project page
   - Update navigation

3. **Iterate based on feedback** (ongoing)
   - Get feedback from mentors
   - Adjust design/colors
   - Highlight achievements

4. **Share everywhere** (5 minutes)
   - LinkedIn profile
   - Resume/CV
   - Job applications
   - GitHub profile

---

## ❓ Need Help?

**Getting started issues?**
- Check terminal output for error messages
- Look in the `Troubleshooting` section above
- Verify Node.js is installed: `node --version`

**Design questions?**
- See `DESIGN.md` for complete design system
- See `QUICK_START.md` for examples

**Code questions?**
- Check comments in files
- Look at similar examples in the codebase
- Refer to technology docs above

---

## ✅ Success Checklist

You're ready to go when:

- [x] Portfolio folder exists at `/Users/saadkhan/Documents/portfolio`
- [x] `npm install` completed without errors
- [x] `npm run dev` starts server on port 3000
- [x] Homepage loads at `http://localhost:3000`
- [x] Charts display on `/zameen` page
- [x] Navigation works between pages
- [x] Responsive design works on mobile

**Congratulations! Your portfolio is ready.** 🎉

---

## 🎬 Next Session

When you're ready to:
- Add new projects → See `QUICK_START.md`
- Update colors → Edit `tailwind.config.js`
- Deploy → Follow "Deploy to Vercel" section
- Add charts → Follow `components/zameen/ConstructionCostChart.tsx` pattern

---

**Built with Next.js + Tailwind + Recharts. Ready to ship.** 🚀
