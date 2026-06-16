
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Images } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { GalleryImage } from '@/types'

export default async function GalleryTeaser() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">School Life</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">A Glimpse Inside</h2>
          </div>
          <Link href="/gallery" className="flex items-center gap-2 text-[#195F2E] font-semibold text-sm hover:text-[#F4720B] transition-colors shrink-0">
            Full Gallery <ArrowRight size={16} />
          </Link>
        </div>

        {images && images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img: GalleryImage, i: number) => (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'md:col-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '16/9' : '1' }}
              >
                <Image
                  src={img.image_url}
                  alt={img.caption || 'School photo'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
                  {img.caption && (
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {img.caption}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`bg-gray-100 rounded-2xl flex items-center justify-center ${i === 0 ? 'md:col-span-2' : ''}`} style={{ aspectRatio: i === 0 ? '16/9' : '1' }}>
                <Images size={32} className="text-gray-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
