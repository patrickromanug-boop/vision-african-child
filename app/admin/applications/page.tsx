'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import { Search, Eye } from 'lucide-react'
import type { Application, ApplicationStatus } from '@/types'

const statusColors: Record<ApplicationStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Reviewed: 'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<ApplicationStatus | 'All'>('All')
  const [selected, setSelected] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createClient().from('applications').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setApps(data || []); setLoading(false) })
  }, [])

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    await createClient().from('applications').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    setSelected(prev => prev?.id === id ? { ...prev, status } : prev)
  }

  const filtered = apps.filter(a =>
    (filter === 'All' || a.status === filter) &&
    (a.child_name.toLowerCase().includes(search.toLowerCase()) || a.parent_name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all admission applications</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by child or parent name..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#195F2E] text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'Pending', 'Reviewed', 'Accepted', 'Rejected'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${filter === s ? 'bg-[#195F2E] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Child', 'Grade', 'Parent', 'Applied', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-6 py-4 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td></tr>)
                : filtered.length === 0
                  ? <tr><td colSpan={6} className="px-6 py-14 text-center text-gray-400">No applications found</td></tr>
                  : filtered.map(app => (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-medium text-gray-900">{app.child_name}</td>
                      <td className="px-6 py-4 text-gray-500">{app.grade_applying}</td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{app.parent_name}</p>
                        <p className="text-xs text-gray-400">{app.parent_phone}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{formatDate(app.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>{app.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelected(app)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                            <Eye size={14} />
                          </button>
                          <select value={app.status} onChange={e => updateStatus(app.id, e.target.value as ApplicationStatus)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#195F2E]">
                            {['Pending', 'Reviewed', 'Accepted', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-900 text-lg mb-5">Application Details</h2>
            <div className="space-y-2.5 text-sm mb-6">
              {[
                ['Child Name', selected.child_name],
                ['Date of Birth', formatDate(selected.date_of_birth)],
                ['Gender', selected.gender],
                ['Grade Applying', selected.grade_applying],
                ['Previous School', selected.previous_school || 'N/A'],
                ['Parent Name', selected.parent_name],
                ['Parent Email', selected.parent_email],
                ['Parent Phone', selected.parent_phone],
                ['Address', selected.address || 'N/A'],
                ['Emergency Contact', selected.emergency_contact || 'N/A'],
                ['Medical Info', selected.medical_info || 'None'],
                ['Applied On', formatDate(selected.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="w-36 text-gray-400 shrink-0">{label}</span>
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t pt-5">
              <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value as ApplicationStatus)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#195F2E]">
                {['Pending', 'Reviewed', 'Accepted', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => setSelected(null)} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
