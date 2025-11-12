# Saad Khan's Portfolio

A modern, interactive portfolio showcasing data engineering, analysis, and strategy projects built with Next.js, Tailwind CSS, and Recharts.

## 🚀 Features

- **Modern Design**: Built with Next.js and Tailwind CSS for a clean, professional look
- **Interactive Visualizations**: Recharts for beautiful, responsive data visualizations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Multiple Projects**: Easy to add and showcase different projects
- **Fast Performance**: Optimized for speed with Next.js

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── about/
│   │   └── page.tsx          # About page
│   └── zameen/
│       └── page.tsx          # Zameen project page
├── components/
│   ├── Navbar.tsx            # Navigation component
│   ├── Footer.tsx            # Footer component
│   └── zameen/
│       └── ConstructionCostChart.tsx  # Interactive charts
├── public/                   # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: React Icons
- **Language**: TypeScript
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:

```bash
cd portfolio
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Adding a New Project

1. Create a new folder in `app/`:
   ```bash
   mkdir app/your-project-name
   ```

2. Create `page.tsx` with your project content

3. Add navigation link in `components/Navbar.tsx`:
   ```typescript
   { href: '/your-project-name', label: 'Your Project' }
   ```

## 🎨 Design Decisions

### Color Scheme
- **Primary**: Blue (#2563eb) - Professional and trustworthy
- **Secondary**: Slate gray (#1f2937) - Clean backgrounds
- **Accent**: Amber (#f59e0b) - Highlights and CTAs

### Typography
- **Headings**: Bold, up to 5xl for hero sections
- **Body**: Slate gray text on light backgrounds for readability
- **Accents**: Smaller text in muted colors for secondary information

### Layout
- **Max-width**: 6xl (1152px) for content
- **Spacing**: Consistent padding/margins (16px, 24px, 32px units)
- **Cards**: Subtle shadows with hover effects for interactivity

## 🚀 Deployment

Deploy to Vercel with one click:

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically builds and deploys

```bash
npm run build
```

## 📊 Zameen Project

The showcase project includes:
- Interactive bar charts (construction costs)
- Line charts (cost per square yard trends)
- Responsive design for all screen sizes
- Key findings and methodology sections
- Links to source code and live data

## 🎯 Future Enhancements

- [ ] Add more projects
- [ ] Dark mode toggle
- [ ] Blog section for project write-ups
- [ ] Contact form
- [ ] Search functionality
- [ ] Project filtering/sorting

## 📄 License

This portfolio is part of personal projects. Feel free to use as inspiration for your own portfolio!

## 🤝 Contributing

This is a personal portfolio. For feature requests or bugs, please reach out directly.

---

**Built with ❤️ using modern web technologies**
