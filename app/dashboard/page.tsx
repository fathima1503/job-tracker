'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/lib/useAuth'
import { removeToken } from '@/lib/auth'
import { getApplications, deleteApplication, updateApplication } from '@/lib/api'
import { Application } from '@/types'

export default function DashboardPage() {
  useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApplications() {
      const data = await getApplications()
      setApplications(data)
      setLoading(false)
    }
    fetchApplications()
  }, [])

  function handleLogout() {
    removeToken()
    router.push('/login')
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this application?')) return
    await deleteApplication(id)
    setApplications(applications.filter(app => app.id !== id))
  }

  async function handleStatusChange(app: Application, newStatus: string) {
    const updated = await updateApplication(app.id, {
      company: app.company,
      role: app.role,
      status: newStatus,
      notes: app.notes,
      applied_date: app.applied_date
    })
    setApplications(applications.map(a => a.id === app.id ? updated : a))
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-700'
      case 'Interview': return 'bg-yellow-100 text-yellow-700'
      case 'Offer': return 'bg-green-100 text-green-700'
      case 'Rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const total = applications.length
  const interviews = applications.filter(a => a.status === 'Interview').length
  const offers = applications.filter(a => a.status === 'Offer').length
  const rejected = applications.filter(a => a.status === 'Rejected').length

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Job Tracker</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 px-4 pb-10">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{total}</p>
            <p className="text-sm text-gray-500 mt-1">Total</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-yellow-500">{interviews}</p>
            <p className="text-sm text-gray-500 mt-1">Interviews</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{offers}</p>
            <p className="text-sm text-gray-500 mt-1">Offers</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-500">{rejected}</p>
            <p className="text-sm text-gray-500 mt-1">Rejected</p>
          </div>
        </div>

        {/* Applications header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">My Applications</h2>
          <button
            onClick={() => router.push('/applications/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add New
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Loading applications...</p>
        )}

        {/* Empty state */}
        {!loading && applications.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No applications yet.</p>
            <button
              onClick={() => router.push('/applications/new')}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
            >
              Add your first application
            </button>
          </div>
        )}

        {/* Applications grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{app.company}</h3>
                  <p className="text-gray-500 text-sm">{app.role}</p>
                  {app.notes && (
                    <p className="text-gray-400 text-sm mt-1">{app.notes}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Applied: {new Date(app.applied_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded border-0 ${getStatusColor(app.status)}`}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}