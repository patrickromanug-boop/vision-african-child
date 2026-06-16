'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import { Mail, MailOpen, Trash2, Phone } from 'lucide-react'
import type { Inquiry } from '@/types'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createClient().from('inquiries').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setInquiries(data || []); setLoading(false) })
  }, [])

  const open = async (inq: Inquiry) => {
    setSelected(inq)
    if (!inq.is_read) {
      await createClient().from('inquiries').update({ is_read: true }).eq('id', inq.id)
      setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, is_read: true } : i))
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    await createClient().from('inquiries').delete().eq('id', id)
    setInquiries(prev => prev.filter(i => i.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500 text-sm mt-1">Messages submitted via the contact form</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {loading
            ? [...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />)
            : inquiries.length === 0
              ? <div className="text-center py-10 text-gray-400 text-sm">No inquiries yet</div>
              : inquiries.map(inq => (
                <button key={inq.id} onClick={() => open(inq)}
                  className={`w-full text-left p-4 rounded-2xl border transition-colors ${selected?.id === inq.id ? 'border-[#195F2E] bg-[#195F2E]/5' : 'border-gray-100 bg-white hover:shadow-sm'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {inq.is_read ? <MailOpen size={13} className="text-gray-400" /> : <Mail size={13} className="text-[#F4720B]" />}
                    <span className="font-semibold text-gray-900 text-sm truncate">{inq.name}</span>
                    {!inq.is_read && <span className="w-2 h-2 rounded-full bg-[#F4720B] shrink-0" />}
                  </div>
                  {inq.subject && <p className="text-xs text-gray-400 truncate">{inq.subject}</p>}
                  <p className="text-xs text-gray-300 mt-0.5">{formatDate(inq.created_at)}</p>
                </button>
              ))
          }
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{selected.name}</h2>
                  {selected.subject && <p className="text-gray-400 text-sm">Re: {selected.subject}</p>}
                  <p className="text-xs text-gray-300 mt-0.5">{formatDate(selected.created_at)}</p>
                </div>
                <button onClick={() => remove(selected.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-[#195F2E] hover:underline">
                  <Mail size={13} />{selected.email}
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-[#195F2E] hover:underline">
                    <Phone size={13} />{selected.phone}
                  </a>
                )}
              </div>

              <div className="p-5 bg-gray-50 rounded-xl mb-6">
                <p className="text-gray-700 leading-relaxed text-sm">{selected.message}</p>
              </div>

              <div className="flex gap-3">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your Inquiry'}`}
                  className="px-5 py-2.5 bg-[#195F2E] text-white rounded-xl text-sm font-semibold hover:bg-[#124820] transition-colors">
                  Reply via Email
                </a>
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hello ${selected.name}, thank you for contacting Vision African Child School.`}
                    target="_blank"
                    className="px-5 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                    Reply on WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 text-gray-300">
              <div className="text-center">
                <Mail size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
