export type User = {
  id: number
  name: string
  email: string
  created_at: string
}

export type Application = {
  id: number
  user_id: number
  company: string
  role: string
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected'
  notes: string
  applied_date: string
  created_at: string
}