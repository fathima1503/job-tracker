import { getToken } from '@/lib/auth'

const BASE_URL = '/api'

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}

export async function getApplications() {
  const res = await fetch(`${BASE_URL}/applications`, {
    headers: authHeaders()
  })
  return res.json()
}

export async function createApplication(data: {
  company: string
  role: string
  status: string
  notes: string
  applied_date: string
}) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateApplication(id: number, data: {
  company: string
  role: string
  status: string
  notes: string
  applied_date: string
}) {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteApplication(id: number) {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  return res.json()
}