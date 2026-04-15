import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Job Tracker
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Track your job applications in one place
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded font-medium hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}