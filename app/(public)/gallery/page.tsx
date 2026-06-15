
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Images } from 'lucide-react'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse photos from school life, sports days, events, and classrooms at Vision African Child School.',
}

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">School Life</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Photo Gallery</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">A visual journey through life at Vision African Child School.</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {images && images.length > 0 ? (
            <GalleryClient images={images} />
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Images size={56} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No photos yet</p>
              <p className="text-sm mt-1">Check back soon for photos from school activities.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
