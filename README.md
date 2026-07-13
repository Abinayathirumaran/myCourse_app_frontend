## 2. Frontend Folder `README.md`

```markdown
# 🎨 Course & Task Management Platform - Frontend

This is the responsive frontend client dashboard application built using React.js. It manages local session states via tokens, dynamically scales layout configurations based on user roles, and handles interactive client-side routing.

## 🛠️ Tech Stack
* **Library:** React.js
* **Styling Framework:** Tailwind CSS 
* **Routing:** React Router DOM
* **Token Parsing:** jwt-decode
* **API Client:** Axios

---

## 📁 Project Structure
```text
├── src/
│   ├── components/     # Reusable UI elements (Navbar, Cards, Guards)
│   ├── protectedRoutes/        # Global Auth State providers
│   ├── pages/          # Core pages (Home, Dashboard, CreateCourse, Tasks)
│   ├── api/          # Token decoders & API client configurations
│   ├── App.jsx         # Application routing map
│   └── main.jsx        # App mounting point