
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, DollarSign, Bell, Images, MessageSquare, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/applications', icon: FileText, label: 'Applications' },
  { href: '/admin/fees', icon: DollarSign, label: 'Fees' },
  { href: '/admin/announcements', icon: Bell, label: 'Announcements' },
  { href: '/admin/gallery', icon: Images, label: 'Gallery' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await createClient().auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0f3d1d] flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F4720B] rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-bold">V</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Vision African</p>
            <p className="text-green-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
              pathname === link.href
                ? 'bg-[#195F2E] text-white'
                : 'text-green-300 hover:bg-white/10 hover:text-white'
            )}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 w-full transition-colors"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
