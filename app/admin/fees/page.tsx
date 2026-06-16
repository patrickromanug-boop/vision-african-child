'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Save } from 'lucide-react'
import type { Fee } from '@/types'

const empty = { grade: '', term: 'Term 1', tuition: 0, activity_fee: 0, other_fee: 0 }

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newFee, setNewFee] = useState(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    createClient().from('fees').select('*').order('created_at')
      .then(({ data }) => { setFees(data || []); setLoading(false) })
  }, [])

  const add = async () => {
    if (!newFee.grade) return
    setSaving(true)
    const { data } = await createClient().from('fees').insert(newFee).select().single()
    if (data) setFees(prev => [...prev, data])
    setNewFee(empty)
    setShowAdd(false)
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    await createClient().from('fees').delete().eq('id', id)
    setFees(prev => prev.filter(f => f.id !== id))
  }

  const update = async (id: string, field: string, value: string | number) => {
    await createClient().from('fees').update({ [field]: value }).eq('id', id)
    setFees(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f))
  }

  const ic = "border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#195F2E] w-full"

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Structure</h1>
          <p className="text-gray-500 text-sm mt-1">Manage fees displayed on the public admissions page</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#195F2E] text-white rounded-xl text-sm font-semibold hover:bg-[#124820] transition-colors">
          <Plus size={16} /> Add Row
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">New Fee Entry</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {[
              { label: 'Grade', key: 'grade', type: 'text', placeholder: 'e.g., Primary 1' },
              { label: 'Term', key: 'term', type: 'text', placeholder: 'e.g., Term 1' },
              { label: 'Tuition (UGX)', key: 'tuition', type: 'number', placeholder: '0' },
              { label: 'Activity Fee', key: 'activity_fee', type: 'number', placeholder: '0' },
              { label: 'Other Fee', key: 'other_fee', type: 'number', placeholder: '0' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  value={newFee[f.key as keyof typeof newFee]}
                  onChange={e => setNewFee(p => ({ ...p, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                  className={ic} />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={add} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#195F2E] text-white rounded-xl text-sm font-semibold disabled:opacity-70">
              <Save size={14} /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Grade', 'Term', 'Tuition', 'Activity Fee', 'Other', 'Total', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={7} className="px-5 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>)
                : fees.map(fee => (
                  <tr key={fee.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3"><input value={fee.grade} onChange={e => update(fee.id, 'grade', e.target.value)} className="border-0 bg-transparent focus:bg-gray-100 focus:outline-none px-2 py-1 rounded w-full font-medium" /></td>
                    <td className="px-5 py-3"><input value={fee.term} onChange={e => update(fee.id, 'term', e.target.value)} className="border-0 bg-transparent focus:bg-gray-100 focus:outline-none px-2 py-1 rounded w-full" /></td>
                    <td className="px-5 py-3"><input type="number" value={fee.tuition} onChange={e => update(fee.id, 'tuition', Number(e.target.value))} className="border-0 bg-transparent focus:bg-gray-100 focus:outline-none px-2 py-1 rounded w-28" /></td>
                    <td className="px-5 py-3"><input type="number" value={fee.activity_fee} onChange={e => update(fee.id, 'activity_fee', Number(e.target.value))} className="border-0 bg-transparent focus:bg-gray-100 focus:outline-none px-2 py-1 rounded w-28" /></td>
                    <td className="px-5 py-3"><input type="number" value={fee.other_fee} onChange={e => update(fee.id, 'other_fee', Number(e.target.value))} className="border-0 bg-transparent focus:bg-gray-100 focus:outline-none px-2 py-1 rounded w-24" /></td>
                    <td className="px-5 py-3 font-bold text-[#195F2E]">{(fee.tuition + fee.activity_fee + fee.other_fee).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <button onClick={() => remove(fee.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
