const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const cvDir = path.join(__dirname, 'public', 'cv');

// Ensure directory exists
if (!fs.existsSync(cvDir)) {
  fs.mkdirSync(cvDir, { recursive: true });
}

const cvContent = {
  en: {
    title: 'WOJCIECH STANISZEWSKI',
    subtitle: 'Data & AI Engineer',
    contact: 'Alicante, Spain | wojciechstaniszewski80@gmail.com',
    summary: 'Production-grade Data & AI Engineer with expertise in machine learning, trading algorithms, and scalable data platforms. Proficient in Python, SQL, FastAPI, Docker, Kubernetes, and cloud technologies.',
    sections: [
      {
        heading: 'CORE COMPETENCIES',
        items: [
          '• Machine Learning: XGBoost, Neural Networks, RandomForest, Data Mining',
          '• Trading & Finance: RL Trading Bots, Forex strategies, Backtesting, Quantitative Analysis',
          '• Data Engineering: ETL Pipelines, Pandas, NumPy, SHAP, Optuna',
          '• Backend & APIs: FastAPI, Flask, Dash, Streamlit, Redis',
          '• Databases: PostgreSQL, SQLite, Redis Caching',
          '• DevOps: Docker, Kubernetes, Git, AWS/Linux',
          '• Monitoring: Pytest, Prometheus, Grafana, MLflow'
        ]
      },
      {
        heading: 'LANGUAGES',
        items: [
          '• English - Professional fluency',
          '• Spanish - Fluent',
          '• French - Advanced',
          '• German - Advanced',
          '• Polish - Native'
        ]
      }
    ]
  },
  es: {
    title: 'WOJCIECH STANISZEWSKI',
    subtitle: 'Ingeniero de Datos e IA',
    contact: 'Alicante, España | wojciechstaniszewski80@gmail.com',
    summary: 'Ingeniero de Datos e IA con experiencia en sistemas de calidad de producción. Experto en machine learning, algoritmos de trading y plataformas de datos escalables. Proficiente en Python, SQL, FastAPI, Docker, Kubernetes y tecnologías en la nube.',
    sections: [
      {
        heading: 'COMPETENCIAS PRINCIPALES',
        items: [
          '• Machine Learning: XGBoost, Redes Neuronales, RandomForest, Minería de Datos',
          '• Trading y Finanzas: Bots de RL, estrategias Forex, Backtesting, Análisis Cuantitativo',
          '• Ingeniería de Datos: Pipelines ETL, Pandas, NumPy, SHAP, Optuna',
          '• Backend y APIs: FastAPI, Flask, Dash, Streamlit, Redis',
          '• Bases de Datos: PostgreSQL, SQLite, Caché Redis',
          '• DevOps: Docker, Kubernetes, Git, AWS/Linux',
          '• Monitoreo: Pytest, Prometheus, Grafana, MLflow'
        ]
      },
      {
        heading: 'IDIOMAS',
        items: [
          '• Inglés - Comunicación profesional',
          '• Español - Fluido',
          '• Francés - Avanzado',
          '• Alemán - Avanzado',
          '• Polaco - Nativo'
        ]
      }
    ]
  },
  fr: {
    title: 'WOJCIECH STANISZEWSKI',
    subtitle: 'Ingénieur Données et IA',
    contact: 'Alicante, Espagne | wojciechstaniszewski80@gmail.com',
    summary: 'Ingénieur Données et IA avec expertise en systèmes d\'apprentissage automatique, algorithmes de trading et plateformes de données scalables. Compétences en Python, SQL, FastAPI, Docker, Kubernetes et technologies cloud.',
    sections: [
      {
        heading: 'COMPÉTENCES PRINCIPALES',
        items: [
          '• Machine Learning: XGBoost, Réseaux de Neurones, RandomForest, Exploration de Données',
          '• Trading et Finance: Bots RL, stratégies Forex, Backtesting, Analyse Quantitative',
          '• Ingénierie Données: Pipelines ETL, Pandas, NumPy, SHAP, Optuna',
          '• Backend et APIs: FastAPI, Flask, Dash, Streamlit, Redis',
          '• Bases de Données: PostgreSQL, SQLite, Mise en Cache Redis',
          '• DevOps: Docker, Kubernetes, Git, AWS/Linux',
          '• Surveillance: Pytest, Prometheus, Grafana, MLflow'
        ]
      },
      {
        heading: 'LANGUES',
        items: [
          '• Anglais - Communication professionnelle',
          '• Espagnol - Courant',
          '• Français - Avancé',
          '• Allemand - Avancé',
          '• Polonais - Natif'
        ]
      }
    ]
  },
  de: {
    title: 'WOJCIECH STANISZEWSKI',
    subtitle: 'Daten- und KI-Ingenieur',
    contact: 'Alicante, Spanien | wojciechstaniszewski80@gmail.com',
    summary: 'Daten- und KI-Ingenieur mit Expertise in Machine Learning, Handelsalgorithmen und skalierbaren Datenplattformen. Professionell in Python, SQL, FastAPI, Docker, Kubernetes und Cloud-Technologien.',
    sections: [
      {
        heading: 'KERNKOMPETENZEN',
        items: [
          '• Machine Learning: XGBoost, Neuronale Netze, RandomForest, Datenbergbau',
          '• Trading & Finanzen: RL Trading Bots, Forex-Strategien, Backtesting, Quantitative Analyse',
          '• Datentechnik: ETL-Pipelines, Pandas, NumPy, SHAP, Optuna',
          '• Backend & APIs: FastAPI, Flask, Dash, Streamlit, Redis',
          '• Datenbanken: PostgreSQL, SQLite, Redis-Caching',
          '• DevOps: Docker, Kubernetes, Git, AWS/Linux',
          '• Überwachung: Pytest, Prometheus, Grafana, MLflow'
        ]
      },
      {
        heading: 'SPRACHEN',
        items: [
          '• Englisch - Professionelle Kommunikation',
          '• Spanisch - Fließend',
          '• Französisch - Fortgeschritten',
          '• Deutsch - Fortgeschritten',
          '• Polnisch - Muttersprache'
        ]
      }
    ]
  },
  pl: {
    title: 'WOJCIECH STANISZEWSKI',
    subtitle: 'Inżynier Danych i AI',
    contact: 'Alicante, Hiszpania | wojciechstaniszewski80@gmail.com',
    summary: 'Inżynier Danych i AI z doświadczeniem w systemach machine learning, algorytmach tradingu i skalowalnych platformach danych. Biegły w Python, SQL, FastAPI, Docker, Kubernetes i technologiach chmurowych.',
    sections: [
      {
        heading: 'GŁÓWNE UMIEJĘTNOŚCI',
        items: [
          '• Machine Learning: XGBoost, Sieci Neuronowe, RandomForest, Eksploracja Danych',
          '• Trading i Finanse: Boty RL, strategie Forex, Backtesting, Analiza Ilościowa',
          '• Inżynieria Danych: Pipelines ETL, Pandas, NumPy, SHAP, Optuna',
          '• Backend i API: FastAPI, Flask, Dash, Streamlit, Redis',
          '• Bazy Danych: PostgreSQL, SQLite, Buforowanie Redis',
          '• DevOps: Docker, Kubernetes, Git, AWS/Linux',
          '• Monitorowanie: Pytest, Prometheus, Grafana, MLflow'
        ]
      },
      {
        heading: 'JĘZYKI',
        items: [
          '• Angielski - Komunikacja zawodowa',
          '• Hiszpański - Płynny',
          '• Francuski - Zaawansowany',
          '• Niemiecki - Zaawansowany',
          '• Polski - Rodzimy'
        ]
      }
    ]
  }
};

const fileMap = {
  en: 'Wojciech_Staniszewski_CV_English.pdf',
  es: 'Wojciech_Staniszewski_CV_Spanish.pdf',
  fr: 'Wojciech_Staniszewski_CV_French.pdf',
  de: 'Wojciech_Staniszewski_CV_German.pdf',
  pl: 'Wojciech_Staniszewski_CV_Polish.pdf'
};

function createPDF(lang) {
  const content = cvContent[lang];
  const filename = fileMap[lang];
  const filepath = path.join(cvDir, filename);

  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  });

  const stream = fs.createWriteStream(filepath);
  doc.pipe(stream);

  // Title
  doc.fontSize(20).font('Helvetica-Bold').text(content.title, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(content.subtitle, { align: 'center' });
  doc.fontSize(10).text(content.contact, { align: 'center' });
  doc.moveDown(0.5);

  // Horizontal line
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);

  // Summary
  doc.fontSize(11).font('Helvetica').text(content.summary, { align: 'justify' });
  doc.moveDown(1);

  // Sections
  content.sections.forEach(section => {
    doc.fontSize(12).font('Helvetica-Bold').text(section.heading);
    doc.moveDown(0.3);
    section.items.forEach(item => {
      doc.fontSize(10).font('Helvetica').text(item);
    });
    doc.moveDown(0.5);
  });

  // Footer
  doc.fontSize(9).text('---', { align: 'center' });
  doc.fontSize(8).text('This CV represents a summary of professional qualifications', { align: 'center' });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      console.log(`✓ Created: ${filename}`);
      resolve();
    });
    stream.on('error', reject);
  });
}

async function generateAllPDFs() {
  console.log('Generating professional CV PDFs...\n');
  try {
    for (const lang of ['en', 'es', 'fr', 'de', 'pl']) {
      await createPDF(lang);
    }
    console.log('\n✓ All CVs generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error generating PDFs:', error);
    process.exit(1);
  }
}

generateAllPDFs();
