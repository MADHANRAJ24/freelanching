# DesiGigs - India-First Freelancing Marketplace

A modern freelancing platform tailored for Indian users with AI translation, real-time chat, and UPI payments.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 + Tailwind CSS |
| **Backend** | NestJS + Prisma ORM |
| **Database** | PostgreSQL |
| **Real-time** | Socket.io |
| **Payments** | Razorpay |

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL (or Docker)

### 1. Start Database (Docker)
```bash
docker-compose up -d postgres redis
```

### 2. Backend Setup
```bash
cd api
npm install

# Generate Prisma Client
powershell -ExecutionPolicy Bypass -File generate.ps1
# OR: npx prisma generate (ensure DATABASE_URL is set)

# Run migrations
npx prisma migrate dev

# Start server
npm run start:dev
# API runs on http://localhost:3001
```

### 3. Frontend Setup
```bash
cd web
npm install
npm run dev
# Opens http://localhost:3000
```

---

## Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the `web` folder as root
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = Your backend URL (e.g., `https://api.desigigs.com`)
5. Deploy!

### Backend → Railway / Render / AWS

1. Create PostgreSQL database
2. Set environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key
   RAZORPAY_KEY_ID=rzp_test_xxx
   RAZORPAY_KEY_SECRET=xxx
   ```
3. Build: `npm run build`
4. Start: `npm run start:prod`

---

## Features

- ✅ Client & Freelancer roles
- ✅ Project posting with INR budget
- ✅ Proposal/Bidding system
- ✅ Real-time chat with AI translation toggle
- ✅ Wallet with Razorpay UPI payments
- ✅ India-themed UI (Saffron + Green palette)

---

## Project Structure

```
├── api/                  # NestJS Backend
│   ├── src/
│   │   ├── auth/         # JWT Authentication
│   │   ├── users/        # User profiles
│   │   ├── projects/     # Job postings
│   │   ├── proposals/    # Bidding system
│   │   ├── chat/         # WebSocket gateway
│   │   └── payments/     # Razorpay integration
│   └── prisma/           # Database schema
│
└── web/                  # Next.js Frontend
    └── app/
        ├── components/   # Navbar, ChatWindow
        ├── login/        # Auth pages
        ├── signup/
        ├── dashboard/    # User dashboard
        ├── projects/     # Browse & post
        ├── messages/     # Chat UI
        └── wallet/       # Payments
```

---

## License

MIT © 2024 DesiGigs
