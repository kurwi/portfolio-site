# Portfolio Website

A modern, fast, and fully translated portfolio built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**. Features 5 languages (EN, ES, FR, DE, PL), interactive demos, and production-grade code.

## 🌟 Key Features

- ⚡ **Optimized Performance**: 3.2s startup time, SWC minification, on-demand entries
- 🌍 **5-Language Support**: English, Spanish, French, German, Polish with localStorage persistence
- 📊 **Interactive Demos**: Credit Risk Scoring, Market Analysis, and more
- 🎨 **Professional UI**: Blue gradient theme with smooth animations and hover effects
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized
- 🔍 **SEO Ready**: Next.js App Router with proper meta tags
- ♿ **Accessible**: WCAG compliant components
- 🚀 **Production Ready**: TypeScript, ESLint, clean architecture

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.17.0
- npm >= 9.0.0

### Installation & Running
```powershell
# Windows PowerShell
cd "path\to\portfolio-site"
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

### Available Scripts
```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
portfolio-site/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (hero, expertise, stats)
│   ├── contact/            # Contact page
│   ├── projects/           # Projects page
│   ├── skills/             # Skills page  
│   ├── demos/              # Interactive demos (10 demos)
│   └── globals.css         # Global styles with animations
├── components/
│   ├── Navbar.tsx          # Navigation with language switcher
│   ├── Footer.tsx          # Footer with social links
│   ├── LanguageSwitcher.tsx # Language selection dropdown
│   ├── StatsSection.tsx    # Stats with animations
│   ├── ContactSection.tsx  # Contact information
│   └── ...other components
├── contexts/
│   └── LanguageCtx.tsx     # Language provider with localStorage
├── lib/
│   └── translations.ts     # Master translation file (all 5 languages)
├── data/
│   └── projects.json       # Projects data
├── public/                 # Static assets
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

## 🌐 Language System

The app uses a custom, lightweight translation system instead of next-intl:

**Location**: `lib/translations.ts` - Single source of truth for all UI text in all 5 languages

**Usage**:
```typescript
import { useLanguageCtx } from '@/contexts/LanguageCtx';
import { t } from '@/lib/translations';

export function MyComponent() {
  const { locale } = useLanguageCtx();
  
  return <h1>{t('Hero Title', locale)}</h1>;
}
```

**Adding New Translations**:
1. Add key-value pair to `lib/translations.ts` in all 5 language sections
2. Use `t('key', locale)` in components
3. That's it! No build steps, no compilation needed

## 📊 Demos

The project includes 10 interactive demos showcasing ML/AI capabilities:

1. **Credit Risk Scoring** - ML model with SHAP explainability
2. **Market Analysis** - Trading signals and indicators
3. Plus 8 more interactive tools

All demos are **fully translated** and support real-time language switching.

## 🎨 Styling

- **Tailwind CSS** for utilities
- **Custom CSS** in `app/globals.css` for animations and gradients
- **Blue gradient theme** with brand colors (#3B82F6)
- **Smooth animations** for cards, buttons, and text
- **Dark mode ready** (media query support)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Framework: Next.js
4. Deploy!

### Other Platforms
```bash
npm run build
npm start
```

### Environment Variable

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` (copy `.env.example`) so metadata and sitemap use your public domain:

```env
NEXT_PUBLIC_SITE_URL=https://portfolio.yourdomain.com
```

### Sitemap & Robots

Automatically generated at build:
- `sitemap.xml` via `app/sitemap.ts`
- `robots.txt` via `app/robots.ts`

Ensure the domain is correct or search engines may index placeholder URLs.

### Docker Deployment

Build and run a production container:

```powershell
docker build -t portfolio-site .
docker run -d -p 3000:3000 --env NEXT_PUBLIC_SITE_URL="https://portfolio.yourdomain.com" portfolio-site
```

Visit: `http://localhost:3000`

### Health Check

```powershell
Invoke-WebRequest http://localhost:3000 -UseBasicParsing | Select-Object StatusCode
```

Expect `StatusCode` 200.

## 📦 Dependencies

**Runtime**:
- next@14.2.5 - React framework
- react@18.2.0 - UI library
- chart.js & react-chartjs-2 - Data visualization
- clsx - Utility for classnames

**Dev Tools**:
- TypeScript - Type safety
- Tailwind CSS - Styling
- ESLint - Code quality
- PostCSS/Autoprefixer - CSS processing

## 🔧 Configuration

- `next.config.js` - Next.js settings (SWC minification enabled)
- `tailwind.config.ts` - Tailwind colors and theme
- `tsconfig.json` - TypeScript strict mode
- `.eslintrc.json` - ESLint rules

## 💡 Performance Tips

1. **Images**: Use Next.js `Image` component for optimization
2. **Code Splitting**: Automatic via Next.js App Router
3. **Caching**: Static pages and API responses cached
4. **Bundle Size**: ~450KB initial JS (gzipped)

## 📝 License

MIT - Feel free to use as a template

---

**Need help?** Check the `lib/translations.ts` file to understand the translation structure, or open an issue on GitHub.

