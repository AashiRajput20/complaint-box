OutLog 🏠

A web-based hostel leave management system that makes life easier for students, wardens, admins and security guards. No more paper forms, no more running to the warden's room — everything happens right here.

---

## Why I Built This

Managing hostel leaves manually is a pain. Students fill paper forms, wardens lose track of who's in and who's out, and security guards have no way to verify if a student actually has permission to leave. OutLog fixes all of that with a simple digital workflow.

---

## What It Does

- Students apply for leave from their phone or laptop
- Warden gets the request and approves or rejects it
- A gate pass with a unique pass number and QR code is automatically generated
- Security guard enters the pass number, verifies it, and marks the student's exit
- When the student returns, security marks them as returned
- Everyone can see the status in real time

---

## Tech Stack

Built with the MERN stack — nothing fancy, just what works.

- **MongoDB** — stores all the data
- **Express.js** — handles the backend APIs
- **React.js** — powers the frontend
- **Node.js** — runs the server
- **JWT** — handles authentication
- **bcryptjs** — encrypts passwords
- **qrcode** — generates QR codes for gate passes

---

## Roles

There are 4 types of users in the system:

**Student**
Can apply for leave, check the status of their application, and view their gate pass once approved.

**Warden**
Receives all leave requests, can approve or reject them with a remark. For special leaves, can forward to admin if needed.

**Admin**
Handles special leave requests and anything forwarded by the warden. Has the final say.

**Security Guard**
Enters the pass number at the gate, verifies student details, marks exit when the student leaves, and marks return when they come back.

---

## Leave Types

| Type | Description |
|---|---|
| Home Leave | Going home for multiple days |
| General Purpose | General outing, can include group members |
| Emergency Leave | Urgent situation, fast tracked |
| Special Leave | Sensitive reason, goes to admin as well |

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free)
- Git

### Clone the repo

```bash
git clone https://github.com/AashiRajput20/outLog.git
cd outLog
```

### Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
nodemon server.js
```

### Set up the frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`  
Backend runs at `http://localhost:5000`

---

## API Endpoints

### Auth
```
POST   /api/auth/register     Register a new user
POST   /api/auth/login        Login and get token
GET    /api/auth/me           Get logged in user info
```

### Leave
```
POST   /api/leave/apply           Student applies for leave
GET    /api/leave/my              Get my leave applications
GET    /api/leave/my-gatepass     Get my gate pass
GET    /api/leave/all             Get all leaves (warden/admin)
PUT    /api/leave/update/:id      Approve, reject or forward
```

### Security
```
POST   /api/security/verify        Verify a gate pass
POST   /api/security/mark-exit     Mark student as exited
POST   /api/security/mark-return   Mark student as returned
GET    /api/security/all-passes    View all gate passes
```

---

## How the Flow Works

```
Student applies for leave
         ↓
Warden reviews and approves
         ↓
Gate pass generated automatically (pass number + QR code)
         ↓
Student shows pass number at the gate
         ↓
Security verifies and marks exit
         ↓
Student returns → Security marks return
         ↓
Done ✅
```

---

## Project Structure

```
outLog/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leaveController.js
│   │   └── securityController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── LeaveRequest.js
│   │   └── GatePass.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leaveRoutes.js
│   │   └── securityRoutes.js
│   ├── .env
│   ├── .gitignore
│   └── server.js
│
└── frontend/
    └── src/
        ├── context/
        │   └── AuthContext.js
        ├── pages/
        │   ├── auth/
        │   ├── student/
        │   ├── warden/
        │   ├── admin/
        │   └── security/
        ├── utils/
        │   └── api.js
        └── App.js
```

---

## A Few Things to Note

- The `.env` file is not pushed to GitHub for obvious reasons. Create your own with your MongoDB credentials.
- SMS notifications are not included — this is intentional to keep the project free to run.
- The QR code on the gate pass is generated automatically and displayed in the student's dashboard. Security verifies using the pass number, not the QR scan, since it's a web app.

---

## Live Demo

Frontend: [https://outlog.vercel.app](https://outlog.vercel.app)  
Backend: [https://outlog-backend.onrender.com](https://outlog-backend.onrender.com)

---

## Built By

Aashi Rajput — Institute Level Project
