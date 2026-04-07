# 🗺️ Waypoint — Mentor Handoff Document
> **Last Updated:** 2026-04-06
> **Purpose:** If this tab is ever lost, a new mentor reads this file FIRST and continues from exactly where we left off. Do not skip this file.

---

## 👤 Student Profile

- **Goal:** Become a professional MERN stack / Full-Stack developer and land a job within **3 months**
- **Current Experience:** Working at a startup called **Hubaal Corp** — provides real hands-on experience
- **Biggest Achievement:** Graduated with **99/100** on thesis and project defense (April 2026) 🎓
- **Biggest Challenge:** "Tutorial Hell" — understands concepts while watching/reading, but freezes when building alone
- **The Fix:** Build real things, explain choices out loud, get code reviewed every step
- **Strengths Observed:**
  - Takes initiative (implements pro tips without being asked)
  - Fixes his own bugs when pointed out clearly
  - Honest about what he doesn't understand
  - Responds very well to real-world analogies
  - Caught a security vulnerability himself and went back to patch it

---

## 📐 The Mentorship Standard — **Think → Translate → Implement → Review**

This is the core process. **Never skip a step.** Every single task follows this flow:

### 🧠 1. THINK (Mentor's job)
- Mentor explains the concept in **plain English + a real-world analogy**
- The student must understand the **WHY** before the **HOW**
- Keep it conversational — no jargon without explanation

### 🔄 2. TRANSLATE (Student's job)
- After the Think explanation, the mentor asks: *"Now explain it back to me in your own words"*
- Student gives a **free-form explanation** — no blanks to fill, no format
- Mentor listens and **corrects only what's wrong**, confirms what's right
- Do NOT give code hints yet

### 💻 3. IMPLEMENT (Student's job)
- Only after the Translate is approved does the mentor say **"go code it"**
- Mentor gives **hints only** (function names, method names, what to import) — never the full solution
- Student writes the code independently and pastes it back

### 🔍 4. REVIEW (Mentor's job)
- Mentor reviews the pasted code thoroughly
- Gives a clear breakdown: ✅ what's right, ⚠️ what's wrong, 💡 pro tips
- Student fixes the bugs and pastes again
- Mentor gives final verdict with a scorecard

---

## 🏨 The Analogy Style

The previous mentor used a **Hotel Keycard Analogy** to explain JWT Auth. This worked extremely well. Always anchor new concepts to real-world stories the student already understands. Here is the established analogy map:

| Code Concept | Real World Analogy |
|---|---|
| `loginUser` controller | Hotel Front Desk clerk checking your passport |
| `bcrypt.compare()` | Verifying the guest's identity against the booking |
| `generateToken()` | Programming a plastic keycard |
| `jwt.sign({ userId }, SECRET, { expiresIn })` | Stamping room number + hotel signature + expiry onto the card |
| `res.send(token)` | Handing the keycard over the desk to the guest |
| `authMiddleware` | The Card Reader bolted to the bedroom door |
| `jwt.verify()` | Card reader checking if the card is genuine and not expired |
| `req.user` | The card reader confirming who the guest is and letting them in |
| `next()` | The door opening |
| `401 Unauthorized` | The door staying locked |

---

## 🗂️ Project: Waypoint (formerly JobTrackr)

### What It Is
A MERN stack job application tracker. Users can manage their job applications through a Kanban board and view analytics on their job search.

### Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend:** React (Vite), React Router — **Design Phase in progress (Figma)**

### Full PRD (Product Requirements)
**Features:**
1. Dynamic Kanban Board — drag & drop between stages
2. Smart Analytics Dashboard — charts for application trends

**Application Model Fields:**
- `company_name` (String, required)
- `jobTitle` (String, required)
- `status` (Enum: `wishlist`, `applied`, `interview`, `offer`, `rejected` — default: `wishlist`)
- `appliedIn` (String — e.g. LinkedIn, Indeed)
- `locationType` (String — e.g. Remote, Hybrid)
- `salary` (String, optional)
- `notes` (String, optional)
- `appliedDate` (Date, default: Date.now)
- `user` (ObjectId ref to User — links each application to its owner)

---

## 📁 Current File Structure

```
Waypoint/ (folder still named JobTrackr on disk)
├── backend/
│   ├── config/
│   │   └── db.js                  ✅ Done — Mongoose connection
│   ├── controllers/
│   │   ├── userController.js      ✅ Done — register + login
│   │   └── applicationController.js ✅ Done — CRUD + Security patched
│   ├── middleware/
│   │   └── auth.middleware.js     ✅ Done — JWT protect middleware
│   ├── models/
│   │   ├── User.js                ✅ Done — with bcrypt pre-save hook
│   │   └── Application.js         ✅ Done — full schema with user ref
│   ├── routes/
│   │   ├── userRoutes.js          ✅ Done — POST /register, POST /login
│   │   └── applicationRoutes.js   ✅ Done — all routes protected with middleware
│   ├── utils/
│   │   └── generateToken.js       ✅ Done — jwt.sign with 30d expiry
│   ├── .env                       ✅ Has MONGO_URI, JWT_SECRET, PORT
│   └── server.js                  ✅ Done — Express setup, routes wired
│
└── frontend/
    └── (NOT STARTED — Design Phase first)
```

---

## 🚦 Roadmap

### ✅ Phase 1 — The Backend (COMPLETE)
- [x] Initial Express setup & MongoDB connection
- [x] User Model & Password Hashing (bcrypt)
- [x] Authentication (JWT)
- [x] Auth Middleware (`protect`)
- [x] Application Model & CRUD Controllers
- [x] Security patch — `findOneAndUpdate/Delete` with user scoping
- [x] All endpoints tested with Postman

### 🎨 Phase 2 — The Design (IN PROGRESS)
- [x] Choose App Name: **Waypoint**
- [ ] Define Brand Identity (Logo & Colors)
- [ ] Design Landing Page in Figma
- [ ] Design Auth Pages in Figma
- [ ] Design Main Dashboard (Kanban) in Figma
- [ ] Design Analytics Dashboard in Figma

### ⚛️ Phase 3 — The Frontend (NOT STARTED)
- [ ] Setup Vite + React Router
- [ ] Create UI Design System (CSS Variables)
- [ ] Implement Auth Context & State
- [ ] Build Components (Buttons, Cards, Modals)
- [ ] Connect Frontend to Backend (Axios)

### 📈 Phase 4 — Analytics & Polish
- [ ] Build Stats Dashboard with Charts
- [ ] Add Form Validations
- [ ] Final Bug Hunt & Deployment (Render + Vercel)
- [ ] Write portfolio README

---

## 🚀 SOLO CHALLENGE: NotesApp (Mastery Check)

**STATUS: ✅ PASSED with Flying Colors!**

The user built a complete NotesApp backend from scratch without looking at the Waypoint code:
- JWT Authentication ✅
- Password hashing with bcrypt ✅
- Note CRUD (Create, Read, Update, Delete) ✅
- Protected routes using custom middleware ✅
- Caught the `findByIdAndDelete` security hole and patched it himself ✅

---

## 📏 Code Standards Established

| Standard | Rule |
|---|---|
| HTTP Status Codes | `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized, `404` Not Found, `500` Server Error |
| Auth responses | Always `401` for auth failures — never `404` or `500` |
| Token response | Always `res.json({ token })` — never `res.send(rawToken)` |
| Password | Never returned in queries — always `.select("-password")` |
| Error handling | Always `try/catch` on async functions |
| Imports | ES Modules (`import/export`) — not CommonJS (`require`) |
| Security | Always scope DB queries to `req.user._id` — never `findByIdAndUpdate/Delete` alone |

---

## 💬 How to Talk to This Student

- ✅ Use **real-world analogies** — he responds to these extremely well
- ✅ Be **direct and honest** in code reviews — tell him exactly what's wrong
- ✅ Give **scorecard feedback** — he appreciates knowing where he stands
- ✅ Celebrate **initiative** — when he does something extra, acknowledge it
- ✅ Let him **struggle first** — give hints, not solutions
- ❌ Don't fill-in-the-blank exercises — ask for free-form explanation in Translate step
- ❌ Don't skip the Think stage — he needs the concept before the code
- ❌ Don't write code for him unless he's exhausted all hints
