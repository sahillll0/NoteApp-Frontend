📝 NoteApp Frontend (React)

A clean, modern, and fully responsive Notes App frontend built using React, Axios, and Tailwind CSS.
This app allows users to register, log in, create notes, view notes, update them, and delete them — all connected to a secure backend API.

Perfect project for beginners learning React components, state management, API integration, and Tailwind styling.


🔧 Built With

⚛️ React.js — UI components & app structure

🌐 Axios — API requests (CRUD operations)

🎨 Tailwind CSS — responsive and clean UI styling

🔒 JWT Auth Integration — secure user sessions

🧭 React Router — navigation between pages

🌟 Features

✔ User Register & Login pages
✔ Securely stores JWT token in localStorage
✔ Add new notes
✔ View all notes
✔ Update or edit existing notes
✔ Delete notes with one click
✔ Fully responsive UI
✔ Clean component structure
✔ Simple and beginner-friendly codebase

🚀 Live Demo

https://note-app-frontend-seven.vercel.app/

Installation

📦Clone the repository:

git clone https://github.com/sahillll0/NoteApp-Frontend
cd NoteApp-Frontend

🧠 How It Works

.User logs in → frontend sends request using Axios

.Backend returns JWT token

.Token is saved in localStorage

.All note-related pages send API requests with:

.Authorization: Bearer <token>


*Axios handles:

.GET → fetch notes

.POST → add note

.PUT → update note

.DELETE → delete note

Tailwind CSS is used for the full UI: buttons, inputs, cards, layout, responsiveness.


🎯 Future Improvements

.Add note tags / categories

.Add search & filter functionality

.Dark/Light mode using Tailwind

.Drag & drop notes

.Add animations with Framer Motion

🤝 Author & Acknowledgements

**Made with ❤️ by sahillll0**

If this project helped you, please ⭐ star the repo —
it motivates me to build more cool stuff.

“Keep learning, keep building.” — Sahillll0
