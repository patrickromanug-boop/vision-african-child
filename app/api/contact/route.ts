import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resend, FROM_EMAIL, SCHOOL_EMAIL } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const supabase = await createClient()
    await supabase.from('inquiries').insert({ name, email, phone, subject, message })

    await resend.emails.send({
      from: FROM_EMAIL, to: SCHOOL_EMAIL,
      subject: `New Inquiry: ${subject || 'Contact Form'}`,
      html: `<div style="font-family:Arial;max-width:600px;margin:0 auto">
        <div style="background:#195F2E;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="color:white;margin:0">New Contact Inquiry</h2>
        </div>
        <div style="padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject || 'General inquiry'}</p>
          <div style="background:#f5f5f5;padding:15px;border-radius:6px;margin-top:10px">
            <strong>Message:</strong><br/>${message}
          </div>
        </div>
      </div>`
    })

    await resend.emails.send({
      from: FROM_EMAIL, to: email,
      subject: 'We received your message – Vision African Child School',
      html: `<div style="font-family:Arial;max-width:600px;margin:0 auto">
        <div style="background:#195F2E;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="color:white;margin:0">Thank You for Reaching Out</h2>
        </div>
        <div style="padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for contacting Vision African Child Nursery and Primary School. We have received your message and will get back to you within <strong>24 hours</strong>.</p>
          <p>If urgent, please call us directly at <strong>+256 700 000 000</strong>.</p>
          <p>Best regards,<br/><strong>Vision African Child School</strong><br/>Busabala Trading Centre, Wakiso</p>
        </div>
      </div>`
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
