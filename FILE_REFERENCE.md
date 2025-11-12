# File-by-File Reference Guide

Quick reference for every file in your portfolio project.

---

## 📁 Core Files (What to Edit)

### `app/page.tsx` - Homepage
**What it is**: Your portfolio's main page
**Key sections**:
- Hero section with gradient background
- Featured projects grid
- Skills section (4 categories)
- Call-to-action section

**To customize**:
- Change hero title/description
- Add/remove projects
- Update skill categories
- Change colors (use Tailwind classes)

**Edit for**: Homepage content updates

---

### `app/zameen/page.tsx` - Zameen Project Showcase
**What it is**: Full showcase of your Zameen analysis project
**Key sections**:
- Hero with project description
- Statistics cards (202 properties, 3 precincts, etc.)
- Project overview with tech stack
- 3 interactive charts
- Key findings section
- Methodology section
- Call-to-action

**To customize**:
- Update project description
- Add/remove statistics
- Update chart data (see below)
- Add more findings
- Change links (GitHub, etc.)

**Edit for**: Adding new analyses, updating data

---

### `app/about/page.tsx` - About Page
**What it is**: About you page (currently a template)
**Key sections**:
- Main heading
- Introduction paragraph
- What you do
- Technical foundation
- Why Strategy & Operations
- Current focus
- Contact section

**To customize**:
- Replace with your actual bio
- Add your story
- Update skills/technologies
- Add your contact info

**Edit for**: Telling your professional story

---

### `components/zameen/ConstructionCostChart.tsx` - Charts
**What it is**: Interactive charts for Zameen project
**Contains**:
- `ConstructionCostChart()` - Bar chart (house/plot/construction costs)
- `CostPerSqYdChart()` - Line chart (normalized costs)
- `PropertySizeChart()` - Bar chart (average property sizes)

**Data structure**:
```javascript
const constructionData = [
  {
    precinct: 'P5',
    housePrice: 50000000,
    plotPrice: 10500000,
    constructionCost: 39500000,
    costPerSqYd: 79000,
    avgSize: 500,
  },
  // ... more precincts
]
```

**To customize**:
- Update `constructionData` array with new values
- Charts automatically update
- Change colors in the `<Bar>` or `<Line>` components

**Edit for**: Adding new data, creating new charts

---

### `components/Navbar.tsx` - Navigation Bar
**What it is**: Top navigation (sticky)
**Contains**:
- Logo/brand
- Navigation links
- Mobile hamburger menu

**Navigation links** array:
```javascript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/zameen', label: 'Zameen Analysis' },
  { href: '/about', label: 'About' },
]
```

**To customize**:
- Add new links for new projects
- Change link text
- Update URLs

**Edit for**: Adding new project navigation

---

### `components/Footer.tsx` - Footer
**What it is**: Bottom of every page
**Contains**:
- About section
- Project links
- Social media links

**Social links** to update:
```javascript
<a href="https://github.com">GitHub</a>
<a href="https://linkedin.com">LinkedIn</a>
<a href="mailto:hello@example.com">Email</a>
```

**To customize**:
- Add your actual URLs
- Update contact info
- Change footer text
- Add/remove social links

**Edit for**: Adding your contact information

---

## ⚙️ Configuration Files (Usually Don't Edit)

### `tailwind.config.js` - Colors & Design System
**What it is**: Central configuration for colors, fonts, spacing

**Key customization**:
```javascript
colors: {
  primary: '#2563eb',    // Change primary blue
  secondary: '#1f2937',  // Change gray
  accent: '#f59e0b',     // Change amber
}
```

**When to edit**:
- Changing color scheme
- Adding custom fonts
- Extending spacing/sizing

**Don't edit**: Tailwind defaults (unless you know what you're doing)

---

### `next.config.js` - Next.js Configuration
**What it is**: Next.js framework settings

**Rarely changed** unless you need:
- Image optimization
- Custom webpack config
- Environment variables
- API routes

---

### `package.json` - Dependencies
**What it is**: Project dependencies and scripts

**Key section**:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

**Avoid editing** unless:
- Installing new packages
- Changing build scripts

---

### `tsconfig.json` - TypeScript Configuration
**What it is**: TypeScript compiler settings

**Don't edit** unless you're customizing TypeScript behavior

---

### `app/globals.css` - Global Styles
**What it is**: Global CSS and Tailwind directives

**Already includes**:
- Tailwind base, components, utilities
- Custom CSS components (cards, buttons)
- Gradient effects

**Edit for**: Adding custom CSS globally

---

### `.gitignore` - Git Ignore Rules
**What it is**: Files to ignore in version control

**Includes**:
- `node_modules/`
- `.next/`
- `.env` files
- Editor files (`.vscode/`, `.idea/`)

**Don't edit** unless adding new patterns to ignore

---

## 📚 Documentation Files (Reference Only)

### `README.md`
- Project overview
- Tech stack
- Getting started
- Deployment instructions
- Reference only

---

### `DESIGN.md`
- Complete design system
- Color palette explained
- Typography decisions
- Layout patterns
- Reference only

---

### `QUICK_START.md`
- Developer workflow
- How to add projects
- How to use charts
- Common tasks
- Reference guide

---

### `GETTING_STARTED.md`
- Installation steps
- Testing checklist
- Troubleshooting
- Deployment guide
- Getting started guide

---

### `PROJECT_SETUP_SUMMARY.md`
- What's been created
- Design decisions explained
- Technology stack
- Next steps
- Reference guide

---

## 🗺️ File Edit Frequency

**Edit Often** (Weekly/Monthly)
- `app/page.tsx` - Homepage content
- `app/zameen/page.tsx` - Project updates
- `components/zameen/ConstructionCostChart.tsx` - New data
- `components/Footer.tsx` - Contact updates

**Edit Sometimes** (Monthly/As Needed)
- `app/about/page.tsx` - Bio updates
- `components/Navbar.tsx` - New projects
- `tailwind.config.js` - Color changes
- `app/globals.css` - Style tweaks

**Edit Rarely** (Quarterly/Never)
- `next.config.js` - Framework config
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `.gitignore` - Git patterns

---

## 🚀 Common Editing Tasks

### Task: Add new project
1. Create folder: `app/my-project/`
2. Create page: `app/my-project/page.tsx`
3. Edit: `components/Navbar.tsx` (add link)
4. Edit: `app/page.tsx` (add to projects array)

### Task: Update colors
1. Edit: `tailwind.config.js`
2. Update: `colors` section
3. All components update automatically

### Task: Add chart
1. Create new function in: `components/zameen/ConstructionCostChart.tsx`
2. Use Recharts components
3. Import and use in: `app/zameen/page.tsx`

### Task: Update navigation
1. Edit: `components/Navbar.tsx`
2. Update `navLinks` array
3. Add new links

### Task: Update footer
1. Edit: `components/Footer.tsx`
2. Change URLs and text
3. Update footer across all pages

---

## 📊 Data Files

The portfolio uses static data (no database):

**Chart Data** - `components/zameen/ConstructionCostChart.tsx`
```javascript
const constructionData = [...]
```

**Homepage Data** - `app/page.tsx`
```javascript
const projects = [...]
const skills = [...]
```

**Navigation Data** - `components/Navbar.tsx`
```javascript
const navLinks = [...]
```

To add/update data: Edit these arrays directly

---

## 🔗 File Dependencies

```
app/layout.tsx
├── components/Navbar.tsx
├── components/Footer.tsx
└── app/globals.css

app/page.tsx (Homepage)
└── Self-contained

app/about/page.tsx
└── Self-contained

app/zameen/page.tsx
└── components/zameen/ConstructionCostChart.tsx
    └── recharts (library)
```

---

## ✅ Complete File Checklist

### Must Edit (For your portfolio)
- [ ] `components/Footer.tsx` - Add your links
- [ ] `app/about/page.tsx` - Write your story
- [ ] `components/zameen/ConstructionCostChart.tsx` - Update data

### Should Edit (Nice to have)
- [ ] `app/page.tsx` - Update hero/projects
- [ ] `tailwind.config.js` - Change colors
- [ ] `components/Navbar.tsx` - Update navigation

### Can Edit (Advanced)
- [ ] `app/globals.css` - Custom styling
- [ ] `app/layout.tsx` - Layout changes
- [ ] Create new project pages

### Don't Edit (Framework files)
- [ ] `next.config.js`
- [ ] `tsconfig.json`
- [ ] `postcss.config.js`
- [ ] `package.json`

---

## 🎯 File Size Reference

```
Small files (< 1KB):        Configuration files
Medium files (1-5KB):       Components, pages
Large files (> 5KB):        Chart components, documentation
```

---

**Know which files to edit = Quick customization!** ✨
