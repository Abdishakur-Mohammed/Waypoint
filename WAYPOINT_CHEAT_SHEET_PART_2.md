# 🧠 Waypoint: Frontend Cheat Sheet (Part 2)

> *This document completes our Full-Stack architecture breakdown. Keep this nearby whenever you build a new React/Node App!*

---

## 1. The Bouncer (Protected Routes)
React Router doesn't protect components by default. A user can type `/dashboard` into the URL and bypass the login screen. We fix this by building a Wrapper component:
- It checks `localStorage.getItem('token')`.
- If no token exists, it physically forces the user back: `<Navigate to="/login" />`
- If a token exists, it renders the room: `return children;`

## 2. The VIP Pass (Auth Headers)
Whenever you knock on the backend Express door (`http://localhost...`), the `protect` middleware immediately rejects you. You must submit your token in the headers:
```javascript
headers: {
    'Authorization': `Bearer ${token}`
}
```

## 3. The Form Object State
Instead of creating 10 variables for a massive form, use a single Object State:
```javascript
const [formData, setFormData] = useState({ company: '', title: '' });
```
**The Universal Scanner:**
```javascript
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
```
This tells React: "Keep all my old data, but overwrite the exact field the user just typed into."

## 4. The `useEffect` Hook
React components load instantly. If we need to perform an action the *millisecond* the component hits the screen (like downloading jobs from a database), we use `useEffect(() => { ... }, [])`. 
The empty brackets `[]` tell React: **Only run this once!**

## 5. The Component Assembly Line
We never copy-paste HTML 50 times. We use arrays and `.map()`:
1. **Sort the data:** `jobs.filter(job => job.status === 'offer')`
2. **Stamp the HTML:** `.map(job => <div key={job._id}>{job.title}</div>)`
*(Always remember your strict case-sensitivity between Frontend UI strings and Backend Mongoose Enums!)*

## 6. HTML5 Drag and Drop
You do not need massive external libraries for Drag & Drop!
- **The Cargo:** Add `draggable={true}` and `onDragStart={(e) => e.dataTransfer.setData('jobId', job._id)}`
- **The Landing Pad:** Add `onDragOver={(e) => e.preventDefault()}` and `onDrop={(e) => handleDrop(e, 'newStatus')}`
