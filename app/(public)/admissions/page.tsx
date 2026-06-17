import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, CheckCircle, FileText, Phone, UserCheck, CreditCard } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Fee } from '@/types'

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Apply for enrollment at Vision African Child School. View our admissions process, requirements, and fee structure.',
}

const steps = [
  { icon: Phone, step: '01', title: 'Inquire', desc: 'Call or fill our online inquiry form to express interest.' },
  { icon: FileText, step: '02', title: 'Apply', desc: 'Complete the online application form with your child\'s details.' },
  { icon: UserCheck, step: '03', title: 'Visit', desc: 'Bring your child to school for a brief assessment and tour.' },
  { icon: CreditCard, step: '04', title: 'Enroll', desc: 'Pay the required fees and receive your child\'s admission letter.' },
]

export default async function AdmissionsPage() {
  const supabase = await createClient()
  const { data: fees } = await supabase.from('fees').select('*').order('created_at')

  const nurseryFees = fees?.filter((f: Fee) => ['Baby Class', 'Middle Class', 'Top Class'].includes(f.grade)) || []
  const primaryFees = fees?.filter((f: Fee) => f.grade.startsWith('Primary')) || []

  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Join Our School</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Admissions</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">We welcome new pupils throughout the year. Enrollment is simple and parent-friendly.</p>
        </div>
      </div>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Enrollment in 4 Easy Steps</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-16 h-16 bg-[#195F2E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <s.icon size={26} className="text-white" />
                </div>
                <span className="text-[#F4720B] font-bold text-xs">{s.step}</span>
                <h3 className="font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-[#FBF8F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">What You Need</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Admission Requirements</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Nursery Section',
                reqs: ["Child's birth certificate (original + copy)", 'Passport-size photographs (x4)', "Child's immunization card", "Parent/guardian national ID copy"],
              },
              {
                title: 'Primary Section',
                reqs: ['Previous school report card or leaving certificate', "Child's birth certificate (original + copy)", 'Passport-size photographs (x4)', "Parent/guardian national ID copy", 'Transfer letter (if transferring from another school)'],
              },
            ].map((section) => (
              <div key={section.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-5">{section.title}</h3>
                <ul className="space-y-3">
                  {section.reqs.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#195F2E] mt-0.5 shrink-0" />
                      <span className="text-gray-600 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Transparent Pricing</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Fee Structure</h2>
            <p className="text-gray-500 mt-2 text-sm">All fees are per term. No hidden charges.</p>
          </div>

          {fees && fees.length > 0 ? (
            <div className="space-y-10">
              {[{ title: 'Nursery Section', data: nurseryFees }, { title: 'Primary Section', data: primaryFees }].map((group) =>
                group.data.length > 0 ? (
                  <div key={group.title}>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">{group.title}</h3>
                    <div className="overflow-x-auto rounded-2xl border border-gray-200">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-[#195F2E] text-white">
                            {['Grade', 'Tuition', 'Activity Fee', 'Other', 'Total / Term'].map(h => (
                              <th key={h} className={`px-6 py-4 font-semibold ${h === 'Grade' ? 'text-left' : 'text-right'}`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {group.data.map((fee: Fee, i: number) => (
                            <tr key={fee.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 font-medium text-gray-900">{fee.grade}</td>
                              <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(fee.tuition)}</td>
                              <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(fee.activity_fee)}</td>
                              <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(fee.other_fee)}</td>
                              <td className="px-6 py-4 text-right font-bold text-[#195F2E]">
                                {formatCurrency(fee.tuition + fee.activity_fee + fee.other_fee)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-center py-12 text-gray-400">Fee structure coming soon. Please contact us directly for current fees.</p>
          )}

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F4720B] text-white rounded-xl font-bold hover:bg-[#c95c08] transition-colors">
              Apply Now <ArrowRight size={18} />
            </Link>
           <button onClick={() => window.open('tel:+256700000000', '_self')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
  <Phone size={18} /> Call for More Info
</button>
          </div>
        </div>
      </section>
    </div>
  )
}
