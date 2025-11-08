# 📋 Quick Reference Guide

## 🚀 Getting Started

```powershell
# Navigate to project
cd "D:\Desktop\Praca\Exercices\Other\portfolio-site"

# Install & run
npm install
npm run dev

# Visit
http://localhost:3000
```

## 📝 Editing Translations

Edit `lib/translations.ts` - that's it!

Example:
```typescript
// BEFORE - only English
'Hero Title': 'Learn About My Work',

// AFTER - all 5 languages
'Hero Title': 'Learn About My Work',  // English
'Hero Title': 'Aprende Sobre Mi Trabajo',  // Spanish
'Hero Title': 'Découvrez Mon Travail',  // French
'Hero Title': 'Erfahren Sie Mehr Über Meine Arbeit',  // German
'Hero Title': 'Dowiedz Się Więcej O Mojej Pracy',  // Polish
```

## 🎨 Styling

**Colors**:
- Brand: `brand-600` (blue), `brand-700` (dark blue)
- Text: `slate-900` (dark), `slate-600` (medium)
- BG: `slate-50` (light), `white`

**Animations** (in globals.css):
- Hover lift: `hover:-translate-y-1`
- Scale: `hover:scale-105`
- Smooth: `transition-all duration-300`

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/translations.ts` | All UI text in 5 languages |
| `app/page.tsx` | Home page (hero, expertise, stats) |
| `components/Navbar.tsx` | Top navigation |
| `components/Footer.tsx` | Bottom footer |
| `contexts/LanguageCtx.tsx` | Language provider |
| `app/globals.css` | Global styles & animations |
| `data/projects.json` | Projects data |

## 🔍 Component Pattern

```typescript
'use client';
import { useLanguageCtx } from '@/contexts/LanguageCtx';
import { t } from '@/lib/translations';

export function MyComponent() {
  const { locale } = useLanguageCtx();
  
  return (
    <h1>{t('Section Title', locale)}</h1>
    <p>{t('Description text here', locale)}</p>
  );
}
```

## 📊 Supported Languages

| Code | Name | Flag |
|------|------|------|
| `en` | English | 🇺🇸 |
| `es` | Español | 🇪🇸 |
| `fr` | Français | 🇫🇷 |
| `de` | Deutsch | 🇩🇪 |
| `pl` | Polski | 🇵🇱 |

## 🎯 Common Tasks

### Add a new page
1. Create `app/newpage/page.tsx`
2. Add translations to `lib/translations.ts`
3. Update Navbar links if needed

### Add a new component
1. Create `components/NewComponent.tsx`
2. Use `useLanguageCtx()` and `t()` for text
3. Import in needed pages

### Update a translation
1. Open `lib/translations.ts`
2. Find the key in all 5 language sections
3. Update the value
4. Page auto-refreshes

### Add a project
1. Edit `data/projects.json`
2. Add project details
3. It appears on Projects page

## 🐛 Troubleshooting

**Site not starting?**
```powershell
npm install  # Reinstall deps
npm run dev  # Try again
```

**Language not switching?**
- Check localStorage in DevTools (F12)
- Ensure key: `locale` exists
- Page auto-saves language selection

**Styling broken?**
- Check `app/globals.css` exists
- Verify Tailwind in `tailwind.config.ts`
- Rebuild: `npm run build`

## 📦 NPM Commands

```bash
npm run dev      # Start dev (port 3000)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Check for errors
```

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind**: https://tailwindcss.com/docs

---

**That's it!** You now have a clean, optimized, fully translated portfolio. 🚀
