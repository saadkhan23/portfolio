# Quick Start Guide - Portfolio

Get up and running in 5 minutes.

## 📦 Installation

```bash
# Navigate to portfolio folder
cd /Users/saadkhan/Documents/portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── about/page.tsx           # About page
│   └── zameen/page.tsx          # Zameen project page
│
├── components/                   # Reusable React components
│   ├── Navbar.tsx               # Navigation
│   ├── Footer.tsx               # Footer
│   └── zameen/
│       └── ConstructionCostChart.tsx  # Charts for Zameen
│
├── public/                       # Static files (create as needed)
├── README.md                     # Project overview
├── DESIGN.md                     # Design system & decisions
├── QUICK_START.md               # This file
├── package.json                 # Dependencies
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
└── .gitignore                   # Git ignore rules
```

---

## 🎨 Design Decisions (Summary)

### Color Scheme
- **Primary**: Blue (#2563eb) - Professional, trustworthy
- **Secondary**: Slate gray - Clean backgrounds
- **Accent**: Amber - CTAs and highlights

See `DESIGN.md` for detailed color palette.

### Typography
- **Font**: Inter (modern, clean)
- **Scale**: 16px base, up to 60px for hero titles
- **Hierarchy**: Bold headings, regular body text

### Layout
- **Max-width**: 1152px (6xl)
- **Spacing**: 8px grid (16px, 24px, 32px increments)
- **Responsive**: Mobile-first approach

### Interactive
- **Hover effects**: Color changes, shadow elevation
- **Transitions**: Smooth 150ms transitions
- **Charts**: Interactive Recharts with tooltips

---

## 🚀 Adding a New Project

### Step 1: Create Project Folder
```bash
mkdir app/my-project
```

### Step 2: Create Page
Create `app/my-project/page.tsx`:

```typescript
export default function MyProjectPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Project Title</h1>
          <p className="text-xl text-blue-100">Project description</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Overview</h2>
          {/* Add your content here */}
        </div>
      </section>
    </>
  )
}
```

### Step 3: Add to Navigation
Edit `components/Navbar.tsx` and add to `navLinks`:

```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/zameen', label: 'Zameen Analysis' },
  { href: '/my-project', label: 'My Project' },  // Add this
  { href: '/about', label: 'About' },
]
```

### Step 4: Update Homepage
Edit `app/page.tsx` and add your project to the `projects` array.

---

## 📊 Chart Component Usage

For interactive charts, use the Recharts component pattern:

```typescript
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const MyChart = () => {
  const data = [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
  ]

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

## 🔧 Configuration

### Tailwind Colors
Extend colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      secondary: '#1f2937',
      accent: '#f59e0b',
    },
  },
}
```

### Next.js Config
Edit `next.config.js` for image optimization, custom webpack config, etc.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/yourusername/portfolio
git push -u origin main
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Click "Deploy"

That's it! Vercel automatically builds and deploys on every push.

### Preview Deployments
Every pull request automatically gets a preview URL.

---

## 📝 Common Tasks

### Change Colors

Find the color in `tailwind.config.js` or use Tailwind utility classes:

```jsx
// Change background color
<div className="bg-blue-600">   {/* Blue */}
<div className="bg-purple-600"> {/* Purple */}
<div className="bg-slate-900">  {/* Dark */}
```

### Add an Icon

```jsx
import { HiGithub, HiMail } from 'react-icons/hi'

<HiGithub size={24} />
<HiMail size={24} />
```

Browse all icons: [react-icons.github.io](https://react-icons.github.io)

### Make Section Full Width

```jsx
// Default: Max-width container
<div className="max-w-6xl mx-auto">

// Full width background, contained text
<section className="py-16 bg-blue-100">
  <div className="max-w-6xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Add Custom Styling

Use Tailwind classes first. Only add custom CSS in `app/globals.css` if needed:

```css
@layer components {
  .my-custom-button {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
  }
}
```

---

## 🐛 Troubleshooting

### Port 3000 Already In Use
```bash
lsof -i :3000  # See what's using it
kill -9 <PID>  # Kill the process
npm run dev    # Try again
```

### Styles Not Updating
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript Errors
```bash
# Check TypeScript compilation
npx tsc --noEmit

# Type check during development is automatic
```

---

## 📚 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Recharts Docs**: https://recharts.org
- **React Icons**: https://react-icons.github.io

---

## ✅ Checklist Before Deploying

- [ ] Homepage looks good on mobile
- [ ] All links work
- [ ] Images load properly
- [ ] Charts are responsive
- [ ] No console errors
- [ ] Metadata is accurate (title, description)
- [ ] About page is filled in
- [ ] Navigation is complete

---

## 🚀 Next Steps

1. **Customize About Page**: Edit `app/about/page.tsx` with your story
2. **Update Footer**: Edit `components/Footer.tsx` with your social links
3. **Add More Projects**: Follow the "Adding a New Project" section
4. **Deploy to Vercel**: Follow the "Deployment" section
5. **Share**: Update your resume, LinkedIn, and applications!

---

**Happy building!** 🎉
