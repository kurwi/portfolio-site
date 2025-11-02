'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
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

const demos = [
  {
    id: 'credit-risk',
    title: 'Credit Risk Assessment Platform',
    description: 'Professional ML-powered credit risk prediction system with real-time scoring, batch processing, scenario analysis, and portfolio management.',
    projectUrl: '/projects/credit-risk-prediction-platform',
    icon: '🏦',
    type: 'component'
  },
  {
    id: 'sales-analytics',
    title: 'Sales Analytics Platform',
    description: 'Enterprise-grade B2B sales analytics featuring ML-powered revenue forecasting, customer churn prediction, and comprehensive pipeline analytics.',
    projectUrl: '/projects/sales-analytics-platform',
    icon: '📊',
    type: 'component'
  },
  {
    id: 'nlp',
    title: 'Email Automation Platform',
    description: 'AI-powered email marketing automation with NLP-driven content optimization, subscriber segmentation, and predictive analytics.',
    projectUrl: '/projects/email-automation-platform',
    icon: '📧',
    type: 'component'
  },
  {
    id: 'nlp-platform',
    title: 'Marketing Campaign Analysis',
    description: 'Multi-channel campaign performance tracking with ROI optimization, audience segmentation, and AI-powered insights.',
    projectUrl: '/projects/marketing-campaign-analytics',
    icon: '📊',
    type: 'component'
  },
  {
    id: 'ab-test',
    title: 'Customer Scoring System',
    description: 'Real-time churn prediction API with A/B testing framework and drift monitoring.',
    projectUrl: '/projects/customer-scoring-system',
    icon: '🎯',
    type: 'component'
  },
  {
    id: 'anomaly',
    title: 'Product Recommendation System',
    description: 'Hybrid recommendation engine with offline/online evaluation and A/B testing.',
    projectUrl: '/projects/product-recommendation-system',
    icon: '🛒',
    type: 'component'
  },
  {
    id: 'customer-behavior',
    title: 'Customer Behavior Automation',
    description: 'Event-driven workflows with rule engine, queues, and monitoring.',
    projectUrl: '/projects/customer-behavior-automation',
    icon: '⚙️',
    type: 'component'
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation Platform',
    description: 'Segmentation, orchestration, and real-time analytics.',
    projectUrl: '/projects/marketing-automation-platform',
    icon: '📣',
    type: 'component'
  },
  {
    id: 'trading-bot',
    title: 'Reinforcement Learning Trading Bot',
    description: 'PPO-based trading with risk controls and monitoring.',
    projectUrl: '/projects/reinforcement-learning-trading-bot',
    icon: '📈',
    type: 'component'
  },
  {
    id: 'ui-showcase',
    title: 'UI Design Showcase',
    description: 'Interactive demonstration of different UI layout patterns applied to the same data.',
    projectUrl: '/projects/ui-design-showcase',
    icon: '🎨',
    type: 'component'
  },
  // Add more demos here in the future
]

export default function DemosContent() {
  const searchParams = useSearchParams()
  const currentDemo = searchParams.get('demo')
  
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
              Back
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

  // If no demo selected, redirect to projects page
  return null
}
