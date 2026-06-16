'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <>
      {/* Top info bar */}
      <div className="bg-[#195F2E] text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a href="tel:+256700000000" className="flex items-center gap-1.5 hover:text-orange-300 transition-colors">
              <Phone size={13} /> +256 700 000 000
            </a>
            <a href="mailto:info@visionafricanchild.ug" className="flex items-center gap-1.5 hover:text-orange-300 transition-colors">
              <Mail size={13} /> info@visionafricanchild.ug
            </a>
          </div>
          <span className="text-green-200 text-xs">Busabala Trading Centre, Wakiso District</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-300',
        scrolled ? 'shadow-lg' : 'shadow-sm'
      )}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#195F2E] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-[#195F2E] text-sm leading-tight">Vision African Child</p>
                <p className="text-gray-400 text-xs">Nursery & Primary School</p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-[#195F2E] bg-green-50 font-semibold'
                      : 'text-gray-600 hover:text-[#195F2E] hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/apply"
                className="ml-3 px-5 py-2.5 bg-[#F4720B] text-white rounded-xl font-semibold text-sm hover:bg-[#c95c08] transition-colors"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/apply" className="px-4 py-2 bg-[#F4720B] text-white rounded-lg text-sm font-semibold hover:bg-[#c95c08] transition-colors">
                Apply
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-[#195F2E] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-1">
                <a href="tel:+256700000000" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
                  <Phone size={14} /> +256 700 000 000
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
