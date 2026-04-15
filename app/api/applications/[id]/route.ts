import { NextRequest } from 'next/server'
import pool from '@/lib/db'
import jwt from 'jsonwebtoken'

function getUserId(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    return decoded.userId
  } catch {
    return null
  }
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserId(req)
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { company, role, status, notes, applied_date } = await req.json()
  const { id } = await params

  const result = await pool.query(
    'UPDATE applications SET company = $1, role = $2, status = $3, notes = $4, applied_date = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
    [company, role, status, notes, applied_date, id, userId]
  )

  if (result.rows.length === 0) {
    return Response.json({ error: 'Application not found' }, { status: 404 })
  }

  return Response.json(result.rows[0])
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserId(req)
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const result = await pool.query(
    'DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, userId]
  )

  if (result.rows.length === 0) {
    return Response.json({ error: 'Application not found' }, { status: 404 })
  }

  return Response.json({ message: 'Application deleted successfully' })
}