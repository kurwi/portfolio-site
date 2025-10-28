export default function ContactPage() {
  return (
    <main className="container py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">
          <span className="gradient-text">Get in Touch</span>
        </h1>
        <p className="text-lg text-slate-600 text-center mb-12">
          I&apos;m always interested in new opportunities, collaborations, or just a friendly chat about data and ML.
        </p>
        
        <div className="grid gap-6">
          <a href="mailto:you@example.com" className="card-accent p-6 flex items-start gap-4 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-700 to-brand-900"></div>
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-700/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
              <p className="text-brand-600 group-hover:text-brand-700 transition-colors">you@example.com</p>
              <p className="text-sm text-slate-600 mt-1">Best for project inquiries and collaborations</p>
            </div>
          </a>

          <a href="https://github.com/yourhandle" target="_blank" rel="noreferrer" className="card-accent p-6 flex items-start gap-4 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-700 to-brand-900"></div>
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-700/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">GitHub</h3>
              <p className="text-brand-600 group-hover:text-brand-700 transition-colors">github.com/yourhandle</p>
              <p className="text-sm text-slate-600 mt-1">Open source contributions and code samples</p>
            </div>
          </a>
        </div>

      </div>
    </main>
  )
}
