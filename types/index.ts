export type ApplicationStatus = 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected'
export type GalleryCategory = 'General' | 'Classrooms' | 'Sports' | 'Events' | 'Graduation'

export interface Application {
  id: string
  child_name: string
  date_of_birth: string
  gender: string
  parent_name: string
  parent_email: string
  parent_phone: string
  address: string | null
  grade_applying: string
  previous_school: string | null
  emergency_contact: string | null
  medical_info: string | null
  status: ApplicationStatus
  created_at: string
  updated_at: string
}

export interface Fee {
  id: string
  grade: string
  term: string
  tuition: number
  activity_fee: number
  other_fee: number
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  description: string
  is_published: boolean
  announcement_date: string
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  filename: string
  caption: string | null
  category: GalleryCategory
  image_url: string
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  parent_name: string
  child_grade: string | null
  message: string
  is_active: boolean
  created_at: string
}
