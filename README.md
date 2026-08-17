# RaiseIT 

### *"Because silence changes nothing."*

RaiseIT is an anonymous complaint management system built for students. The idea is simple — students often have genuine problems but don't speak up because they're afraid of being identified. RaiseIT fixes that. Anyone can submit a complaint without revealing who they are, get a tracking ID, and follow up on it later. On the other side, admins get a clean dashboard to manage everything.

This is my first full stack project, built completely from scratch using the MERN stack.

---

## What it does

Students land on the home page and choose to either submit a complaint or track an existing one. When submitting, they pick a category, set a priority level, and write their complaint. No name, no email, nothing that identifies them. The system generates a unique tracking ID like `CB-X7K2MN9A` which they can use later to check if their complaint was resolved.

Admins have a separate login protected by JWT authentication. Once inside, they can see all complaints, filter them, and move them through three stages — Pending, In Progress, and Resolved.

---

## Tech Stack

**Frontend**
- React.js with Vite
- React Router for navigation
- Axios for API calls

**Backend**
- Node.js
- Express.js
- MongoDB Atlas (cloud database)
- Mongoose (ODM)

**Authentication**
- JWT (JSON Web Tokens)
- bcryptjs for password hashing

**Deployment**
- Vercel (both frontend and backend)
- MongoDB Atlas (database)

---

## Project Structure

```
complaint-box/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT protection middleware
│   ├── models/
│   │   ├── Admin.js         # Admin schema
│   │   └── Complaint.js     # Complaint schema
│   ├── routes/
│   │   ├── auth.js          # Login & register routes
│   │   └── complaints.js    # Complaint CRUD routes
│   ├── .env                 # Secret keys (never uploaded)
│   ├── server.js            # Entry point
│   └── vercel.json          # Vercel deployment config
│
└── frontend/
    └── src/
        ├── components/
        │   └── Navbar.jsx       # Navigation bar
        ├── pages/
        │   ├── Landing.jsx      # Home - choose Student or Admin
        │   ├── ComplaintForm.jsx # Submit a complaint
        │   ├── TrackComplaint.jsx # Track by ID
        │   └── AdminDashboard.jsx # Admin panel
        ├── services/
        │   └── api.js           # All Axios API calls
        └── App.jsx              # Routes setup
```

---

## API Endpoints

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/api/complaints` | Submit a new complaint | Public |
| GET | `/api/complaints` | Get all complaints | Admin only |
| GET | `/api/complaints/:id` | Track complaint by tracking ID | Public |
| PATCH | `/api/complaints/:id` | Update complaint status | Admin only |
| POST | `/api/auth/register` | Create admin account | One time setup |
| POST | `/api/auth/login` | Admin login, returns JWT token | Public |

---

## How to Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/AashiRajput20/complaint-box.git
cd complaint-box
```

**2. Setup the Backend**
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:
```bash
nodemon server.js
```

**3. Setup the Frontend**
```bash
cd frontend
npm install
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

You need both terminals running at the same time — one for backend, one for frontend.

---

## How Authentication Works

When the admin logs in, the backend checks the credentials against the database. Passwords are never stored as plain text — they are hashed using bcryptjs before saving. If the credentials match, the server generates a JWT token signed with a secret key. This token is stored in the browser's localStorage and automatically attached to every future admin request via an Axios interceptor. The backend middleware verifies the token before allowing access to protected routes.

---

## Environment Variables

The following environment variables are required for the backend:

| Variable | Description |
|----------|-------------|
| `PORT` | Port number for the server (5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

These are stored in `.env` locally and in Vercel's Environment Variables for production. They are never committed to GitHub.

---

## Deployment

The project is deployed on Vercel.

- Backend deployed as a serverless Node.js function using `vercel.json`
- Frontend deployed as a static React build
- Database hosted on MongoDB Atlas with IP access configured

---

## What I Learned

This was my first ever full stack project. Going in, I only knew the basics of JavaScript. Building RaiseIT taught me how the frontend and backend actually talk to each other through REST APIs, how databases store and retrieve data, how authentication works in the real world, and what it actually takes to deploy a production app. Every bug I hit along the way taught me something new.


---

*Built with curiosity, a lot of debugging, and the belief that silence changes nothing.*
