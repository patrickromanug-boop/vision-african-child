
import Link from 'next/link'
import { ArrowRight, Bell, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export default async function AnnouncementsHome() {
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('announcement_date', { ascending: false })
    .limit(3)

  if (!announcements?.length) return null

  return (
    <section className="py-20 bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Latest Updates</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">News & Announcements</h2>
          </div>
          <Link href="/news" className="flex items-center gap-2 text-[#195F2E] font-semibold text-sm hover:text-[#F4720B] transition-colors shrink-0">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {announcements.map((a: Announcement) => (
            <div key={a.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={13} className="text-[#F4720B]" />
                <span className="text-xs font-medium text-[#F4720B] bg-orange-50 px-2 py-0.5 rounded-full">Announcement</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{a.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{a.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-4 border-t border-gray-50">
                <Calendar size={12} />{formatDate(a.announcement_date)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
