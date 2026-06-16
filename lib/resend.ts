import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
export const SCHOOL_EMAIL = process.env.ADMIN_EMAIL!
export const FROM_EMAIL = 'Vision African Child <no-reply@visionafricanchild.ug>'
