'use client'

import { motion } from 'framer-motion'
import { Award, Users, BookOpen, MapPin } from 'lucide-react'

const stats = [
  { icon: Award, value: '2015', label: 'Year Founded', suffix: '' },
  { icon: Users, value: '200', label: 'Happy Pupils', suffix: '+' },
  { icon: BookOpen, value: '2', label: 'Programs Offered', suffix: '' },
  { icon: MapPin, value: 'Busabala', label: 'Wakiso District', suffix: '' }
]

export default function TrustBar() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl bg-gray-50 group hover:bg-[#195F2E]/5 transition-colors"
          >
            <div className="w-12 h-12 bg-[#195F2E]/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#195F2E] transition-colors">
              <stat.icon size={22} className="text-[#195F2E] group-hover:text-white transition-colors" />
            </div>
            <p className="text-3xl font-bold text-[#195F2E]">{stat.value}{stat.suffix}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
