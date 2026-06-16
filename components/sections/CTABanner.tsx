
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-[#F4720B] rounded-3xl p-12 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/4" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Give Your Child the Best Start</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Enrollment is open. Secure your child's spot today at Vision African Child School.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#F4720B] rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Start Application <ArrowRight size={18} />
              </Link>
              <a href="tel:+256700000000" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/25 transition-colors">
                <Phone size={18} /> Call Us Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
