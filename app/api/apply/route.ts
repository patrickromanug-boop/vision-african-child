import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { resend, FROM_EMAIL, SCHOOL_EMAIL } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { child_name, date_of_birth, gender, parent_name, parent_email, parent_phone, address, grade_applying, previous_school, emergency_contact, medical_info } = body

    if (!child_name || !date_of_birth || !gender || !parent_name || !parent_email || !parent_phone || !grade_applying || !emergency_contact) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase.from('applications').insert({
      child_name, date_of_birth, gender, parent_name, parent_email, parent_phone,
      address, grade_applying, previous_school, emergency_contact, medical_info, status: 'Pending',
    }).select().single()

    if (error) throw error

    await resend.emails.send({
      from: FROM_EMAIL, to: SCHOOL_EMAIL,
      subject: `New Admission Application – ${child_name} (${grade_applying})`,
      html: `<div style="font-family:Arial;max-width:600px;margin:0 auto">
        <div style="background:#195F2E;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="color:white;margin:0">New Admission Application</h2>
        </div>
        <div style="padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
          <h3 style="color:#195F2E">Child Details</h3>
          <p><strong>Name:</strong> ${child_name}</p>
          <p><strong>DOB:</strong> ${date_of_birth}</p>
          <p><strong>Gender:</strong> ${gender}</p>
          <p><strong>Grade Applying:</strong> ${grade_applying}</p>
          <p><strong>Previous School:</strong> ${previous_school || 'N/A'}</p>
          ${medical_info ? `<p style="background:#fff3cd;padding:10px;border-radius:6px"><strong>⚠️ Medical Info:</strong> ${medical_info}</p>` : ''}
          <h3 style="color:#195F2E">Parent/Guardian</h3>
          <p><strong>Name:</strong> ${parent_name}</p>
          <p><strong>Email:</strong> <a href="mailto:${parent_email}">${parent_email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${parent_phone}">${parent_phone}</a></p>
          <p><strong>Emergency Contact:</strong> ${emergency_contact}</p>
        </div>
      </div>`
    })

    await resend.emails.send({
      from: FROM_EMAIL, to: parent_email,
      subject: `Application Received – ${child_name} | Vision African Child School`,
      html: `<div style="font-family:Arial;max-width:600px;margin:0 auto">
        <div style="background:#195F2E;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="color:white;margin:0">Application Received!</h2>
        </div>
        <div style="padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
          <p>Dear <strong>${parent_name}</strong>,</p>
          <p>We have received the admission application for <strong>${child_name}</strong> for <strong>${grade_applying}</strong>.</p>
          <div style="background:#f0fdf4;padding:15px;border-radius:6px;border-left:4px solid #195F2E;margin:15px 0">
            <strong style="color:#195F2E">What happens next:</strong>
            <ol style="margin:8px 0;padding-left:20px;color:#555">
              <li>Our team will review your application within 2–3 business days</li>
              <li>You will be contacted to schedule a school visit</li>
              <li>Upon successful review, you will receive a formal admission letter</li>
              <li>Paying the required fees confirms your child's place</li>
            </ol>
          </div>
          <p><strong>Phone/WhatsApp:</strong> +256 700 000 000</p>
          <p>We look forward to welcoming ${child_name} into our school family!</p>
          <p>Best regards,<br/><strong>Vision African Child Nursery & Primary School</strong></p>
        </div>
      </div>`
    })

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
