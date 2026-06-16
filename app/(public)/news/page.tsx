import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Bell, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export const metadata: Metadata = {
  title: 'News & Announcements',
  description: 'Latest news, announcements and updates from Vision African Child School.',
}

export default async function NewsPage() {
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('announcement_date', { ascending: false })

  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Stay Updated</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">News & Announcements</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">Latest updates, events, and important notices from school.</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {announcements && announcements.length > 0 ? (
            <div className="space-y-5">
              {announcements.map((a: Announcement) => (
                <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Bell size={13} className="text-[#F4720B]" />
                      <span className="text-xs font-medium text-[#F4720B] bg-orange-50 px-2 py-0.5 rounded-full">Announcement</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
                      <Calendar size={12} />{formatDate(a.announcement_date)}
                    </div>
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg mb-3">{a.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">{a.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Bell size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium">No announcements yet</p>
              <p className="text-sm mt-1">Check back soon for news and updates.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
