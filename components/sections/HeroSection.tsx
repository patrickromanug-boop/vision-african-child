
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#195F2E]">

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow blobs */}
      <div className="absolute top-16 right-16 w-80 h-80 rounded-full bg-[#F4720B]/15 blur-3xl" />
      <div className="absolute bottom-16 left-8 w-56 h-56 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#F4720B] animate-pulse" />
            Now Accepting Enrollments
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Nurturing
            <span className="text-[#F4720B]"> Young Minds</span>
            <br />in Busabala
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg"
          >
            Quality nursery and primary education at the heart of Wakiso District.
            Building tomorrow's leaders with strong values, academic excellence, and a loving environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 px-7 py-4 bg-[#F4720B] text-white rounded-xl font-bold hover:bg-[#c95c08] transition-all hover:scale-[1.02]"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 px-7 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="w-full h-56 bg-green-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#195F2E]/20 to-[#F4720B]/20" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-[#195F2E] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-2xl">V</span>
                  </div>
                  <p className="text-[#195F2E] font-semibold text-sm">Vision African Child School</p>
                  <p className="text-gray-400 text-xs mt-1">Replace with school photo</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Founded', value: '2015' },
                  { label: 'Location', value: 'Busabala, Wakiso' },
                  { label: 'Programs', value: 'Nursery & Primary (P1–P7)' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className="font-semibold text-[#195F2E] text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#F4720B] text-white rounded-2xl p-4 shadow-xl">
              <p className="font-bold text-2xl">100%</p>
              <p className="text-xs text-orange-100">Happy Families</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <p className="font-bold text-xl text-[#195F2E]">Safe &</p>
              <p className="font-bold text-xl text-[#195F2E]">Caring</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
