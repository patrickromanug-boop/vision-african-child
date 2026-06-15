
'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch { setStatus('error') }
  }

  const ic = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#195F2E] focus:border-transparent text-sm"
  const lc = "block text-sm font-medium text-gray-700 mb-1.5"

  if (status === 'success') return (
    <div className="flex flex-col items-center justify-center h-full min-h-64 text-center p-10 bg-green-50 rounded-2xl border border-green-100">
      <div className="w-16 h-16 bg-[#195F2E] rounded-full flex items-center justify-center mb-4">
        <Send size={24} className="text-white" />
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">Message Sent!</h3>
      <p className="text-gray-500 text-sm mb-4">We'll get back to you within 24 hours.</p>
      <button onClick={() => setStatus('idle')} className="text-[#195F2E] text-sm font-medium hover:underline">Send another</button>
    </div>
  )

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={lc}>Full Name *</label>
            <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={ic} placeholder="Your full name" />
          </div>
          <div>
            <label className={lc}>Phone Number</label>
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={ic} placeholder="+256 700 000 000" />
          </div>
        </div>
        <div>
          <label className={lc}>Email Address *</label>
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={ic} placeholder="your@email.com" />
        </div>
        <div>
          <label className={lc}>Subject</label>
          <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className={ic} placeholder="What is this regarding?" />
        </div>
        <div>
          <label className={lc}>Message *</label>
          <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={`${ic} resize-none`} placeholder="Tell us how we can help..." />
        </div>
        {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again or call us directly.</p>}
        <button type="submit" disabled={status === 'loading'} className="w-full py-4 bg-[#195F2E] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#124820] transition-colors disabled:opacity-70">
          {status === 'loading' ? 'Sending...' : <><Send size={16} /> Send Message</>}
        </button>
      </form>
    </div>
  )
}
