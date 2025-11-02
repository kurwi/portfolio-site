import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-brand-800 bg-white/90 backdrop-blur-md shadow-sm shadow-brand-700/10">
      <nav className="container h-16 flex items-center justify-between select-none">
        <Link href="/" className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors relative group">
          <span className="relative z-10">Wojciech Staniszewski</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <div className="flex gap-8 text-sm font-semibold items-center">
          <Link href="/about" className="text-slate-900 hover:text-brand-600 transition-colors relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/projects" className="text-slate-900 hover:text-brand-600 transition-colors relative group">
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/technical" className="text-slate-900 hover:text-brand-600 transition-colors relative group">
            Technical
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/skills" className="text-slate-900 hover:text-brand-600 transition-colors relative group">
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/contact" className="px-5 py-2 rounded-sm bg-gradient-to-r from-brand-700 to-brand-800 text-white hover:from-brand-600 hover:to-brand-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-brand-900">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
