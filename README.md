# 🩸 Blood Donation Management System
### Full Stack MERN Application (LifeLine UI)

---

## 📁 Complete Folder Structure

```
blood-donation-system/
├── backend/
│   ├── server.js                  ← Express app entry point
│   ├── package.json
│   ├── .env.example               ← Copy this to .env
│   ├── config/
│   │   └── db.js                  ← MongoDB connection
│   ├── models/
│   │   ├── User.js                ← User schema (with password hashing)
│   │   ├── Donor.js               ← Donor schema
│   │   └── Request.js             ← Blood request schema
│   ├── controllers/
│   │   ├── authController.js      ← Register, Login, GetMe
│   │   ├── donorController.js     ← CRUD for donors
│   │   └── requestController.js   ← CRUD for requests + stats
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   └── requestRoutes.js
│   └── middleware/
│       └── authMiddleware.js      ← JWT protect + adminOnly
│
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js               ← ReactDOM entry
        ├── App.js                 ← Router + all routes
        ├── context/
        │   └── AuthContext.js     ← Global auth state (login/logout)
        ├── services/
        │   └── api.js             ← All Axios API calls
        ├── index.css              ← Design system (colors, type, layout)
        ├── components/
        │   ├── AppLayout.js       ← Sidebar + content shell
        │   ├── Sidebar.js         ← Navigation sidebar
        │   ├── AuthShell.js       ← Split-screen wrapper for login/register
        │   ├── Icons.js           ← Inline SVG icon set
        │   ├── Spinner.js         ← Loading spinner
        │   └── PrivateRoute.js    ← Route guard
        └── pages/
            ├── Login.js           ← Login form
            ├── Register.js        ← Register form
            ├── Dashboard.js       ← Stats + blood group chart
            ├── Donors.js          ← Donor list + search + filter
            ├── DonorForm.js       ← Add / Edit donor (shared form)
            ├── Requests.js        ← Blood requests list + accept
            ├── CreateRequest.js   ← Create blood request form
            └── NotFound.js        ← 404 page
```

---

## ⚙️ Environment Setup (.env)

Create a file called `.env` inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blood-donation-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

> ⚠️ **Never commit .env to Git.** Add it to .gitignore.

---

## 🚀 Installation & Running

### Step 1 — Clone / Setup project

```bash
# If cloning from git
git clone <repo-url>
cd blood-donation-system
```

### Step 2 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start backend in development (auto-restart on save)
npm run dev

# OR start normally
npm start
```

✅ Backend will run at: **http://localhost:5000**

### Step 3 — Frontend Setup

Open a **new terminal tab/window**:

```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

✅ Frontend will run at: **http://localhost:3000**

> The frontend proxies `/api` calls to `localhost:5000` automatically (configured in package.json).

---

## 🗄️ MongoDB Connection

Make sure MongoDB is running locally:

```bash
# On macOS/Linux (if installed with Homebrew)
brew services start mongodb-community

# On Windows (if installed as service)
net start MongoDB

# Or use MongoDB Atlas (cloud) — just replace MONGO_URI in .env:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/blood-donation-db
```

---

## 🔌 API Routes Reference

### Auth Routes — `/api/auth`

| Method | Endpoint              | Access  | Description          |
|--------|-----------------------|---------|----------------------|
| POST   | `/api/auth/register`  | Public  | Register new user    |
| POST   | `/api/auth/login`     | Public  | Login user → JWT     |
| GET    | `/api/auth/me`        | Private | Get logged-in user   |

### Donor Routes — `/api/donors`

| Method | Endpoint            | Access  | Description               |
|--------|---------------------|---------|---------------------------|
| GET    | `/api/donors`       | Private | Get all donors (+ filter) |
| POST   | `/api/donors`       | Private | Add new donor             |
| GET    | `/api/donors/:id`   | Private | Get donor by ID           |
| PUT    | `/api/donors/:id`   | Private | Update donor              |
| DELETE | `/api/donors/:id`   | Private | Delete donor              |

**Query params for GET /api/donors:**
- `?bloodGroup=A+` — Filter by blood group
- `?search=john` — Search by name/city/phone

### Request Routes — `/api/requests`

| Method | Endpoint                    | Access  | Description               |
|--------|-----------------------------|---------|---------------------------|
| GET    | `/api/requests`             | Private | Get all requests          |
| POST   | `/api/requests`             | Private | Create blood request      |
| GET    | `/api/requests/:id`         | Private | Get request by ID         |
| PUT    | `/api/requests/:id/accept`  | Private | Accept a request          |
| GET    | `/api/requests/stats`       | Private | Dashboard statistics      |

---

## 🔐 JWT Authentication Flow

1. User **registers** → password hashed with bcryptjs → stored in MongoDB
2. User **logs in** → password compared → JWT token generated (7 day expiry)
3. Token stored in **localStorage** on frontend
4. Every protected API request sends: `Authorization: Bearer <token>`
5. `authMiddleware.js` verifies the token on every protected route
6. **Logout** removes token from localStorage + clears Axios header

---

## 🧪 Quick API Test with curl

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Get all donors (replace TOKEN with your JWT)
curl http://localhost:5000/api/donors \
  -H "Authorization: Bearer TOKEN"
```

---

## 🛠️ Tech Stack Summary

| Layer      | Technology              | Purpose                        |
|------------|-------------------------|--------------------------------|
| Database   | MongoDB + Mongoose      | Data storage & schema modeling |
| Backend    | Node.js + Express.js    | REST API server                |
| Auth       | JWT + bcryptjs          | Secure token authentication    |
| Frontend   | React.js (CRA)          | UI components & routing        |
| HTTP       | Axios                   | API calls from frontend        |
| Routing    | React Router v6         | Client-side navigation         |
| Alerts     | React Toastify          | Toast notifications            |

---

## ✅ Features Checklist

- [x] User Registration & Login
- [x] JWT Token Authentication
- [x] Protected Routes (frontend + backend)
- [x] Password hashing with bcryptjs
- [x] Add / View / Search / Update / Delete Donors
- [x] Search donors by blood group
- [x] Create blood requests with urgency level
- [x] View all blood requests with status filter
- [x] Accept blood requests
- [x] Dashboard with total donors & requests count
- [x] Donors breakdown by blood group
- [x] Responsive layout
- [x] Toast notifications for all actions
- [x] Loading spinners
- [x] 404 Not Found page

---

## 💡 Tips for Beginners

- Run backend and frontend in **separate terminals**
- If you see CORS errors, make sure backend is on port 5000
- The `"proxy": "http://localhost:5000"` in frontend/package.json handles API routing
- Use **MongoDB Compass** (free GUI) to view your database visually
- Use **Postman** or **Thunder Client** to test API endpoints directly
- JWT tokens expire in 7 days — log in again after expiry


## 
cd backend                      
>> cp .env.example .env
>> npm install
>> npm run dev
##
cd frontend                      
>> npm install   
>> npm start   