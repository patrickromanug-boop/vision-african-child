import { createClient } from '@/lib/supabase/server'
import { FileText, Bell, Images, MessageSquare, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalApplications },
    { count: pendingApplications },
    { count: announcements },
    { count: gallery },
    { count: unreadInquiries },
  ] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'Pending'),
    supabase.from('announcements').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('gallery').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
  ])

  const stats = [
    { label: 'Total Applications', value: totalApplications || 0, sub: `${pendingApplications || 0} pending review`, icon: FileText, href: '/admin/applications', color: 'bg-blue-500' },
    { label: 'Published News', value: announcements || 0, sub: 'Live announcements', icon: Bell, href: '/admin/announcements', color: 'bg-[#195F2E]' },
    { label: 'Gallery Photos', value: gallery || 0, sub: 'Uploaded images', icon: Images, href: '/admin/gallery', color: 'bg-purple-500' },
    { label: 'Unread Inquiries', value: unreadInquiries || 0, sub: 'Awaiting reply', icon: MessageSquare, href: '/admin/inquiries', color: 'bg-[#F4720B]' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's an overview of school activity.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-600 text-sm mt-0.5 font-medium">{stat.label}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.sub}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-5">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Post Announcement', href: '/admin/announcements', icon: Bell },
            { label: 'Upload Photos', href: '/admin/gallery', icon: Images },
            { label: 'Update Fee Structure', href: '/admin/fees', icon: DollarSign },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[#195F2E]/5 rounded-xl transition-colors text-sm font-medium text-gray-700 hover:text-[#195F2E]">
              <action.icon size={16} className="text-[#195F2E]" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
