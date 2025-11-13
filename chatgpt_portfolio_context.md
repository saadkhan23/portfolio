# Portfolio Project - AI Context Document

## 1. What the Project Does

**Saad Khan's Project Portfolio** is a modern, interactive web application that showcases data engineering, analysis, and strategy projects. It serves as a living portfolio, resume, and project gallery that can be deployed to the web via Vercel.

The portfolio includes interactive visualizations of two major projects:
1. **Zameen Real Estate Analysis** - Pakistani real estate market insights with construction cost analysis
2. **Manchester United Performance Analysis** - Premier League statistical breakdown of Man Utd's decline since 2013

It also showcases personal athletic achievements (triathlon races, cycling events).

**Live/Planned Deployment:** Vercel (one-click deployment configured)

---

## 2. Architecture

### Overall Structure
```
portfolio/
├── app/                    # Next.js App Router (React components, pages)
├── components/             # Reusable React components
├── public/                 # Static assets and data
├── Configuration           # TypeScript, Tailwind, PostCSS configs
└── Documentation           # Guides and references
```

### Directory Details

#### `/app` - Page Components
- **`page.tsx` (264 lines)** - Homepage
  - Hero section with gradient background
  - Featured projects grid (links to sub-projects)
  - Skills section (4 categories: Data Engineering, Analysis, Strategy, etc.)
  - Call-to-action sections
  
- **`layout.tsx`** - Root layout
  - Wraps all pages with Navbar and Footer
  - Global metadata setup
  
- **`globals.css`** - Global styles
  - Tailwind directives (@tailwind base, components, utilities)
  - Custom CSS components (.card, .button, etc.)
  - Gradient effects
  
- **`about/page.tsx`** - About page (template)
  - Personal bio and story
  - Professional background
  - Skills and technologies
  - Contact section
  
- **`zameen/page.tsx`** - Zameen project showcase
  - Hero description of real estate analysis
  - 3 statistics cards (202 properties, 3 precincts, key findings)
  - Project overview with methodology
  - 3 interactive charts (construction cost, cost per sq yd, property size)
  - Key findings section
  - Call-to-action with GitHub link
  
- **`manutd/page.tsx`** - Man Utd project showcase
  - Analysis of Man Utd's decline since Ferguson
  - Performance comparison vs rivals
  - Manager statistics
  - Tactical breakdown
  - Interactive scatter plots and timelines
  
- **`zameen-visualization-demo/page.tsx`** - Demo page for chart variations
  
- **`races/` subdirectory** - Personal achievement pages
  - `ironman-70-3-victoria/page.tsx`
  - `canada-day-2km-swim/page.tsx`
  - `whistler-granfondo-2024/page.tsx`

#### `/components` - Reusable Components
- **`Navbar.tsx` (~80 lines)**
  - Sticky navigation bar
  - Responsive hamburger menu for mobile
  - Links to all major pages
  - Logo/brand
  
- **`Footer.tsx` (~50 lines)**
  - Copyright and about section
  - Project links
  - Social media links (GitHub, LinkedIn, Email)
  - Appears on all pages
  
- **`zameen/ConstructionCostChart.tsx` (115 lines)**
  - 3 interactive Recharts components:
    - `ConstructionCostChart()` - Grouped bar chart (house price, plot price, construction cost)
    - `CostPerSqYdChart()` - Line chart (normalized cost per square yard)
    - `PropertySizeChart()` - Bar chart (average property sizes by precinct)
  - Data structure: Array of objects with precinct info
  - Colors: Blue, green, orange (Tailwind colors)
  - Responsive: works on mobile/tablet/desktop
  
- **`zameen/PrecinctVisualizationOptions.tsx`** - Chart selector component
  
- **`zameen/PrecinctComparison.tsx`** - Comparison view component
  
- **`manutd/AttackingEdgeScatter.tsx`** - Scatter plot for attacking analysis
  
- **`manutd/PerformanceVsExpectedScatter.tsx`** - Performance vs expected plot
  
- **`manutd/ManUtdTimeline.tsx`** - Timeline of manager performance

#### `/public` - Static Assets
- **`data/attacking_analysis.json` (29 KB)**
  - Pre-computed chart data for Man Utd analysis
  - JSON structure for attacking performance metrics
  - Used by `/public` page components

### Data Flow
```
User navigates to portfolio
  ↓
Next.js router matches URL to page component
  ↓
Page component (e.g., app/zameen/page.tsx) renders
  ↓
  ├→ Navbar component
  ├→ Main content with static data arrays
  │   ├→ Import ConstructionCostChart component
  │   ├→ Pass data prop (constructionData array)
  │   └→ Chart renders with Recharts
  ├→ Footer component
  └→ Tailwind CSS styles applied
  ↓
HTML sent to browser
  ↓
Browser renders interactive charts (Recharts)
```

### Component Dependencies
```
app/layout.tsx
├── components/Navbar.tsx
├── components/Footer.tsx
├── app/globals.css
└── tailwind styles

app/page.tsx (Homepage)
├── Self-contained

app/zameen/page.tsx
├── components/zameen/ConstructionCostChart.tsx
│   └── recharts library
├── components/zameen/PrecinctVisualizationOptions.tsx
└── recharts library

app/manutd/page.tsx
├── components/manutd/AttackingEdgeScatter.tsx
│   └── recharts library
├── components/manutd/PerformanceVsExpectedScatter.tsx
│   └── recharts library
└── components/manutd/ManUtdTimeline.tsx
    └── recharts library
```

---

## 3. Known Issues / Limitations

- **Static data only**: All data is hardcoded (arrays/JSON in `/public/data/`) or embedded in components. No backend APIs or dynamic fetching.
- **Zameen & ManUtd pages**: Display manually prepared demo data. They do NOT call or execute the Python analysis projects directly.
- **No backend layer**: This is a pure frontend/Next.js site. All data loads at build time or from static files.
- **No authentication or CMS**: Content changes require code edits and redeployment. No admin panel.
- **No automated testing or analytics**: Jest/Vitest and analytics services not configured yet.

### Data Integration with Analysis Projects

- **This portfolio is decoupled** from the Zameen and ManUtd Python analysis projects.
- Data displayed comes from **manually exported JSON or summary data** produced by the separate Python projects.
- **Long-term option**: Export clean JSON datasets from those Python projects and have the portfolio fetch them from static hosting or simple APIs, but keep heavy computation out of the frontend.

---

## 4. Tech Stack

### Framework & Language
- **Next.js 14.0.0** - React framework with Server-Side Rendering (SSR) and Static Site Generation (SSG)
- **React 18.2.0** - UI library
- **TypeScript 5.3.0** - Static typing

### Styling
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
  - Configured in `tailwind.config.js`
  - Color scheme: primary blue, secondary gray, accent amber
  - Responsive design (mobile-first)
  
- **PostCSS 8.4.31** - CSS processor
- **Autoprefixer 10.4.16** - Adds vendor prefixes

### Data Visualization
- **Recharts 2.10.0** - React charting library
  - Bar charts (BarChart)
  - Line charts (LineChart)
  - Scatter plots (ScatterChart)
  - Custom tooltips and legends
  - Responsive containers

### Icons & Assets
- **React Icons 4.12.0** - Icon library (for navbar, footer, etc.)

### Build & Development
- **Next.js CLI** - `npm run dev`, `npm run build`, `npm start`
- **Webpack** - Bundler (configured by Next.js)
- **TypeScript Compiler** - tsc (type checking)

### Deployment
- **Vercel** - Hosting platform (configured and ready)
  - One-click deployment from GitHub
  - Automatic builds on push
  - Serverless functions if needed in future

### Package Manager
- **npm** - JavaScript package manager

---

## 5. Data Status

### Current Data
- **Static JSON in `/public/data/`**
  - `attacking_analysis.json` (29 KB) - Man Utd attacking stats
  - No database or backend data layer
  
- **Hardcoded Data Arrays**
  - Chart data embedded in component files
  - Example: `constructionData` array in `ConstructionCostChart.tsx`
  - Example: `projects` array in `app/page.tsx`
  - Example: `skills` array in `app/page.tsx`

### Data Structure Examples

#### Chart Data (Zameen)
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
  // More precincts...
]
```

#### Project Listing
```javascript
const projects = [
  {
    title: 'Zameen Analysis',
    description: '...',
    link: '/zameen',
  },
  // More projects...
]
```

### Data Issues & Limitations
- **Not Real-time** - Data is manually updated, not refreshed from sources
- **Hardcoded Values** - Need to edit files to update charts
- **No Database** - All data in memory/static files (fine for portfolio)

### Recommended Data Enhancement
- Consider connecting to actual data sources (Zameen API, FBRef API, etc.)
- Or auto-generate data from `/zameen` and `/manutd_sucks_project` analyses
- Or use serverless functions to compute/fetch data

---

## 6. Pending Tasks / Backlog

### High Priority
- [ ] Write complete `app/about/page.tsx` with your actual bio
- [ ] Update `components/Footer.tsx` with actual social links (LinkedIn, GitHub, Email)
- [ ] Update contact information throughout
- [ ] Deploy to Vercel (configured, just needs GitHub repo)

### Medium Priority
- [ ] Add dark mode toggle (Tailwind supports this)
- [ ] Implement contact form (verify email, reCAPTCHA)
- [ ] Add more project pages to showcase
- [ ] Update `/zameen` page with latest data
- [ ] Update `/manutd` page with latest analysis

### Nice to Have
- [ ] Blog section for project write-ups
- [ ] Search functionality across projects
- [ ] Project filtering/sorting
- [ ] Comments/feedback system
- [ ] Analytics (Google Analytics, Vercel Analytics)
- [ ] RSS feed

### Technical Debt
- [ ] Extract chart data to separate JSON files (cleaner)
- [ ] Create custom hooks for data fetching
- [ ] Add form validation library (React Hook Form)
- [ ] Add testing framework (Jest, React Testing Library)
- [ ] Add linting rules (ESLint)
- [ ] Consider API routes for dynamic data

---

## 7. Design Principles

### Color Scheme
- **Primary Blue:** `#2563eb` (trustworthy, professional)
- **Secondary Gray:** `#1f2937` (clean backgrounds)
- **Accent Amber:** `#f59e0b` (CTAs, highlights)
- Defined in `tailwind.config.js`

### Typography
- **Font Family:** Inter (sans-serif, modern)
- **Heading Sizes:** 5xl → 2xl (hero to subsections)
- **Body Text:** Slate gray on light backgrounds
- **Accents:** Smaller muted text for secondary info

### Layout & Spacing
- **Max Width:** 6xl (1152px) for content
- **Spacing Units:** 16px (4), 24px (6), 32px (8) - Tailwind default
- **Cards:** Subtle shadows with hover effects
- **Responsive:** Mobile-first design

### Component Patterns
- **Navbar:** Sticky, responsive hamburger menu
- **Footer:** Consistent across all pages
- **Cards:** Reusable card layout with shadows
- **Buttons:** Tailwind button styling (primary, secondary, outline)

### Code Organization
- **Pages:** One page per feature in `/app`
- **Components:** Reusable components in `/components`
- **Styles:** Tailwind utilities (no CSS-in-JS)
- **Naming:** PascalCase for components, kebab-case for files

### Content Guidelines
- **Professional tone** for project descriptions
- **Data-driven insights** in project summaries
- **Clear call-to-action** buttons
- **Mobile-friendly** copy (shorter paragraphs)
- **Accessibility** - semantic HTML, alt text, ARIA labels

---

## 8. Questions for AI Helper

### Content & Strategy
1. **How should I structure the "About" page?**
   - What professional background to highlight?
   - How to transition between data engineer / analyst / strategist roles?

2. **What additional projects should be showcased?**
   - Any other analysis projects worth adding?
   - Should I create case studies or just links?

3. **Contact strategy?**
   - Should contact form email to Gmail or use a service (Formspree, etc.)?
   - How to prevent spam?

### Technical
4. **Should I add a backend/API?**
   - Currently all static - good for portfolio?
   - When would dynamic data be necessary?

5. **Database or Headless CMS?**
   - Should projects/skills be stored in a database?
   - Or keep them hardcoded?

6. **Authentication needed?**
   - Admin panel to edit portfolio content?
   - Or always manual file updates?

### Growth
7. **Blog implementation?**
   - Use Next.js static generation?
   - Markdown files + remark/rehype?
   - Or external CMS?

8. **SEO optimization?**
   - Currently set up for basic SEO (Tailwind doesn't help)
   - Should add meta tags, structured data, sitemap?

9. **Analytics?**
   - Which analytics platform to use?
   - What metrics matter for a portfolio?

10. **Monetization?**
    - Affiliate links in project descriptions?
    - Sponsored content?
    - Or purely portfolio (no revenue)?

---

## Setup & Development Guide

### Prerequisites
- Node.js 16+ (check with `node --version`)
- npm (comes with Node.js)
- Git (for version control)

### Installation
```bash
cd /Users/saadkhan/Documents/portfolio
npm install
```

### Development
```bash
npm run dev
# Opens http://localhost:3000 in browser
# Auto-reloads on file changes
```

### Building
```bash
npm run build          # Creates optimized build
npm start             # Runs production build locally
```

### Linting
```bash
npm run lint          # Checks code quality
```

### Deployment to Vercel
1. Push to GitHub
2. Connect repo to Vercel
3. Automatic builds and deployment
4. Environment variables if needed

### Common Tasks

#### Adding a New Project
1. Create folder: `app/my-project/`
2. Create page: `app/my-project/page.tsx`
3. Edit `components/Navbar.tsx` (add link)
4. Edit `app/page.tsx` (add to projects grid)

#### Updating Colors
1. Edit `tailwind.config.js`
2. Update `colors` section
3. All components update automatically

#### Adding a Chart
1. Create component in `components/[project]/`
2. Use Recharts components
3. Import and use in page

#### Updating Data
1. Edit data array in component file
2. Or add JSON to `/public/data/`
3. Import and use in page

---

## File Reference

| File | Purpose | Edit Frequency |
|------|---------|-----------------|
| `app/page.tsx` | Homepage | Weekly/Monthly |
| `app/about/page.tsx` | About page | As needed |
| `app/zameen/page.tsx` | Zameen project page | Monthly |
| `app/manutd/page.tsx` | Man Utd project page | Monthly |
| `components/Navbar.tsx` | Navigation | When adding projects |
| `components/Footer.tsx` | Footer | As needed |
| `components/zameen/ConstructionCostChart.tsx` | Charts | When data updates |
| `tailwind.config.js` | Colors/theme | When redesigning |
| `package.json` | Dependencies | When adding packages |
| `README.md` | Documentation | Reference only |

---

## Summary

This is a **modern, production-ready web portfolio** built with Next.js and Tailwind CSS. It showcases data analysis projects with interactive visualizations and is ready for deployment. The main opportunities are:

1. Complete the "About" page with your story
2. Add your actual contact information
3. Deploy to Vercel
4. Keep data updated as you complete new analyses

All code is well-organized, documented, and follows Next.js best practices.

---

## Changelog

- **2025-11-13** — Initialized Multi-AI Coordination Policy. Added Known Issues/Limitations section and Data Integration subsection.

