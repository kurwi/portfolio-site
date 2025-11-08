'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { t } from '@/lib/translations'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import EmailAutomationDemo from './email-automation/EmailAutomationDemo'
import MarketingCampaignDemo from './marketing-campaign/MarketingCampaignDemo'
import CustomerScoringDemo from './customer-scoring/CustomerScoringDemo'
import CustomerBehaviorDemo from './customer-behavior/CustomerBehaviorDemo'
import ProductRecommendationDemo from './product-recommendation/ProductRecommendationDemo'
import MarketingAutomationDemo from './marketing-automation/MarketingAutomationDemo'
import TradingBotDemo from './trading-bot/TradingBotDemo'
import CreditRiskDemo from './credit-risk/CreditRiskDemo'
import SalesAnalyticsDemo from './sales-analytics/SalesAnalyticsDemo'
import UIShowcaseDemo from './ui-showcase/UIShowcaseDemo'

export default function DemosContent() {
  const searchParams = useSearchParams()
  const currentDemo = searchParams.get('demo')
  const { locale } = useLanguageCtx()

  const demos = [
    {
      id: 'credit-risk',
      title: 'Credit Risk Prediction',
      description: 'Machine learning model for credit risk assessment',
      projectUrl: '/projects/credit-risk-prediction-platform',
      icon: '🏦',
      type: 'component'
    },
    {
      id: 'sales-analytics',
      title: 'Sales Analytics Platform',
      description: 'Real-time sales analytics and reporting dashboard',
      projectUrl: '/projects/sales-analytics-platform',
      icon: '📊',
      type: 'component'
    },
    {
      id: 'nlp',
      title: 'Email Automation Platform',
      description: 'Email automation and campaign management system',
      projectUrl: '/projects/email-automation-platform',
      icon: '📧',
      type: 'component'
    },
    {
      id: 'nlp-platform',
      title: 'Marketing Campaign Analytics',
      description: 'Marketing campaign analysis and optimization',
      projectUrl: '/projects/marketing-campaign-analytics',
      icon: '📊',
      type: 'component'
    },
    {
      id: 'ab-test',
      title: 'Customer Scoring System',
      description: 'Customer value scoring and segmentation',
      projectUrl: '/projects/customer-scoring-system',
      icon: '🎯',
      type: 'component'
    },
    {
      id: 'anomaly',
      title: 'Product Recommendation System',
      description: 'Personalized product recommendation engine',
      projectUrl: '/projects/product-recommendation-system',
      icon: '🛒',
      type: 'component'
    },
    {
      id: 'customer-behavior',
      title: 'Customer Behavior Automation',
      description: 'Automated customer behavior analysis',
      projectUrl: '/projects/customer-behavior-automation',
      icon: '⚙️',
      type: 'component'
    },
    {
      id: 'marketing-automation',
      title: 'Marketing Automation Platform',
      description: 'End-to-end marketing automation system',
      projectUrl: '/projects/marketing-automation-platform',
      icon: '📣',
      type: 'component'
    },
    {
      id: 'trading-bot',
      title: 'Reinforcement Learning Trading Bot',
      description: 'AI-powered algorithmic trading system',
      projectUrl: '/projects/reinforcement-learning-trading-bot',
      icon: '📈',
      type: 'component'
    },
    {
      id: 'ui-showcase',
      title: 'UI Design Showcase',
      description: 'Component design and interaction showcase',
      projectUrl: '/projects/ui-design-showcase',
      icon: '🎨',
      type: 'component'
    }
  ]
  
  const selectedDemo = demos.find(d => d.id === currentDemo)

  // If a demo is selected, show it
  if (selectedDemo) {
    // For component-based demos
    if (selectedDemo.type === 'component') {
      return (
        <div className="min-h-screen bg-white" style={{ paddingTop: '80px' }}>
          <div className="fixed top-24 left-4 z-10">
            <Link 
              href={selectedDemo.projectUrl}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-brand-700 hover:text-brand-900 hover:border-brand-700 font-medium transition-colors shadow-sm"
            >
              {t('Back', locale as any)}
            </Link>
          </div>
          
          {selectedDemo.id === 'nlp' && <EmailAutomationDemo />}
          {selectedDemo.id === 'credit-risk' && <CreditRiskDemo />}
          {selectedDemo.id === 'sales-analytics' && <SalesAnalyticsDemo />}
          {selectedDemo.id === 'nlp-platform' && <MarketingCampaignDemo />}
          {selectedDemo.id === 'ab-test' && <CustomerScoringDemo />}
          {selectedDemo.id === 'anomaly' && <ProductRecommendationDemo />}
          {selectedDemo.id === 'customer-behavior' && <CustomerBehaviorDemo />}
          {selectedDemo.id === 'marketing-automation' && <MarketingAutomationDemo />}
          {selectedDemo.id === 'trading-bot' && <TradingBotDemo />}
          {selectedDemo.id === 'ui-showcase' && <UIShowcaseDemo />}
        </div>
      )
    }
    
    // No iframe demos remain; this branch should not be hit
    return null
  }

  // If no demo selected, show list of demos
  return (
    <main className="container py-16 pb-32">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent leading-tight pb-2">
          {t('Interactive Demos', locale as any)}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          {t('Explore interactive demonstrations of my projects. Click any demo to see it in action.', locale as any)}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {demos.map((demo) => (
          <Link 
            key={demo.id} 
            href={`/demos?demo=${demo.id}`}
            className="block group"
          >
            <div className="p-6 bg-white border border-slate-200 hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-4xl mb-2">{demo.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {demo.title}
                  </h3>
                </div>
                <svg className="w-6 h-6 text-brand-700 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </div>
              
              <p className="text-slate-600">{demo.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

