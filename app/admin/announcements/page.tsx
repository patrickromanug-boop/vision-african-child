
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Check, ToggleRight, ToggleLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', announcement_date: new Date().toISOString().split('T')[0] })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    createClient().from('announcements').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setItems(data || []); setLoading(false) })
  }, [])

  const add = async () => {
    if (!form.title || !form.description) return
    setSaving(true)
    const { data } = await createClient().from('announcements').insert({ ...form, is_published: true }).select().single()
    if (data) setItems(prev => [data, ...prev])
    setForm({ title: '', description: '', announcement_date: new Date().toISOString().split('T')[0] })
    setShowForm(false)
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await createClient().from('announcements').delete().eq('id', id)
    setItems(prev => prev.filter(a => a.id !== id))
  }

  const toggle = async (id: string, current: boolean) => {
    await createClient().from('announcements').update({ is_published: !current }).eq('id', id)
    setItems(prev => prev.map(a => a.id === id ? { ...a, is_published: !current } : a))
  }

  const ic = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#195F2E] text-sm"

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500 text-sm mt-1">Manage news and announcements shown on the website</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#195F2E] text-white rounded-xl text-sm font-semibold hover:bg-[#124820] transition-colors">
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">New Announcement</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={ic} placeholder="Announcement title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
              <input type="date" value={form.announcement_date} onChange={e => setForm(p => ({ ...p, announcement_date: e.target.value }))} className={ic} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
              <textarea rows={4} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className={`${ic} resize-none`} placeholder="Announcement details..." />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={add} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#195F2E] text-white rounded-xl text-sm font-semibold disabled:opacity-70">
              <Check size={14} /> {saving ? 'Saving...' : 'Publish'}
            </button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {loading
          ? [...Array(3)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-24 animate-pulse border border-gray-100" />)
          : items.length === 0
            ? <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">No announcements yet</div>
            : items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                      <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.is_published ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-1">{item.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(item.announcement_date)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggle(item.id, item.is_published)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      {item.is_published ? <ToggleRight size={20} className="text-[#195F2E]" /> : <ToggleLeft size={20} className="text-gray-400" />}
                    </button>
                    <button onClick={() => remove(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}
