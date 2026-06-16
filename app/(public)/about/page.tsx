import type { Metadata } from 'next'
import { Target, Eye, Heart, Award, Users, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Vision African Child Nursery & Primary School — our history, mission, vision, and dedicated teaching staff.',
}

const values = [
  { icon: Heart, title: 'Compassion', desc: 'Every child is treated with kindness, care, and deep respect.' },
  { icon: Award, title: 'Excellence', desc: 'We maintain high academic and behavioral standards at all times.' },
  { icon: Users, title: 'Community', desc: 'We build strong bonds between school, parents, and the local community.' },
  { icon: BookOpen, title: 'Integrity', desc: 'Honesty and strong moral values guide everything we do.' },
]

const staff = [
  { name: 'Head Teacher', role: 'Head Teacher', initials: 'HT' },
  { name: 'Deputy Head', role: 'Deputy Head Teacher', initials: 'DH' },
  { name: 'Senior Teacher', role: 'Senior Teacher – Primary', initials: 'ST' },
  { name: 'Nursery Head', role: 'Head of Nursery Section', initials: 'NH' },
]

export default function AboutPage() {
  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">About Our School</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">Built on love, discipline, and the belief that every child deserves quality education.</p>
        </div>
      </div>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Our History</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">A Decade of Nurturing Young Minds</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
              <p>Vision African Child Nursery and Primary School was founded in 2015 in Busabala Trading Centre, Wakiso District, with a simple but powerful vision: to provide quality, affordable education to children in the local community.</p>
              <p>What started as a small nursery has grown into a full nursery and primary school serving over 200 children — from Baby Class all the way through Primary 7, preparing pupils for the national Primary Leaving Examination (PLE).</p>
              <p>Over the years, our graduates have gone on to join some of the best secondary schools in Uganda, a testament to the strong academic foundation we provide every single day.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { year: '2015', event: 'School founded in Busabala' },
              { year: '2017', event: 'Primary section opened (P1–P4)' },
              { year: '2019', event: 'First PLE candidates sit exams' },
              { year: '2024', event: '200+ pupils enrolled' },
            ].map((item) => (
              <div key={item.year} className="bg-gray-50 rounded-2xl p-6">
                <p className="text-3xl font-bold text-[#195F2E]">{item.year}</p>
                <p className="text-gray-600 text-sm mt-1">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#FBF8F5]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-[#195F2E] rounded-3xl p-10 text-white">
            <Target size={36} className="text-[#F4720B] mb-5" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-green-100 leading-relaxed text-sm">To provide a nurturing, inclusive, and high-quality educational environment that equips every child with the academic knowledge, moral values, and life skills needed to succeed in school and beyond.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-10">
            <Eye size={36} className="text-[#195F2E] mb-5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-sm">To be the most trusted and respected educational institution in Wakiso District — a school where every child's potential is discovered, developed, and celebrated.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#195F2E]/5 transition-colors">
                <div className="w-14 h-14 bg-[#195F2E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={26} className="text-[#195F2E]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-20 bg-[#FBF8F5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Meet the Staff</h2>
            <p className="text-gray-500 mt-2 text-sm">Dedicated educators committed to your child's success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((member) => (
              <div key={member.role} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-[#195F2E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{member.initials}</span>
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#F4720B] text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
