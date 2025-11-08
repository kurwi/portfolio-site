# CV Download Setup - Professional Resume Distribution

## 📋 Overview

The CV download feature is fully integrated and ready to serve your resume in 5 languages. Users will automatically receive the CV in their preferred language.

## 🗂️ Directory Structure

```
public/
└── cv/
    ├── Wojciech_Staniszewski_CV_English.pdf
    ├── Wojciech_Staniszewski_CV_Spanish.pdf
    ├── Wojciech_Staniszewski_CV_French.pdf
    ├── Wojciech_Staniszewski_CV_German.pdf
    ├── Wojciech_Staniszewski_CV_Polish.pdf
    └── README.md (this file)
```

## 📄 Required Files

### Professional Naming Convention
All CV files must follow this exact naming pattern:
```
Wojciech_Staniszewski_CV_[Language].pdf
```

### Complete File List
1. `Wojciech_Staniszewski_CV_English.pdf` - English version
2. `Wojciech_Staniszewski_CV_Spanish.pdf` - Spanish version (Español)
3. `Wojciech_Staniszewski_CV_French.pdf` - French version (Français)
4. `Wojciech_Staniszewski_CV_German.pdf` - German version (Deutsch)
5. `Wojciech_Staniszewski_CV_Polish.pdf` - Polish version (Polski)

## 🔄 How to Add Your CVs

### If You Have PNG Images:
1. Convert each PNG to PDF using:
   - Online tools: ilovepdf.com, cloudconvert.com, or similar
   - Desktop tools: Adobe Acrobat, Preview (Mac), or similar
   
2. Rename each PDF to match the professional naming convention above

3. Place them in the `public/cv/` directory

### If You Already Have PDF Files:
1. Simply rename them to match the naming convention
2. Place them in the `public/cv/` directory

## 🌍 Language Mapping

The system automatically maps user language selection to the correct CV:

| User Language | File Served |
|---|---|
| English (EN) | Wojciech_Staniszewski_CV_English.pdf |
| Spanish (ES) | Wojciech_Staniszewski_CV_Spanish.pdf |
| French (FR) | Wojciech_Staniszewski_CV_French.pdf |
| German (DE) | Wojciech_Staniszewski_CV_German.pdf |
| Polish (PL) | Wojciech_Staniszewski_CV_Polish.pdf |

## 🎯 Feature Details

### User Experience:
1. User visits the portfolio site
2. User selects their preferred language (EN, ES, FR, DE, PL)
3. User clicks "Download CV" button
4. System detects their language preference
5. Correct language version downloads automatically

### Button Appearance:
- **Location**: Home page hero section (under main CTA buttons)
- **Style**: Blue gradient button matching site theme
- **Icon**: Download arrow icon
- **Text**: Translates to "Download CV" in selected language
- **Behavior**: 
  - Shows "Loading..." while fetching
  - Displays error if file not found
  - Downloads with professional filename

## ✅ Verification Checklist

Before deploying, ensure:
- [ ] All 5 PDF files are created/prepared
- [ ] Files follow the naming convention exactly
- [ ] Files are placed in `public/cv/` directory
- [ ] File sizes are reasonable (< 5MB recommended)
- [ ] Each CV clearly shows the language version
- [ ] Test download in each language

## 🔧 Troubleshooting

### "File not found" error:
- Check that the PDF file exists in `public/cv/` directory
- Verify the filename matches the naming convention exactly
- Check for typos in language codes (en, es, fr, de, pl)

### Button doesn't download:
- Ensure the file has .pdf extension
- Check browser console for errors
- Verify file permissions allow reading

### Wrong file downloads:
- Clear browser cache
- Verify language selection in language switcher
- Check filename mapping in CVDownload.tsx

## 📝 Current Status

| Language | Status | File |
|---|---|---|
| English | ⏳ Pending | Wojciech_Staniszewski_CV_English.pdf |
| Spanish | ⏳ Pending | Wojciech_Staniszewski_CV_Spanish.pdf |
| French | ⏳ Pending | Wojciech_Staniszewski_CV_French.pdf |
| German | ⏳ Pending | Wojciech_Staniszewski_CV_German.pdf |
| Polish | ⏳ Pending | Wojciech_Staniszewski_CV_Polish.pdf |

## 🚀 Next Steps

1. **Prepare your CVs**: Create or gather PDF versions of your resume in each language
2. **Rename files**: Follow the professional naming convention
3. **Add to directory**: Place files in `public/cv/`
4. **Test**: Try downloading in each language
5. **Deploy**: Push changes to production

## 📧 Support

If you need to:
- Change the naming convention: Edit `components/CVDownload.tsx`
- Add more languages: Update the language map in the component
- Customize button styling: Modify the Tailwind classes in the component

