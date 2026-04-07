# JobTrackr - Product Requirements Document (PRD)

## Project Objective
Provide job seekers with a centralized, intelligent ecosystem to manage the entire application lifecycle. Beyond simple logging, the platform aims to transform raw application data into actionable insights, allowing users to identify patterns in their success rates, optimize their interview performance, and make data-backed decisions for their future career trajectory.

## Key Functional Features
1. **Dynamic Kanban Board:** A drag-and-drop interface to move applications through different stages of the hiring funnel.
2. **Smart Analytics Dashboard:** Charts showing application volume over time, top-hiring industries for the user, and average response times from employers.

---

## Data Models (Database Schema Draft)

### 1. User Model (Authentication)
- `email`: (String, required, unique)
- `username`: (String, required)
- `password`: (String, required, hashed)

### 2. Application Model
- `companyName`: (String, required)
- `jobTitle`: (String, required)
- `status`: (Enum: `wishlist`, `applied`, `interview`, `offer`, `rejected` - default: `wishlist`)
- `appliedIn`: (String - e.g., LinkedIn, Company Site, Indeed)
- `locationType`: (String - e.g., Remote, On-site, Hybrid)
- `salary`: (String/Number, optional)
- `notes`: (Text, optional - for tracking interview feedback or pasting the job description)
- `appliedDate`: (Date, default: Date.now)

---

## Frontend Design Architecture
- **Main View:** Dynamic Kanban Board where columns represent the `status` Enum.
- **Analytics View:** Charts rendering data aggregated from the Application Model.
