📦 ScootWise Frontend

Smart Electric Scooter Fleet Management Platform
Built with React (Vite) + Tailwind CSS + Socket.IO Client

🚀 Overview

ScootWise Frontend is the official user interface for the ScootWise SaaS platform.

It connects to a Node.js/Express backend via:

REST API (Axios)
WebSockets (Socket.IO)
JWT authentication

It provides real-time scooter tracking, ride management, admin dashboard, and maintenance workflows.

🧠 Tech Stack
React (Vite)
Tailwind CSS
React Router DOM
Axios
Socket.IO Client
Context API (state management)
⚡ Features
🚴 Rider Panel
View available scooters
Start / End ride
Live ride tracking (timer + cost)
Report scooter issues
Ride history
🧑‍💼 Admin Dashboard
Scooter management (CRUD UI)
Live scooter tracking (Socket.IO)
Ride monitoring
Maintenance tickets
System overview dashboard
🔧 Maintenance Panel
View reported issues
Update repair status
Mark scooter as fixed
⚡ Real-Time Features
Live scooter location updates
Ride started / ended events
Scooter status updates
Instant UI refresh via Socket.IO
📁 Project Structure
scootwise-frontend/
│
├── public/
│
├── src/
│
│   ├── api/
│   │   └── axios.js
│
│   ├── assets/
│
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── scooter/
│   │   │   ├── ScooterCard.jsx
│   │   │   └── ScooterMap.jsx
│   │   │
│   │   └── ride/
│   │       ├── RidePanel.jsx
│   │       └── RideTimer.jsx
│
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── rider/
│   │   │   ├── Home.jsx
│   │   │   ├── ActiveRide.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Scooters.jsx
│   │   │   ├── Rides.jsx
│   │   │   └── Maintenance.jsx
│   │   │
│   │   └── maintenance/
│   │       └── Tickets.jsx
│
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── SocketContext.jsx
│
│   ├── hooks/
│   ├── services/
│   ├── socket/
│   │   └── socket.js
│
│   ├── routes/
│   │   └── AppRouter.jsx
│
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── vite.config.js
├── tailwind.config.js
└── package.json
🔌 Backend Integration
API Base URL
VITE_API_URL=http://localhost:5000/api
Socket URL
VITE_SOCKET_URL=http://localhost:5000
⚡ Socket Events

The frontend listens to:

ride:started
ride:ended
scooter:locationUpdated
scooter:statusUpdated
scooter:batteryUpdated
🚀 Installation & Setup
1. Install dependencies
npm install
2. Run development server
npm run dev
3. Open app
http://localhost:5173
🎨 UI / UX Design

The frontend uses a modern SaaS dashboard design:

Clean sidebar navigation
Card-based analytics UI
Map-based scooter tracking
Responsive mobile-first layout
Smooth transitions & reusable components
🧠 Architecture
React UI
   ↓
Axios (REST API)
   ↓
Express Backend
   ↓
MongoDB

Socket.IO
   ↓
Real-time updates
   ↓
React Context updates UI instantly
🔒 Security
JWT authentication
Protected routes
Token stored in localStorage
Role-based UI rendering
📈 Future Improvements
Mapbox live scooter tracking
Dark mode UI
Push notifications
PWA mobile support
Payment integration
Animated scooter movement on map
👨‍💻 Author

Karim Chebbi
Full Stack Developer & Instructor (GoMyCode)

🏁 Conclusion

ScootWise Frontend is a scalable, real-time SaaS dashboard built with React + Vite, fully integrated with a Node.js backend using REST APIs and Socket.IO for live updates.
