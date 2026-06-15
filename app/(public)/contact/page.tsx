
import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Vision African Child School. We\'d love to hear from you about admissions, fees, or any questions.',
}

export default function ContactPage() {
  return (
    <div>
      <div className="bg-[#195F2E] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#F4720B] font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Contact Us</h1>
          <p className="text-green-200 text-lg max-w-xl mx-auto">Reach out about admissions, fees, or anything else — we're happy to help.</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">School Information</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: 'Address', value: 'Busabala Trading Centre, Wakiso District, Uganda', href: undefined },
                { icon: Phone, label: 'Phone', value: '+256 700 000 000', href: 'tel:+256700000000' },
                { icon: Mail, label: 'Email', value: 'info@visionafricanchild.ug', href: 'mailto:info@visionafricanchild.ug' },
                { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 8:00am – 5:00pm | Sat: 9:00am – 1:00pm', href: undefined },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-12 h-12 bg-[#195F2E]/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-[#195F2E]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-gray-700 hover:text-[#195F2E] transition-colors text-sm">{item.value}</a>
                    ) : (
                      <p className="text-gray-700 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8!2d32.51!3d0.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBusabala%2C+Wakiso!5e0!3m2!1sen!2sug!4v1"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="School Location"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
