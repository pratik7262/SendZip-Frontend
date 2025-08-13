# 📦 SendZip - Frontend

React-based frontend for **SendZip**, a web app to transfer ZIP files between devices with secure and temporary storage.

🔗 **Related Repository:** [SendZip Backend](https://github.com/pratik7262/SendZip-Backend)

---

## 🚀 Features

- 📂 Upload and send ZIP files instantly
- 🔄 Real-time status updates for file transfers
- ⏳ Automatic file deletion after a set time
- 📱 Fully responsive design for mobile & desktop
- 🔐 Secure communication with backend API

---

## 🛠 Tech Stack

- **React.js**
- **Material UI**
- **Axios**
- **JavaScript (ES6+)**

<!-- ---

## 🌐 Live Demo

_(Add link after deployment)_

--- -->

## 📂 Folder Structure

```
SendZip-Frontend/
│── public/              # Static assets
│── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main page views
│   ├── services/         # API calls & helpers
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
│── package.json
└── README.md
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/pratik7262/SendZip-Frontend.git
cd SendZip-Frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory and add:

```
REACT_APP_API_BASE_URL=http://localhost:5000
```

_(Change to your deployed backend URL after hosting)_

### 4️⃣ Run the development server

```bash
npm start
```

### 5️⃣ Build for production

```bash
npm run build
```

---

## 🔗 API Integration

The frontend communicates with the backend API for:

- Uploading ZIP files
- Fetching download links
- Managing expiration times

📌 Backend Repo → [SendZip Backend](https://github.com/pratik7262/SendZip-Backend)

---

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify.

---

## ✨ Author

**Pratik**  
💼 [Portfolio](https://pratikshinde.in) || 🐙 [GitHub](https://github.com/pratik7262)
