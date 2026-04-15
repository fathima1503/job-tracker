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

export async function GET(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await pool.query(
    'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )

  return Response.json(result.rows)
}

export async function POST(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { company, role, status, notes, applied_date } = await req.json()

  const result = await pool.query(
    'INSERT INTO applications (user_id, company, role, status, notes, applied_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, company, role, status, notes, applied_date]
  )

  return Response.json(result.rows[0], { status: 201 })
}