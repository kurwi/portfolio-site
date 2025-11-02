'use client';

import { FadeIn } from '@/app/components/Animations';

export function ContactSection() {
  return (
    <section className="py-20 mb-20">
      <div className="container max-w-2xl">
        <FadeIn>
          <h2 className="section-title mb-6">Let&apos;s Work Together</h2>
          <p className="text-lg text-slate-600 mb-12">
            Have a project in mind? I&apos;d love to hear about it. Drop me a message or connect on social platforms.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-12 rounded-lg border-2 border-slate-200 mb-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Get In Touch</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              I&apos;d love to hear about your project or collaboration ideas. Feel free to reach out via email or through the contact information below.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-base font-medium text-slate-700 mb-2">Email</p>
                <a href="mailto:wojciechstaniszewski80@gmail.com" className="text-lg text-brand-600 hover:text-brand-700 font-semibold">
                  wojciechstaniszewski80@gmail.com
                </a>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-base font-medium text-slate-700 mb-2">Location</p>
                  <p className="text-lg text-slate-600">Alicante, Spain</p>
                </div>
                <div>
                  <p className="text-base font-medium text-slate-700 mb-2">Response Time</p>
                  <p className="text-lg text-slate-600">4-8 hours</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn delay={100}>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/wojciech-staniszewski-136631395/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-gradient-to-br from-brand-50 to-blue-50 text-brand-700 hover:text-white hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-2 border-brand-200 hover:bg-gradient-to-br hover:from-brand-600 hover:to-brand-700 hover:border-brand-600"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-gradient-to-br from-brand-50 to-blue-50 text-brand-700 hover:text-white hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-2 border-brand-200 hover:bg-gradient-to-br hover:from-brand-600 hover:to-brand-700 hover:border-brand-600"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=wojciechstaniszewski80@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-gradient-to-br from-brand-50 to-blue-50 text-brand-700 hover:text-white hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-2 border-brand-200 hover:bg-gradient-to-br hover:from-brand-600 hover:to-brand-700 hover:border-brand-600"
                    aria-label="Email"
                    title="Email"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-brand-500 p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Available now:</span> I&apos;m currently accepting new projects and collaborations.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
