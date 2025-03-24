Here's your **updated README** with the **GitHub repository link** added.  

---

# 🗨️ **Real-Time Chat App**  

A **secure** and **real-time** chat application built using the **MERN stack**, featuring **JWT authentication**, **Socket.io**, and a fully responsive UI.  



---

## 📌 **Features**  

✅ **User Authentication** (JWT-based login/signup)  
✅ **Real-time Messaging** with **Socket.io**  
✅ **Online/Offline Status Tracking**  
✅ **Fully Responsive UI** (Mobile & Desktop)  

---

## 🚀 **Tech Stack**  

### **Backend**  
- **Node.js & Express.js** - Server & API handling  
- **MongoDB & Mongoose** - Database  
- **JWT (jsonwebtoken)** - Secure authentication  
- **bcrypt.js** - Password encryption  
- **Socket.io** - Real-time communication  

### **Frontend**  
- **React.js** (Vite) - Frontend framework  
- **Tailwind CSS & DaisyUI** - Styling & responsiveness  
- **Socket.io-client** - Connecting to WebSocket  

---

## 🛠️ **Setup & Installation**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/shivammourya17/CHATAPP.git
cd CHATAPP
```

### **2️⃣ Install Dependencies**  

#### 🖥️ **Backend Setup**  
```sh
cd backend
npm init -y
npm i express dotenv mongoose jsonwebtoken bcrypt socket.io cors nodemon
npm i mongodb
```

#### 🌐 **Frontend Setup**  
```sh
cd ../frontend
npm create vite@latest .
npm install
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i socket.io-client react-router-dom axios
```


```

#### 🖥️ **Start Backend**  
```sh
cd backend
npm run dev
```

#### 🌐 **Start Frontend**  
```sh
cd frontend
npm run dev
```

---

## 🌟 **How It Works**  

1. **User Authentication**  
   - Secure **JWT-based** login and signup.  
2. **Real-time Messaging**  
   - Uses **Socket.io** for **instant** updates.  
3. **One-on-One & Group Chat Support**  
   - Create or join group chats.  
4. **Online Status Tracking**  
   - See who’s online/offline in real time.  

---

## 📜 **License**  

This project is open-source and available under the **MIT License**.  

---

⭐ **Star the repository** if you found this helpful! 🚀  

Let me know if you need any more modifications. 🔥
