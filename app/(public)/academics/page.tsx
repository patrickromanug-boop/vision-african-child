
import type { Metadata } from 'next'
import { Baby, BookOpen, Trophy, Music, Palette, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore our nursery and primary programs, curriculum, subjects, and co-curricular activities.',
}

const nurseryLevels = [
  { name: 'Baby Class', age: 'Age 3–4', desc: 'Introduction to school through play, storytelling, drawing, and early phonics.' },
  { name: 'Middle Class', age: 'Age 4–5', desc: 'Building on foundational skills with structured literacy, numeracy, and creativity.' },
  { name: 'Top Class', age: 'Age 5–6', desc: 'Preparation for Primary 1 — reading, writing, counting, and social confidence.' },
]

const primarySubjects = [
  'English Language', 'Mathematics', 'Science', 'Social Studies',
  'Religious Education', 'Kiswahili', 'Physical Education', 'Creative Arts',
]

const activities = [
  { icon: Trophy, name: 'Sports & Athletics', desc: 'Football, netball, and inter-school competitions.' },
  { icon: Music, name: 'Music & Performing Arts', desc: 'Choir, drama, dance, and cultural performances.' },
  { icon: Palette, name: 'Art & Craft', desc: 'Drawing, painting, and creative craft workshops.' },
  { icon: Globe, name: 'Environmental Club', desc: 'Tree planting, gardening, and eco-awareness.' },
]

export default function AcademicsPage() {
  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Curriculum</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Our Academic Programs</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">A complete curriculum developing academic excellence alongside life skills and strong character.</p>
        </div>
      </div>

      {/* Nursery */}
      <section id="nursery" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#195F2E]/10 text-[#195F2E] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Baby size={16} /> Nursery Section
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Early Childhood Education</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm">Our nursery program provides a safe, stimulating environment where children learn through play, exploration, and guided activities — building social, emotional, and early academic foundations.</p>
            <div className="space-y-4">
              {nurseryLevels.map((level) => (
                <div key={level.name} className="flex gap-4 p-5 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#195F2E] rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {level.name.split(' ')[0].charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{level.name}</h3>
                      <span className="text-xs bg-[#F4720B]/10 text-[#F4720B] px-2 py-0.5 rounded-full">{level.age}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{level.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#195F2E] rounded-3xl p-10 text-white">
            <h3 className="font-bold text-xl mb-6">What Your Child Will Learn</h3>
            <ul className="space-y-3">
              {['Pre-reading & phonics', 'Pre-writing & hand-eye coordination', 'Number recognition & early maths', 'Colors, shapes & patterns', 'Social skills & teamwork', 'Hygiene & self-care habits', 'Creative expression through art & music', 'English & Luganda language exposure'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4720B] shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Primary */}
      <section id="primary" className="py-20 bg-[#FBF8F5] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Subjects Taught</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {primarySubjects.map((subject) => (
                <div key={subject} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#195F2E] shrink-0" />{subject}
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#195F2E]/5 rounded-xl border border-[#195F2E]/10">
              <p className="text-[#195F2E] font-semibold text-sm mb-1">PLE Preparation</p>
              <p className="text-gray-600 text-sm">Primary 7 pupils receive intensive exam preparation, past paper practice, and continuous assessment to ensure strong PLE results.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-[#F4720B]/10 text-[#F4720B] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BookOpen size={16} /> Primary Section
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Primary Education (P1 – P7)</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm">Our primary program follows the Uganda National Curriculum as set by NCDC. From Primary 1 through Primary 7, we build strong academic foundations across all core subjects.</p>
            <p className="text-gray-600 leading-relaxed text-sm">Our Primary 7 pupils sit the national PLE, and our results speak to our quality. Many graduates go on to join top secondary schools across Uganda.</p>
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Beyond the Classroom</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Co-Curricular Activities</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">A child's development goes far beyond academics. Our program builds confidence, teamwork, and creativity.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((act) => (
              <div key={act.name} className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-[#195F2E]/5 transition-colors">
                <div className="w-14 h-14 bg-[#195F2E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <act.icon size={26} className="text-[#195F2E]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{act.name}</h3>
                <p className="text-gray-500 text-sm">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
