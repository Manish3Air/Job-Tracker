# 📂 Job Tracker

A full-stack application to help users manage and track their job applications. Users can add jobs they've applied to, categorize them by status (applied, interviewing, rejected, etc.), and monitor their progress over time.

---

## 🚀 Features

- 📝 Add, edit, and delete job applications  
- 🗂️ Categorize jobs by status: Applied, Interviewing, Offered, Rejected, etc.  
- 🔍 Filter and search jobs by company, position, or status  
- 📊 Dashboard view with analytics and charts (e.g., job status breakdown)  
- 🌐 Authentication system (Register/Login)  
- 💾 Persistent storage using MongoDB  
- 🎨 Responsive and modern UI  

---

## 🛠️ Tech Stack

### **Frontend:**

- React.js  
- Tailwind CSS / Styled Components  
- Axios  
- React Router  
- Chart.js or Recharts  

### **Backend:**

- Node.js  
- Express.js  
- MongoDB (with Mongoose)  
- JSON Web Tokens (JWT) for Auth  

---

## 📦 Installation and Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Manish3Air/Job-Tracker.git
cd Job-Tracker
```
### 2️⃣ Setup MongoDB Atlas Database
-Go to https://www.mongodb.com/cloud/atlas
-Create an account and a new project (e.g., Job-Tracker)
-Create a free shared cluster
-Click “Browse Collections” > Add My Own Data
-Database Name: jobtracker
-Collection Name: applications
-Add a new Database User in “Database Access”
-Whitelist your IP address in “Network Access” (or allow 0.0.0.0/0)
-Copy your connection string from “Connect > Connect Your Application”

```bash
mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobtracker?retryWrites=true&w=majority
```

### 3️⃣ Backend Setup
```bash
cd server
npm install
```
### 🔐 Create a .env file inside /server:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### Start the backend
```bash
npm run start
```
### 4️⃣ Frontend Setup
```bash
cd ../client
npm install
npm start
```
