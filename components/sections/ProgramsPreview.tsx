
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Baby, BookOpen } from 'lucide-react'

export default function ProgramsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Our Programs</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">From First Steps to Final Exams</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Two complete programs covering every stage of your child's early education journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Nursery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#195F2E] rounded-3xl p-8 hover:shadow-2xl transition-shadow"
          >
            <span className="inline-block bg-[#F4720B]/20 text-[#F4720B] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">Ages 3–6</span>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F4720B]/15 flex items-center justify-center shrink-0">
                <Baby size={28} className="text-[#F4720B]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-2xl">Nursery Section</h3>
                <p className="text-green-300 text-sm mt-0.5">Baby Class · Middle Class · Top Class</p>
              </div>
            </div>
            <p className="text-green-100 leading-relaxed text-sm mb-6">
              A warm, play-based environment where young children develop social skills, early literacy, and a genuine love for learning — preparing them for the transition to primary school.
            </p>
            <ul className="space-y-2 mb-8">
              {['Play-based early childhood learning', 'Early phonics & numeracy', 'Art, music & creative expression', 'Bilingual instruction (English & Luganda)'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4720B]" />{f}
                </li>
              ))}
            </ul>
            <Link href="/academics#nursery" className="inline-flex items-center gap-2 text-[#F4720B] font-semibold text-sm hover:gap-3 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Primary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow"
          >
            <span className="inline-block bg-[#195F2E]/10 text-[#195F2E] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">P1 – P7</span>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#195F2E]/10 flex items-center justify-center shrink-0">
                <BookOpen size={28} className="text-[#195F2E]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-2xl">Primary Section</h3>
                <p className="text-gray-400 text-sm mt-0.5">Primary 1 through Primary 7 (PLE)</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              A structured national curriculum aligned with Uganda's NCDC standards, building strong academic foundations and preparing pupils for the Primary Leaving Examination.
            </p>
            <ul className="space-y-2 mb-8">
              {['Uganda national curriculum (NCDC)', 'PLE exam preparation & revision', 'Science, math, English & social studies', 'Sports & co-curricular activities'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#195F2E]" />{f}
                </li>
              ))}
            </ul>
            <Link href="/academics#primary" className="inline-flex items-center gap-2 text-[#195F2E] font-semibold text-sm hover:gap-3 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
