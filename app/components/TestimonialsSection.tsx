import { FadeIn, SlideIn } from '@/app/components/Animations';

export function TestimonialsSection() {
  const testimonials = [
    {
      text: "Wojciech delivered a production-grade ML system ahead of schedule with comprehensive testing and documentation. A rare combination of technical depth and business awareness.",
      author: "CEO, FinTech Startup",
      role: "Client",
      initials: "JD"
    },
    {
      text: "The data pipeline architecture has scaled flawlessly through 10x growth. The code quality and foresight in design decisions were exceptional.",
      author: "Lead Engineer, E-commerce",
      role: "Team Lead",
      initials: "AS"
    },
    {
      text: "Clear communicator who understands both business needs and technical constraints. Delivered ROI-positive projects consistently.",
      author: "Product Director, SaaS",
      role: "Stakeholder",
      initials: "MK"
    },
    {
      text: "The recommendation system increased our AOV by 12% while maintaining a clean, maintainable codebase. Outstanding work.",
      author: "Director, Retail Tech",
      role: "Client",
      initials: "RS"
    }
  ];

  return (
    <section className="py-20 mb-20">
      <div className="container">
        <FadeIn>
          <h2 className="section-title mb-6">What People Say</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl">
            Feedback from clients, teammates, and stakeholders I&apos;ve worked with.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <SlideIn key={idx} delay={idx * 100} direction={idx % 2 === 0 ? 'left' : 'right'}>
              <div className="card p-6 h-full hover:shadow-xl transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
