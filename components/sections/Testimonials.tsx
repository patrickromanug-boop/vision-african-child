
import { createClient } from '@/lib/supabase/server'
import { Quote } from 'lucide-react'
import type { Testimonial } from '@/types'

export default async function Testimonials() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .limit(3)

  if (!testimonials?.length) return null

  return (
    <section className="py-20 bg-[#195F2E]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">What Parents Say</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">Trusted by Families</h2>
          <p className="text-green-200 max-w-md mx-auto text-sm">
            Don't just take our word for it — hear from the parents who trust us with their children.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t: Testimonial) => (
            <div key={t.id} className="bg-white/10 backdrop-blur rounded-2xl p-7 border border-white/10">
              <Quote size={26} className="text-[#F4720B] mb-4" />
              <p className="text-green-50 leading-relaxed mb-6 text-sm">"{t.message}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F4720B] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{t.parent_name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.parent_name}</p>
                  {t.child_grade && <p className="text-green-300 text-xs">Parent · {t.child_grade}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
