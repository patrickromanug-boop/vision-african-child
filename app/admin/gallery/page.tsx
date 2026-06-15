
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Upload, Trash2 } from 'lucide-react'
import type { GalleryImage, GalleryCategory } from '@/types'

const categories: GalleryCategory[] = ['General', 'Classrooms', 'Sports', 'Events', 'Graduation']

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState<GalleryCategory>('General')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    createClient().from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setImages(data || []); setLoading(false) })
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`

    const { error } = await supabase.storage.from('gallery').upload(filename, file)
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return }

    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filename)
    const { data } = await supabase.from('gallery').insert({ filename, caption: caption || null, category, image_url: publicUrl }).select().single()

    if (data) setImages(prev => [data, ...prev])
    setCaption('')
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const remove = async (id: string, filename: string) => {
    if (!confirm('Delete this photo?')) return
    const supabase = createClient()
    await supabase.storage.from('gallery').remove([filename])
    await supabase.from('gallery').delete().eq('id', id)
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const ic = "w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#195F2E] text-sm"

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <p className="text-gray-500 text-sm mt-1">Upload and manage school photos</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Upload New Photo</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Caption (optional)</label>
            <input value={caption} onChange={e => setCaption(e.target.value)} className={ic} placeholder="Photo description..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value as GalleryCategory)} className={ic}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Photo File</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-[#195F2E] transition-colors" onClick={() => !uploading && fileRef.current?.click()}>
              <Upload size={16} className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-400">{uploading ? 'Uploading...' : 'Click to upload'}</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </div>
        </div>
      </div>

      {loading
        ? <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />)}</div>
        : images.length === 0
          ? <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100"><Upload size={48} className="mx-auto mb-4 opacity-20" /><p>No photos uploaded yet.</p></div>
          : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-2xl group">
                  <Image src={img.image_url} alt={img.caption || ''} fill className="object-cover" sizes="25vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-2">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center px-3">
                      {img.caption && <p className="text-white text-xs mb-1">{img.caption}</p>}
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded-full">{img.category}</span>
                    </div>
                    <button onClick={() => remove(img.id, img.filename)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
      }
    </div>
  )
}
