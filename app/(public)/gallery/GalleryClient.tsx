
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage, GalleryCategory } from '@/types'

const categories: { label: string; value: GalleryCategory | 'All' }[] = [
  { label: 'All Photos', value: 'All' },
  { label: 'Classrooms', value: 'Classrooms' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Events', value: 'Events' },
  { label: 'Graduation', value: 'Graduation' },
  { label: 'General', value: 'General' },
]

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryCategory | 'All'>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = active === 'All' ? images : images.filter(img => img.category === active)

  const prev = () => lightbox !== null && setLightbox((lightbox - 1 + filtered.length) % filtered.length)
  const next = () => lightbox !== null && setLightbox((lightbox + 1) % filtered.length)

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              active === cat.value ? 'bg-[#195F2E] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightbox(i)}
              className="relative aspect-square overflow-hidden rounded-2xl group"
            >
              <Image
                src={img.image_url}
                alt={img.caption || 'School photo'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                {img.caption && (
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {img.caption}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="font-medium">No photos in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
            <ChevronLeft size={22} />
          </button>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <Image src={filtered[lightbox].image_url} alt={filtered[lightbox].caption || ''} width={1200} height={800} className="object-contain w-full h-auto max-h-[80vh] rounded-xl" />
            {filtered[lightbox].caption && <p className="text-white/70 text-sm text-center mt-3">{filtered[lightbox].caption}</p>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
            <ChevronRight size={22} />
          </button>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
            <X size={18} />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">{lightbox + 1} / {filtered.length}</p>
        </div>
      )}
    </>
  )
}
