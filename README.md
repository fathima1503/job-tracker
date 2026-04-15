# Job Tracker

A full stack web application to track your job applications built with Next.js, TypeScript, and PostgreSQL.

## Features

- User authentication (register and login)
- Add, update and delete job applications
- Track application status — Applied, Interview, Offer, Rejected
- Dashboard with stats overview

## Tech Stack

- **Frontend** — Next.js, React, TypeScript, Tailwind CSS
- **Backend** — Next.js API Routes
- **Database** — PostgreSQL
- **Auth** — JWT, bcryptjs

## Getting Started

1. Clone the repository
```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env.local` file
    DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/jobtracker
    JWT_SECRET=yourjwtsecret

4. Run the development server
```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

- Frontend deployed on Vercel
- Database hosted on Railway