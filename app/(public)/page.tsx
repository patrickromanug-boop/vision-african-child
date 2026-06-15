
import { Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ProgramsPreview from '@/components/sections/ProgramsPreview'
import AnnouncementsHome from '@/components/sections/AnnouncementsHome'
import GalleryTeaser from '@/components/sections/GalleryTeaser'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'

function Skeleton() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-48 bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <WhyChooseUs />
      <ProgramsPreview />
      <Suspense fallback={<Skeleton />}><AnnouncementsHome /></Suspense>
      <Suspense fallback={<Skeleton />}><GalleryTeaser /></Suspense>
      <Suspense fallback={<Skeleton />}><Testimonials /></Suspense>
      <CTABanner />
    </>
  )
}
