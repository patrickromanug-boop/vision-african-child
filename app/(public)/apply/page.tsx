
'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const grades = ['Baby Class', 'Middle Class', 'Top Class', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Primary 7']

export default function ApplyPage() {
  const [form, setForm] = useState({
    child_name: '', date_of_birth: '', gender: '', parent_name: '',
    parent_email: '', parent_phone: '', address: '', grade_applying: '',
    previous_school: '', emergency_contact: '', medical_info: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const up = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  const ic = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#195F2E] text-sm"
  const lc = "block text-sm font-medium text-gray-700 mb-1.5"

  if (status === 'success') return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-[#195F2E] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
        <p className="text-gray-600 mb-3 leading-relaxed">
          Thank you for applying to Vision African Child School. We've received the application and will contact you within 2–3 business days.
        </p>
        <p className="text-sm text-gray-400 mb-8">A confirmation email has been sent to <strong>{form.parent_email}</strong></p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#195F2E] text-white rounded-xl font-semibold hover:bg-[#124820] transition-colors">
          Back to Home <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )

  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Enrollment</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Apply for Admission</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">Complete the form below to apply for a place at Vision African Child School.</p>
        </div>
      </div>

      <section className="py-20 bg-[#FBF8F5]">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Child Details */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#195F2E] rounded-lg flex items-center justify-center text-white font-bold text-sm">1</span>
                Child's Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className={lc}>Child's Full Name *</label>
                  <input required type="text" value={form.child_name} onChange={e => up('child_name', e.target.value)} className={ic} placeholder="As per birth certificate" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Date of Birth *</label>
                    <input required type="date" value={form.date_of_birth} onChange={e => up('date_of_birth', e.target.value)} className={ic} />
                  </div>
                  <div>
                    <label className={lc}>Gender *</label>
                    <select required value={form.gender} onChange={e => up('gender', e.target.value)} className={ic}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Grade Applying For *</label>
                    <select required value={form.grade_applying} onChange={e => up('grade_applying', e.target.value)} className={ic}>
                      <option value="">Select grade</option>
                      {grades.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lc}>Previous School (if any)</label>
                    <input type="text" value={form.previous_school} onChange={e => up('previous_school', e.target.value)} className={ic} placeholder="Name of previous school" />
                  </div>
                </div>
                <div>
                  <label className={lc}>Medical Information / Allergies</label>
                  <textarea rows={3} value={form.medical_info} onChange={e => up('medical_info', e.target.value)} className={`${ic} resize-none`} placeholder="Any conditions, allergies, or special needs we should know about..." />
                </div>
              </div>
            </div>

            {/* Parent Details */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#195F2E] rounded-lg flex items-center justify-center text-white font-bold text-sm">2</span>
                Parent / Guardian Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className={lc}>Parent/Guardian Full Name *</label>
                  <input required type="text" value={form.parent_name} onChange={e => up('parent_name', e.target.value)} className={ic} placeholder="Your full name" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lc}>Email Address *</label>
                    <input required type="email" value={form.parent_email} onChange={e => up('parent_email', e.target.value)} className={ic} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className={lc}>Phone Number *</label>
                    <input required type="tel" value={form.parent_phone} onChange={e => up('parent_phone', e.target.value)} className={ic} placeholder="+256 700 000 000" />
                  </div>
                </div>
                <div>
                  <label className={lc}>Home Address</label>
                  <input type="text" value={form.address} onChange={e => up('address', e.target.value)} className={ic} placeholder="Village / area / city" />
                </div>
                <div>
                  <label className={lc}>Emergency Contact Number *</label>
                  <input required type="tel" value={form.emergency_contact} onChange={e => up('emergency_contact', e.target.value)} className={ic} placeholder="Alternative number in case of emergency" />
                </div>
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-4 rounded-xl">Something went wrong. Please try again or call us directly.</p>
            )}

            <button type="submit" disabled={status === 'loading'} className="w-full py-4 bg-[#F4720B] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#c95c08] transition-colors disabled:opacity-70">
              {status === 'loading' ? 'Submitting...' : <><ArrowRight size={20} /> Submit Application</>}
            </button>
            <p className="text-center text-xs text-gray-400">By submitting this form, you confirm that the information provided is accurate. The school will contact you to confirm enrollment.</p>
          </form>
        </div>
      </section>
    </div>
  )
}
