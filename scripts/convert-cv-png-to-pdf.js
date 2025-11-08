const sharp = require('sharp');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const cvSourceDir = path.join(__dirname, '..', 'CV');
const cvDestDir = path.join(__dirname, '..', 'public', 'cv');

// Ensure destination directory exists
if (!fs.existsSync(cvDestDir)) {
  fs.mkdirSync(cvDestDir, { recursive: true });
}

// Map source PNG files to professional PDF names
const cvMapping = {
  'English CV1.png': 'Wojciech_Staniszewski_CV_English.pdf',
  'Spanish CV1.png': 'Wojciech_Staniszewski_CV_Spanish.pdf',
  'French CV1 .png': 'Wojciech_Staniszewski_CV_French.pdf',
  'German CV1.png': 'Wojciech_Staniszewski_CV_German.pdf'
};

async function convertPNGtoPDF(pngFileName, pdfFileName) {
  const pngPath = path.join(cvSourceDir, pngFileName);
  const pdfPath = path.join(cvDestDir, pdfFileName);

  try {
    // Get image dimensions
    const metadata = await sharp(pngPath).metadata();
    
    // Create PDF document with dimensions matching the image
    const doc = new PDFDocument({
      size: [metadata.width, metadata.height],
      margin: 0
    });

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Insert image into PDF
    doc.image(pngPath, 0, 0, {
      width: metadata.width,
      height: metadata.height
    });

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        console.log(`✓ Converted: ${pngFileName} → ${pdfFileName}`);
        resolve();
      });
      stream.on('error', reject);
    });
  } catch (error) {
    console.error(`✗ Error converting ${pngFileName}:`, error.message);
    throw error;
  }
}

async function convertAllCVs() {
  console.log('Converting PNG CVs to professional PDFs...\n');
  console.log(`Source directory: ${cvSourceDir}`);
  console.log(`Destination directory: ${cvDestDir}\n`);

  try {
    for (const [pngFile, pdfFile] of Object.entries(cvMapping)) {
      await convertPNGtoPDF(pngFile, pdfFile);
    }
    
    console.log('\n✓ All CVs converted successfully!');
    console.log('\nFinal PDF files:');
    fs.readdirSync(cvDestDir)
      .filter(f => f.endsWith('.pdf'))
      .forEach(f => {
        const size = fs.statSync(path.join(cvDestDir, f)).size;
        const sizeKB = (size / 1024).toFixed(2);
        console.log(`  • ${f} (${sizeKB} KB)`);
      });
    
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Conversion failed:', error);
    process.exit(1);
  }
}

convertAllCVs();
