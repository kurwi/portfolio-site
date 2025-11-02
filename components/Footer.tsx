export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-20 bg-slate-50">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Wojciech Staniszewski. Built with Next.js & Tailwind CSS.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="https://www.linkedin.com/in/wojciech-staniszewski-136631395/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-brand-600 transition-colors">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-brand-600 transition-colors">GitHub</a>
            <a href="mailto:wojciechstaniszewski80@gmail.com" className="text-slate-600 hover:text-brand-600 transition-colors">Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
