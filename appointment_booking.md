
# Frontend for Appointments & Booking (User)

**Tech Stack:** React, Tailwind CSS, Vite  
**Package Manager:** npm

This frontend application handles user-facing appointment browsing and booking.

---

## Prerequisites

Ensure the following are installed:

- Git (and a GitHub account)
- Node.js (LTS recommended)
- npm (comes with Node.js)

Verify installations:

```bash
node -v
npm -v
git --version
```

---

## Getting Started

### 1. Create the Project

We use Vite to scaffold a React application.

```bash
npm create vite@latest . -- --template react
npm install
```

### 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind

**tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4. Add Tailwind to CSS

**src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

⚠️ This file must be imported in `main.jsx`.

### 5. Import CSS in Entry File

**src/main.jsx**

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 6. Start Development Server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## Verify Tailwind Setup

Edit **src/App.jsx**:

```javascript
function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-600 text-center mt-10">
      Appointments & Booking
    </h1>
  );
}

export default App;
```

If the text is blue, centered, and large, Tailwind is working correctly.

---

## Key Fixes Applied

1. **postcss.config.js**: Changed from `"@tailwindcss/postcss"` to `tailwindcss` (standard plugin name)
2. **src/index.css**: Changed from `@import "tailwindcss";` to the standard three Tailwind directives
3. Added proper initialization command: `npx tailwindcss init -p`

---

## Project Structure

```
project-root/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```


