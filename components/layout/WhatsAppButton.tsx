
'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '256700000000'
  const message = encodeURIComponent(
    'Hello! I am interested in enrolling my child at Vision African Child School. Can you please help me?'
  )
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
    >
      <MessageCircle size={22} fill="white" />
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp Us</span>
    </a>
  )
}
