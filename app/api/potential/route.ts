import { NextResponse } from 'next/server';

export async function GET() {
  const portfolioData = {
    // Core Professional Metrics
    experience: {
      yearsExperience: 8,
      projectsCompleted: 45,
      clientsSatisfied: 28,
      successRate: 96,
    },

    // Technical Stack
    technicalExpertise: {
      languages: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java'],
      dataTools: ['Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'PyTorch'],
      webFrameworks: ['Next.js', 'React', 'Node.js', 'FastAPI', 'Django'],
      databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'],
      cloudPlatforms: ['AWS', 'Google Cloud', 'Azure', 'Heroku'],
      devOps: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Jenkins'],
    },

    // Specializations
    specializations: [
      {
        area: 'Data Engineering',
        expertise: 'Building scalable data pipelines, ETL processes, data warehousing',
        proficiency: 95,
      },
      {
        area: 'Machine Learning',
        expertise: 'Model training, deployment, optimization, A/B testing',
        proficiency: 92,
      },
      {
        area: 'Full-Stack Development',
        expertise: 'End-to-end web applications, APIs, real-time systems',
        proficiency: 90,
      },
      {
        area: 'System Design',
        expertise: 'Scalable architectures, microservices, cloud infrastructure',
        proficiency: 88,
      },
      {
        area: 'Business Analytics',
        expertise: 'Data-driven insights, KPI tracking, ROI optimization',
        proficiency: 87,
      },
    ],

    // Key Achievements
    achievements: [
      {
        title: 'Automated ML Pipeline',
        description: 'Reduced manual data processing by 85%, saving 200+ hours monthly',
        impact: '$180K annual savings',
      },
      {
        title: 'Real-time Analytics Dashboard',
        description: 'Built production system handling 50K+ events/second',
        impact: '99.95% uptime',
      },
      {
        title: 'Fraud Detection System',
        description: 'Deployed ML model catching 98% of fraudulent transactions',
        impact: 'Protected $5M+ in transactions',
      },
      {
        title: 'API Architecture Redesign',
        description: 'Refactored legacy system to microservices architecture',
        impact: '60% latency reduction',
      },
      {
        title: 'Data Warehouse Migration',
        description: 'Migrated from on-premise to cloud-based solution',
        impact: '40% cost reduction',
      },
    ],

    // Service Offerings
    services: [
      {
        name: 'Data Pipeline Development',
        description: 'Design and build scalable, maintainable data pipelines',
        timeline: '2-8 weeks',
        priceRange: '$15K - $50K',
      },
      {
        name: 'Machine Learning Model Development',
        description: 'Train, optimize, and deploy production-grade ML models',
        timeline: '4-12 weeks',
        priceRange: '$20K - $80K',
      },
      {
        name: 'Full-Stack Web Application',
        description: 'Build complete web applications with modern tech stack',
        timeline: '6-16 weeks',
        priceRange: '$25K - $100K',
      },
      {
        name: 'System Architecture Consulting',
        description: 'Design scalable systems and infrastructure optimization',
        timeline: '1-4 weeks',
        priceRange: '$5K - $20K',
      },
      {
        name: 'Analytics & Dashboarding',
        description: 'Create interactive dashboards for business insights',
        timeline: '2-6 weeks',
        priceRange: '$10K - $40K',
      },
    ],

    // Quality Metrics
    qualityMetrics: {
      codeTestCoverage: 94,
      documentationScore: 92,
      performanceOptimization: 91,
      securityCompliance: 96,
      customerSatisfaction: 98,
    },

    // Languages & Communication
    languages: ['Polish', 'English', 'French', 'Spanish'],

    // Certifications & Education
    credentials: [
      'AWS Solutions Architect',
      'Google Cloud Professional Data Engineer',
      'Certified Kubernetes Administrator (CKA)',
      'Advanced Python Developer',
    ],

    // Availability
    availability: {
      status: 'Open for new projects',
      startDate: 'Immediate',
      hoursPerWeek: 40,
      timezone: 'CET',
    },

    // Call to Action
    nextSteps: [
      'Schedule a consultation call (30 mins, free)',
      'Discuss your project requirements',
      'Receive custom proposal with timeline & pricing',
      'Start building together',
    ],
  };

  return NextResponse.json(portfolioData, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

// Optional: Add POST endpoint for inquiry submissions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, projectType, message } = body;

    // Validate input
    if (!email || !projectType) {
      return NextResponse.json(
        { error: 'Email and project type are required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify you of the inquiry

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received! I will get back to you soon.',
        inquiryId: Date.now().toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
