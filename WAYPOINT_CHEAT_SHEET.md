# 🧠 Waypoint: Frontend Mental Model Cheat Sheet

> *This document is your permanent record of everything we built and learned so far. Read this whenever you get stuck or forget how React "thinks."*

---

## 1. The Architecture (Pages vs Components)
Look at your `frontend/src` folder. Why didn't we just dump everything into `App.jsx`? 

**The Analogy:** Your React app is a House (`App.jsx`).
- **`pages/`** (The Rooms): The user can only stand inside one room at a time. React Router (`<BrowserRouter>`) acts like a set of hallway doors, instantly teleporting the user to `/login` or `/dashboard`.
- **`components/`** (The Furniture): The `Navbar.jsx` is a piece of furniture. You build it once, and then you "drop it" into any room (page) that needs it. If you update the Navbar code, it automatically updates in every room.

---

## 2. The CSS "Blueprint"
How did we stop our buttons from looking like 1990s Windows buttons?
- **`index.css`:** This is our Master Rulebook. By defining `:root { --primary: #4F46E5; }`, we created a single source of truth for our brand color. 
- **The Box Model Trick:** Flexbox relies on grouping. When we had `<img>`, `<nav>`, `<button>`, and `<button>`, they spread out weirdly. By putting "cardboard boxes" (`<div>`) around related items, we controlled the Flexbox flow identically to our Figma design.

---

## 3. The "Controlled Component" (Forms & State)
In old-school HTML, you type into an `<input>` and the browser just holds the data. React hates this. React demands total control.

**How we fixed it in `Login.jsx`:**
1. We created empty memory banks: `const [email, setEmail] = useState('')`
2. We hooked the input to the memory: `value={email}`
3. We actively listened for every single keystroke to update the memory instantly: `onChange={(e) => setEmail(e.target.value)}`

*Now, when the user clicks 'Submit', React doesn't need to go hunting for the input boxes — it already has the exact password sitting in its memory!*

---

## 4. The Mail Carrier (`fetch` & `async/await`)
When you click **Sign In**, the frontend has to talk to your Node.js backend running on Port 5000. 

**Why no `useEffect`?**
`useEffect` runs automatically when the page loads. But we only want to talk to the backend *when the user clicks the button*. That's why the API call lives inside `handleSubmit`.

**Why the native `fetch` over `axios`?**
We remembered the massive North Korean UNC1069 Supply Chain Hack of 2026! By relying on the browser's built-in `fetch` API, we completely removed a massive security vulnerability. 

**Why `async` / `await`?**
Javascript runs instantly. If it reaches out to the server on line 4, it will try to run line 5 before the server even answers! 
- `async` = "This function involves time travel/waiting."
- `await` = "Freeze this exact line of code until the Mail Carrier comes back from Port 5000. Do not move to the next line."

---

## 5. The "404 Not Found" Trap
We got a 404 error when we first logged in, and you panicked thinking the App was broken. 
**It wasn't broken!** It was working perfectly. 

The Backend Server specifically looked in the database, realized the user didn't exist, and *intentionally* threw a `status(404)` back at the frontend. The `!response.ok` catcher we built in `Login.jsx` caught it perfectly and threw the error. 

**Always trust the code you wrote in Phase 1.**
