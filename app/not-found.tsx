
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#195F2E] flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-9xl font-bold text-white/10 mb-2">404</p>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-green-200 mb-8 max-w-sm mx-auto text-sm">The page you're looking for doesn't exist or may have been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4720B] text-white rounded-xl font-semibold hover:bg-[#c95c08] transition-colors">
          <Home size={18} /> Go Back Home
        </Link>
      </div>
    </div>
  )
}
