
'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Shield, Heart, DollarSign, Star, Clock } from 'lucide-react'

const reasons = [
  { icon: GraduationCap, title: 'Qualified Teachers', description: 'Government-certified, experienced teachers who are passionate about every child\'s growth and success.' },
  { icon: Shield, title: 'Safe Environment', description: 'A secure, well-supervised campus where your child\'s safety and wellbeing always come first.' },
  { icon: Heart, title: 'Holistic Development', description: 'We build character, confidence, and creativity alongside academics — the whole child, not just grades.' },
  { icon: DollarSign, title: 'Affordable Fees', description: 'Quality education should be accessible to every family. Our fee structure is transparent and fair.' },
  { icon: Star, title: 'Strong PLE Results', description: 'Our Primary 7 pupils consistently achieve excellent results in the national PLE examinations.' },
  { icon: Clock, title: 'Flexible Programs', description: 'Morning and afternoon schedules available, with options to suit working parents in Wakiso.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Why Parents Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">The Best Start for Your Child</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            At Vision African Child, we go beyond the classroom to build well-rounded, confident young people.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#195F2E]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#195F2E] transition-colors">
                <reason.icon size={26} className="text-[#195F2E] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
