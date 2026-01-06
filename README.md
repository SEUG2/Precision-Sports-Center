# ?? Precision Sports Center

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase)

## ?? Project Overview

Precision Sports Center is a **modern e-commerce platform** for browsing and purchasing sports kits, jerseys, boots, and equipment.

Built with **React 19**, **Vite**, and **Supabase** for a fast, responsive shopping experience.

Developed as part of the **DCIT 208 Course Project (University of Ghana)** using **Agile Scrum methodology**.

---

## ?? Team Members

| Name | Role |
|------|------|
| **Boahene Prince** | Scrum Master / QA / Tester |
| **Nana Ama Appeatse** | UI / Prototype |
| **Nhyirah Akua Ntiamoah** | Frontend Developer |
| **Malik Fattah** | Frontend Developer |
| **Oduro Stephen** | Backend Developer |
| **Clement Ocran** | Backend Developer |
| **Dawda Haruna** | Full-Stack Developer |
| **Asiatey Michael** | Database Administrator |

---

## ?? Project Structure

```
Precision_Sports_Center/
+-- Frontend/                 # React + Vite frontend
¦   +-- src/
¦   ¦   +-- components/       # UI components (Navbar, ProductCard, etc.)
¦   ¦   ¦   +-- layout/       # AppLayout, Header, Footer
¦   ¦   ¦   +-- ui/           # Reusable UI primitives
¦   ¦   +-- Pages/            # Home, Shop, Cart, Checkout, Admin
¦   ¦   +-- context/          # CartContext, AuthContext
¦   ¦   +-- hooks/            # Custom React hooks
¦   ¦   +-- lib/              # Utilities (formatCurrency, supabaseClient)
¦   ¦   +-- styles/           # Global CSS
¦   +-- public/               # Static assets
¦   +-- package.json
¦
+-- Database/                 # SQL scripts
¦   +-- schema.sql            # Supabase database schema
¦
+-- Docs/                     # Documentation & screenshots
```

---

## ? Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS, React Router |
| **Backend** | Supabase (BaaS) |
| **Database** | PostgreSQL (Supabase) |
| **Authentication** | Supabase Auth |
| **Storage** | Supabase Storage (product images) |
| **Deployment** | Vercel |

---

## ??? Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Supabase account ([supabase.com](https://supabase.com))

### 1. Clone the Repository

```bash
git clone https://github.com/SEUG2/Precision-Sports-Center.git
cd Precision-Sports-Center
```

### 2. Setup Frontend

```bash
cd Precision_Sports_Center/Frontend
npm install
```

### 3. Configure Supabase

Create a `.env` file in the `Frontend` folder:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Database

1. Go to your Supabase project ? SQL Editor
2. Run the contents of `Database/schema.sql`
3. Make yourself admin:
   ```sql
   INSERT INTO public.profiles (id, email, is_admin)
   SELECT id, email, TRUE
   FROM auth.users
   WHERE email = 'your-admin@email.com'
   ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;
   ```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ?? Features

### ??? Shopping
- Browse sports kits, jerseys, boots & equipment
- Filter by category, league, team, price range
- Product quick view & detailed product pages
- Wishlist & compare products
- Shopping cart with quantity management

### ?? User Account
- User registration & login (Supabase Auth)
- Order history
- Profile management

### ?? Admin Dashboard (`/admin`)
- Add, edit, delete products
- Upload product images
- Manage inventory
- View orders

### ?? Checkout
- Secure checkout process
- Shipping address management
- Order confirmation

---

## ?? Screenshots

### ?? Homepage
![Homepage](Docs/Screenshots/homepage.png)

### ?? Shop Page
![Shop](Docs/Screenshots/shop.png)

### ??? Cart
![Cart](Docs/Screenshots/cart.png)

### ?? Admin Dashboard
![Admin](Docs/Screenshots/admin.png)

---

## ?? Live Demo

?? [precision-sports-center.vercel.app](https://precision-sports-center.vercel.app)

---

## ? Definition of Done

- Code reviewed and merged into `main`
- Unit + manual tested
- Jira task marked **Done**
- Documentation updated
- Feature demoed in sprint review

---

## ?? License

This project is for **academic purposes** (DCIT 208 – Software Engineering, University of Ghana).

**Developed by:** Syntrix Software Engineering Team

Not for commercial use.
