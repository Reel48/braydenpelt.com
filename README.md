# braydenpelt.com

Personal website built with Next.js, TypeScript, and Highcharts, deployed on Vercel.

## Features

- 📝 **Blog/Article System** - Write articles in Markdown format
- 📊 **Data Visualizations** - Interactive charts powered by Highcharts
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🌙 **Dark Mode** - Automatic dark mode support
- ⚡ **Fast Performance** - Optimized with Next.js 14

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Highcharts
- **Deployment**: Vercel
- **Content**: Markdown files

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd braydenpelt.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── articles/          # Article pages
│   ├── data-viz/          # Data visualization pages
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer component
│   └── HighchartsChart.tsx # Highcharts wrapper
├── content/              # Content files
│   └── articles/        # Markdown article files
└── lib/                 # Utility functions
    └── articles.ts      # Article parsing logic
```

## Writing Articles

Articles are written in Markdown format and stored in `content/articles/`. Each article should have frontmatter:

```markdown
---
title: Your Article Title
date: 2024-01-15
excerpt: A brief description of the article
tags: [tag1, tag2]
---

Your article content here...
```

## Adding Data Visualizations

Create new visualization pages in `app/data-viz/` and use the `HighchartsChart` component:

```tsx
import HighchartsChart from '@/components/HighchartsChart'

const options: Highcharts.Options = {
  // Your Highcharts configuration
}

export default function MyChart() {
  return <HighchartsChart options={options} />
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

The site will be live at `https://your-project.vercel.app`

### Custom Domain

1. Go to your project settings in Vercel
2. Add your custom domain (e.g., braydenpelt.com)
3. Update DNS records as instructed

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme. The primary color is defined in the theme.

### Navigation

Update the `navLinks` array in `components/Navbar.tsx` to add/remove navigation items.

### Social Links

Update the social links in `components/Footer.tsx` with your actual profiles.

## License

MIT
