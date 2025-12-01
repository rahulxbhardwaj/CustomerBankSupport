# BhardwajBank - AI-Powered Banking Application

## Overview
A full-stack AI-powered banking application built with Next.js (Pages Router), featuring transaction management, AI-powered transaction insights using RAG (Retrieval-Augmented Generation), and real-time data updates.

## Tech Stack
- **Frontend**: Next.js 15 with Pages Router, React, Tailwind CSS v4
- **Backend**: Next.js API Routes
- **Database**: MongoDB (via Mongoose)
- **Vector Database**: ChromaDB for RAG embeddings
- **AI**: Google Gemini AI for intelligent query responses
- **Authentication**: JWT-based with jose and jsonwebtoken
- **Animations**: Framer Motion

## Project Structure
```
/pages
  /api
    /aicopilot.ts        - AI Copilot RAG endpoint
    /fetchUserData.ts    - User data and transactions
    /login/loginUser.ts  - Authentication
    /register/regUser.ts - User registration
    /transfer/sendmoney.ts - Fund transfer
  /components
    /accounts.tsx        - Account overview
    /aicopilot.tsx       - AI chat interface
    /fundTransfer.tsx    - Money transfer form
    /dashboardNavBar.tsx - Navigation
    /home.tsx           - Landing page
    /loginform.tsx      - Login form
    /registerform.tsx   - Registration form
    /recentTransaction.tsx - Transaction history
  dashboard.tsx         - Main dashboard
  index.tsx             - App entry point
/lib
  /chromaConnect.ts     - ChromaDB connection
  /dbConnect.ts         - MongoDB connection
  /embeddings.ts        - Gemini embedding functions
/models
  /userModel.ts         - User schema
  /transcation.ts       - Transaction schema
```

## Environment Variables Required
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CHROMA_API_KEY` - ChromaDB API key
- `GEMINI_API_KEY` - Google Gemini API key

## Features
1. **User Authentication** - Secure JWT-based login/registration
2. **Account Management** - View balance, account details
3. **Fund Transfer** - Send money to other users
4. **Transaction History** - View recent transactions
5. **AI Copilot** - RAG-powered assistant for transaction insights
6. **Real-time Updates** - Auto-refresh on tab switching

## Development
```bash
npm run dev    # Start development server on port 5000
npm run build  # Build for production
npm start      # Start production server
```

## Deployment (Vercel)
The project is configured for Vercel deployment:
- `vercel.json` - Deployment configuration
- `.env.example` - Required environment variables template
- All Next.js optimizations applied (Image component, proper types)

### Steps to Deploy:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Recent Changes
- Fixed TypeScript errors for production build
- Updated Mongoose models with proper TypeScript types
- Fixed framer-motion AnimatePresence deprecation (exitBeforeEnter -> mode="wait")
- Added proper Next.js Image components with priority for LCP
- Updated middleware for proper API route protection
- Configured for Vercel deployment
