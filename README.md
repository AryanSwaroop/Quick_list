# Quick Task Pilot

A modern, responsive personal task management app built with React and TypeScript.

## 🚀 Features
- Simple login (username only, stored in localStorage)
- Add, edit, delete, and complete tasks
- Task priority (High, Medium, Low) and due dates
- Filter by All, Completed, Pending, and Priority
- Search tasks by title or description
- Instant, animated updates for all task actions
- Data persists in localStorage
- **Consistent, clean background color for the whole app**
- Responsive design for mobile and desktop
- Beautiful UI with smooth transitions
- **Highly modular codebase** for easy maintenance

## 🖼️ Sample Screenshot
![Task Dashboard Screenshot](./screenshot.png)

## 📁 Project Structure
```
task-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskFilter.tsx
│   │   └── ...
│   ├── utils/
│   │   ├── localStorage.ts
│   │   └── taskSort.ts
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── Task.ts
│   ├── App.tsx
│   └── main.tsx
├── README.md
└── package.json
```

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AryanSwaroop/Quick_list
   cd quick-task-pilot-70-main
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:8080) (or the port shown in your terminal)

## 📝 Usage
- Enter any username to log in (no password required)
- Add new tasks with title, description, priority, and due date
- Edit or delete tasks using the action buttons
- Mark tasks as complete/incomplete with the checkbox
- Use the filter tabs, search bar, and priority dropdown to organize your tasks
- All data is saved automatically in your browser

## 🖥️ Technologies Used
- React + TypeScript
- Tailwind CSS (for modern, utility-first styling)
- Framer Motion (for smooth list animations)
- LocalStorage (for persistence)

## 🤝 Contributing
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 🌐 Live Demo
Deploy your app with Vercel, Netlify, or GitHub Pages and add the link here.

---

**Enjoy your productive day with Quick Task Pilot!** 
