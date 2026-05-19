Realtime Feed Application - Frontend
Tech Stack Used
Next.js 16.2.6 (App Router)

React 19.2.4

TypeScript

Tailwind CSS v4 (Styling)

Axios (API calls)

Socket.IO Client (Real-time updates)

Project Structure
text
frontend/
├── src/app/
│   ├── page.tsx           # Home page - displays all feeds
│   ├── admin/page.tsx     # Admin panel - add new feeds
│   ├── layout.tsx         # Root layout with navbar
│   ├── components/
│   │   └── Navbar.tsx     # Navigation component
│   └── globals.css        # Global styles
├── src/services/
│   ├── api.ts             # Axios configuration
│   └── socket.ts          # Socket.IO client
└── package.json
How to Use
View Feeds (Home Page)
Navigate to http://localhost:3000

All feeds appear in reverse chronological order

New feeds arrive automatically (no page refresh needed)

Add New Feed (Admin Panel)
Click "Admin" in navbar or go to http://localhost:3000/admin

Enter title and message

Click "Add Feed" button

Feed appears instantly on home page for all users

How to Run
bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
Backend Connection
API URL: http://localhost:5000

WebSocket URL: http://localhost:5000

Make sure backend server is running before starting frontend

Key Features
Real-time feed updates via WebSocket

Responsive design (works on mobile/tablet/desktop)

Form validation and loading states

Auto-refresh on new feed submission