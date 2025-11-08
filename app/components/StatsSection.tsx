import { CountUp, FadeIn } from '@/app/components/Animations';
import { useLanguageCtx } from '@/contexts/LanguageCtx';
import { t } from '@/lib/translations';

export function StatsSection() {
  const { locale } = useLanguageCtx();
  
  const stats = [
    { value: 8, label: 'Production Projects', suffix: '+' },
    { value: 92, label: 'Average Model Accuracy', suffix: '%' },
    { value: 2, label: 'Years of Experience', suffix: '+' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-brand-700 to-brand-900 text-white mb-20">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{t('Impact & Experience', locale)}</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 100}>
              <div className="text-center p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div className="text-5xl md:text-6xl font-bold mb-4">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-base md:text-lg text-white/90">{t(stat.label, locale)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

