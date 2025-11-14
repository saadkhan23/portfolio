# Portfolio Context & Design System

This document provides comprehensive context for working with the portfolio codebase. Use this when working with Claude, ChatGPT, or other AI assistants to ensure design consistency and architectural coherence.

## Project Overview

**Tech Stack:**
- Next.js 14 with App Router (`/app` directory structure)
- React 18 with TypeScript
- Tailwind CSS for styling (dark theme)
- Recharts for data visualization
- Node.js backend/API

**Purpose:** Professional portfolio showcasing data projects and analysis work with polished case studies.

**Theme:** Dark mode portfolio with professional consultant aesthetic

---

## Design System

### Color Palette

**Primary Colors:**
- Sky Blue: `#0ea5e9` - Primary action, charts, accents
- Orange: `#f97316` - Secondary highlights, alternate data series
- Green: `#22c55e` - Success states, positive indicators
- Red: `#ef4444` - Warnings, attention-grabbing elements

**Dark Theme - Slate Palette:**
```
bg950: #030712    (Darkest background)
bg900: #0f172a    (Dark background - body)
slate900: #0f172a
slate800: #1e293b  (Cards, containers)
slate700: #334155  (Borders)
slate600: #475569  (Muted elements)
slate500: #64748b  (Labels, hints)
slate400: #94a3b8  (Secondary labels)
slate300: #cbd5e1  (Body text - STANDARD)
slate200: #e2e8f0  (Secondary text)
slate50: #f1f5f9   (Headings, primary text)
```

**Text Color Hierarchy:**
- Headings: `text-slate-50` - Primary titles
- Body Text: `text-slate-300` - **DEFAULT for all narrative text** (no explicit font-size)
- Muted Text: `text-slate-400` or `text-slate-500` - Labels, hints
- Interactive: `text-sky-400` - Links, data highlights

### Typography

**Heading Sizes:**
- h1: `text-4xl md:text-5xl font-semibold` - Page titles
- h2: `text-2xl font-semibold` - Section headers
- h3: `text-2xl font-bold` - Subsection headers
- h4: `text-sm font-bold` - Card headers
- Labels: `text-xs font-medium uppercase tracking-wide` - Captions, labels

**Body Text:**
- **Standard:** No explicit `text-sm` class, uses base Tailwind size (~16px)
- Color: `text-slate-300`
- Applied to: All narrative paragraphs, methodology bullets, descriptions

**IMPORTANT:** Do NOT use `text-sm` for body/narrative text. Remove it if found. Use base font size only.

### Component Patterns

#### Custom Tooltips (Charts)
Used in all chart components for consistent hover information.

**Structure:**
```tsx
interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  chartData?: any[]
}

const CustomTooltip = ({ active, payload, label, chartData }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = chartData?.find(d => d.shortLabel === label)
    const precintName = item?.displayLabel || label
    const value = payload[0].value

    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded text-slate-200">
        <p className="font-medium text-sm">{precintName}</p>
        <p className="text-sm">{formatValue(value)}</p>
      </div>
    )
  }
  return null
}
```

**Styling Rules:**
- Background: `bg-slate-900`
- Border: `border border-slate-700`
- Padding: `p-3`
- Text: `text-slate-200 text-sm`
- Font: Primary line `font-medium`, values regular weight

#### Metric Cards
Dark cards for displaying KPIs and statistics.

**Structure:**
```tsx
<div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
  <div className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500 mb-4">
    Label
  </div>
  <div className="space-y-5">
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
        Metric Label
      </div>
      <div className="text-3xl font-bold text-sky-400">Value</div>
      <div className="text-xs text-slate-400 mt-1">Unit</div>
    </div>
  </div>
</div>
```

**Classes:**
- Container: `bg-slate-800 border border-slate-700 p-6 rounded-lg`
- Header: `text-xs font-medium uppercase tracking-[0.1em] text-slate-500`
- Label: `text-xs font-medium uppercase tracking-wide text-slate-400`
- Value: `text-3xl font-bold text-sky-400` (primary) or `text-xl font-bold text-sky-400` (secondary)
- Unit: `text-xs text-slate-400`

#### Chart Configuration

**All charts should follow this pattern:**

1. **Colors:** Use consistent primary color `#0ea5e9` for all bar/data visualization
2. **Axes:**
   - Stroke: `#64748b`
   - Tick fill: `#94a3b8`
   - Tick font size: 14px
   - Label font size: 13px
3. **Grid:**
   - Stroke: `#475569`
   - Stroke dasharray: `5 5`
4. **Tooltips:** Use CustomTooltip component (see above)

**X-Axis Labels:**
- Use FULL precinct names: "Precinct 5", "Precinct 6", "Precinct 8"
- Never abbreviate to "P5", "P6", "P8" on axes that users see

---

## Zameen Project Specifics

### Data Structure

**Precinct Data:**
- Three precincts analyzed: Precinct 5, Precinct 6, Precinct 8
- All prices normalized to PKR per square yard basis
- Total properties: 202 across all precincts

**Data Files Located:** `/public/data/zameen/`
- `construction_cost_summary.json`
- `size_vs_price_summary.json`
- `bargains_summary.json`
- `top_bargains.json`

### Component Layout Order

**Visual Insights Section** (in this order):
1. **Construction Cost Analysis** - "What does it cost to build a house?"
2. **Bargain Detection** - "Where are the genuine bargains?"
3. **Size vs Price Analysis** - "Does size actually explain price?"

### Font Size Standards

All body/narrative text uses **base Tailwind size** (no `text-sm`):
- Project Overview
- Construction Cost narrative
- Bargain Detection narrative
- Size vs Price narrative
- Methodology section bullets
- Key Takeaways section
- All explanation text

### Precinct Naming

**Rules:**
- Narrative & cards: Always use full names "Precinct 5", "Precinct 6", "Precinct 8"
- Chart axes: Use full names when displayed to users
- Internal/short labels: Can use "P5", "P6", "P8" (for axes only in tooltip mappings)
- Never abbreviate in visible narrative text

---

## File Structure

```
/portfolio
├── app/
│   ├── page.tsx                    # Home page
│   ├── manutd/page.tsx            # Man Utd project
│   ├── zameen/page.tsx            # Zameen main page
│   └── races/                     # Race event pages
├── components/
│   ├── ProjectCard.tsx            # Reusable project card
│   ├── Navbar.tsx                 # Navigation
│   └── zameen/
│       ├── ConstructionCostChartFromData.tsx
│       ├── SizeVsPriceSummary.tsx
│       ├── BargainsSummary.tsx
│       └── PrecinctComparison.tsx
├── lib/
│   └── designSystem.ts            # DESIGN TOKENS (use this!)
├── public/
│   └── data/zameen/               # JSON data files
└── PORTFOLIO_CONTEXT.md           # This file
```

---

## Key Implementation Details

### Custom Tooltip Implementation

**When creating chart tooltips:**
1. Always show precinct name from `displayLabel`
2. Always include units in the value display
3. Use `text-sm` for tooltip text (different from body text rule)
4. Tooltip background: `bg-slate-900` with `border-slate-700`
5. Never show raw data keys like "median_price_per_sq_yd"

**Example Value Formatting:**
- PKR values: Use `formatPkPerSqYdShort()` → "79k PKR/sq yd"
- Always round to whole thousands, no decimals
- Include unit in tooltip

### Chart Consistency Checklist

- [ ] All bars same color (`#0ea5e9`)
- [ ] X-axis shows full precinct names
- [ ] Tooltip shows: Precinct name + value with unit
- [ ] Tooltip font size: `text-sm`
- [ ] Tooltip background: `bg-slate-900 border-slate-700`
- [ ] Grid: `#475569` with `5 5` dashes
- [ ] No "median_price..." or field names in tooltips

---

## Zameen Narrative & Copy

### Hero Section
Title: "Zameen.com Property Analysis"

Subheading: "Everyone has a theory about Karachi real estate. I pulled hundreds of Bahria Town Karachi listings to answer two simple questions: what does it actually cost to build a home here, and can we systematically spot the under-the-radar deals?"

Tools: "Python · Pandas · Playwright · Recharts · Next.js"

### Construction Cost Section
Title: "What does it cost to build a house?"

Narrative: "Across all three precincts, construction costs are surprisingly boring — and that's the interesting part. Typical homes land in the 70–80k PKR per square yard range. In each precinct, about half of all houses sit inside a fairly tight band — for example, Precinct 5 has 50% of homes between 64k and 83k PKR/sq yd. That tells us most of the price noise in Bahria Town comes from land and seller expectations, not wildly different build quality."

### Bargain Detection Section
Title: "Where are the genuine bargains?"

Intro: "Not every cheap listing is a bargain. Some are small, awkwardly located, or need a full gut renovation. Here, a "bargain" is a house that's both below the typical price per square yard and unusually cheap compared to other homes in the same precinct. These are the listings where something interesting is happening — and where an investor should probably look twice."

Secondary: "Roughly one in four homes in this sample is statistically underpriced. That's not a gut feel — it's based on how far each property sits below the local going rate for its size in that precinct."

### Size vs Price Section
Title: "Does size actually explain price?"

Narrative: "Bigger homes should cost more — but some markets are much more disciplined than others. In a "disciplined" precinct, buyers roughly agree on what a home should cost for its size. In a noisy one, other factors like street, view, condition, and seller mood start to dominate."

R² Explanation: "It's just a measure of how predictable pricing is. Higher R² means size explains most of the price, so buyers broadly agree on what they're paying for. Lower R² means other factors — location within the precinct, finish, amenities, individual expectations — matter more than size."

---

## Common Tasks & Patterns

### Adding a New Chart
1. Create CustomTooltip component for tooltips
2. Use consistent chart colors: `#0ea5e9` for primary data
3. Use full precinct names on axes
4. Remove any `text-sm` from descriptive text above/below chart
5. Reference `designSystem.ts` for color values

### Updating Typography
1. Do NOT use `text-sm` for body text
2. Use base font size (no explicit class) for narrative
3. Use `text-slate-300` for body color
4. Use `text-slate-50` for headings
5. Check all sections: hero, overview, methodology, takeaways

### Fixing Inconsistencies
1. Check against `designSystem.ts` for color codes
2. Verify font sizes match pattern (base for body, explicit for special cases)
3. Check chart tooltips use CustomTooltip component
4. Verify precinct names are full ("Precinct 5", not "P5") in visible text
5. Ensure all units are displayed in chart values

---

## Design Decisions & Rationale

**Font Size Approach:**
- Base size (~16px) for all body text ensures readability
- `text-sm` removed from all narrative sections
- Consistent across all pages (home, Zameen, Man Utd)

**Color Consistency:**
- Primary action color: Sky blue `#0ea5e9` for charts
- All bars same color (not varying by metric) for visual clarity
- Dark slate palette maintains professional aesthetic
- High contrast text ensures accessibility

**Precinct Naming:**
- Full names in all visible/narrative text
- Short form "P5/P6/P8" only in internal data mappings
- Tooltips always show full names for clarity

**Tooltip Design:**
- Custom component ensures consistency
- Dark background with visible border
- Shows precinct name + value with unit
- No raw database field names

---

## Future Enhancements

When extending the portfolio:
1. Always reference `lib/designSystem.ts` for new components
2. Follow CustomTooltip pattern for all new charts
3. Use base font size for narrative text (no `text-sm`)
4. Maintain dark theme aesthetic
5. Test color contrast for accessibility
6. Document any new design patterns in this file

---

## Quick Reference

**Most Common Tasks:**
- Change chart colors? → Update `colors.chart` in `designSystem.ts`
- Fix font size? → Remove `text-sm`, use base size for body text
- Update precinct names? → Use "Precinct X" (not "PX") in visible text
- Create tooltip? → Copy CustomTooltip pattern, show full name + unit
- Add new metric card? → Use presets.metricCard classes

**Contact Point for Design Changes:**
All design tokens centralized in `/lib/designSystem.ts` — update there first, then apply across components.

---

## Version History

- **v1.0** - Initial portfolio context
  - Documented design system
  - Recorded Zameen project specifics
  - Established font size standards
  - Created reusable component patterns
