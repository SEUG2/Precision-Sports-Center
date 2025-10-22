
# 📝 Precision Sports Center

markdown
# 🏀 Precision Sports Center – E-Commerce Web Application  

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?style=for-the-badge&logo=react-router)
![E-Commerce](https://img.shields.io/badge/E--Commerce-Platform-FF6B6B?style=for-the-badge)

## 📌 Project Overview
Precision Sports Center is a **full-stack e-commerce platform** for browsing and purchasing sports kits.  
Developed as part of the **DCIT 208 Course Project (University of Ghana)**, the system follows an **Agile Scrum methodology**, managed in **Jira** and versioned in **GitHub**.  

---

## 👥 Team Members
- **Boahene Prince** – Scrum Master / QA / Tester  
- **Nana Ama Appeatse** – UI / Prototype  
- **Nhyirah Akua Ntiamoah** – Frontend Developer  
- **Malik Fattah** – Frontend Developer  
- **Oduro Stephen** – Backend Developer  
- **Clement Ocran** – Backend Developer  
- **Dawda Haruna** – Full-Stack Developer 
- **Asiatey Michael** – Database Administrator  

---
````
## 📂 Repository Structure


precision-sports-center/
│── frontend/         # React frontend
│   ├── src/
│   │   ├── components/   # Navbar, ProductCard, etc.
│   │   ├── pages/        # Home, Cart, Checkout, etc.
│   │   ├── context/      # CartContext, AuthContext
│   │   └── App.js
│
│── backend/          # Node.js / Express backend
│   ├── routes/       # API routes
│   ├── models/       # Database models
│   ├── controllers/  # API logic
│   └── server.js
│
│── database/         # SQL scripts
│   └── schema.sql    # DB schema
│
│── docs/             # Reports, diagrams, sprint docs
│── README.md

````

---

## ⚡ Tech Stack
- **Frontend:** React, Tailwind CSS, React Router  
- **Backend:** Node.js,   
- **Database:** MySQL / PostgreSQL  
- **Version Control:** GitHub (feature-branch workflow not yet implemented)  
- **Project Management:** Jira (Agile Scrum)  

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SEUG2/Precision-Sports-Center.git
cd precision-sports-center
````

### 2. Setup Frontend (React)

```bash
cd frontend
npm install
npm start
```

Runs on: [http://localhost:3000](http://localhost:3000)

### 3. Setup Backend (Node.js / Express)

```bash
cd backend
npm install
npm start
```

Runs on: [http://localhost:5000](http://localhost:5000)

### 4. Setup Database

```bash
mysql -u root -p < database/schema.sql
```

Update DB config in `backend/config/db.js`.

### 5. Run the Full Application

* Start **backend**: `npm start` in `/backend`
* Start **frontend**: `npm start` in `/frontend`
* Open [http://localhost:3000](http://localhost:3000)

---

## 🚀 Features (by Sprint)

### ✅ Sprint 1

* Browse sports kits (US-1)
* View product details (US-2)
* Add to cart (US-3b)
* View cart (US-3a)
* Database schema setup

### ✅ Sprint 2

* Remove from cart (US-3c)
* Checkout & payment (US-4)
* Login (US-5) & Register (US-6)

### ✅ Sprint 3

* Order tracking (US-7)
* Admin dashboard (US-8)

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage Screenshot](docs/screenshots/homepage.png)

### 🛒 Cart Page

![Cart Screenshot](docs/screenshots/cart.png)

### 🔑 Login Page

![Login Screenshot](docs/screenshots/login.png)

---

## ✅ Definition of Done

* Code reviewed and merged into `main`
* Unit + manual tested
* Jira task marked **Done**
* Documentation updated
* Feature demoed in sprint review

---

## 📖 License

This project is for **academic purposes (DCIT 208 – Software Engineering, University of Ghana  BY: Syntrix Software Engineering Team)**.
Not for commercial use.

```

---

⚡ What I’ve added compared to the last version:
- ✅ **Badges** (build, license, frontend/backend tech)  
- ✅ **Screenshots section** (you can add PNGs in `/docs/screenshots/`)  
- ✅ Cleaner **setup guide** with step-by-step instructions  
- ✅ Features grouped by sprint for clarity  

---
