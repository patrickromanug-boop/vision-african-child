import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'News & Events', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

const programs = [
  { label: 'Baby Class', href: '/academics#nursery' },
  { label: 'Middle Class', href: '/academics#nursery' },
  { label: 'Top Class', href: '/academics#nursery' },
  { label: 'Primary 1 – 3', href: '/academics#primary' },
  { label: 'Primary 4 – 6', href: '/academics#primary' },
  { label: 'Primary 7 (PLE)', href: '/academics#primary' },
]

export default function Footer() {
  const handlePhone = () => window.open('tel:+256700000000', '_self')
  const handleEmail = () => window.open('mailto:info@visionafricanchild.ug', '_self')

  return (
    <footer className="bg-[#0f3d1d] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-[#F4720B] flex items-center justify-center shrink-0">
                <span className="text-white font-bold">V</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm">Vision African Child</p>
                <p className="text-green-400 text-xs">Nursery & Primary School</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              Nurturing young minds with quality education, strong values, and a caring environment since 2015 in Busabala.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button 
                  key={i} 
                  onClick={() => alert('Social media pages coming soon!')} 
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F4720B] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-green-200 text-sm hover:text-[#F4720B] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#F4720B]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-white mb-5">Programs</h3>
            <ul className="space-y-2.5">
              {programs.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-green-200 text-sm hover:text-[#F4720B] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#F4720B]" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-green-200">
                <MapPin size={16} className="text-[#F4720B] shrink-0 mt-0.5" />
                Busabala Trading Centre, Wakiso District, Uganda
              </li>
              <li>
                <button onClick={handlePhone} className="flex gap-3 text-sm text-green-200 hover:text-[#F4720B] transition-colors cursor-pointer">
                  <Phone size={16} className="text-[#F4720B] shrink-0" />+256 700 000 000
                </button>
              </li>
              <li>
                <button onClick={handleEmail} className="flex gap-3 text-sm text-green-200 hover:text-[#F4720B] transition-colors cursor-pointer">
                  <Mail size={16} className="text-[#F4720B] shrink-0" />info@visionafricanchild.ug
                </button>
              </li>
            </ul>
            <Link href="/apply" className="mt-6 inline-block px-5 py-2.5 bg-[#F4720B] text-white rounded-xl text-sm font-semibold hover:bg-[#c95c08] transition-colors">
              Enroll Your Child →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-green-300 text-sm">
            © {new Date().getFullYear()} Vision African Child Nursery & Primary School. All rights reserved.
          </p>
          <p className="text-green-500 text-xs">Built for quality education in Uganda 🇺🇬</p>
        </div>
      </div>
    </footer>
  )
}
