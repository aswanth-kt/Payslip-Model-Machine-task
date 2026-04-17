# Employee Payslip Generation System

A full-stack payroll management application built with the MERN stack, following MVC architecture. Designed to help HR departments manage employee records and generate accurate monthly payslips with automated salary calculations.

🔗 **Live Demo:** [View Application](https://payslip-gen-app.vercel.app/) &nbsp;|&nbsp; **API:** [Backend on Render](https://payslip-gen.onrender.com/)

---

## Features

- **Employee Management** — Create and store employee records with complete salary structures
- **Automated Salary Calculation** — HRA, DA, allowances, ESI, PF, and leave deductions computed instantly
- **Payslip Generation** — Structured payslip output with print support
- **Persistent Storage** — All employee and payslip data stored in MongoDB

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), React Router, Axios, React Toastify, SweetAlert2 |
| Backend | Node.js, Express.js (MVC Architecture) |
| Database | MongoDB, Mongoose |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Salary Calculation Logic

```
HRA             = Basic × HRA%
DA              = Basic × DA%
Allowances      = Basic × Allowance%

Gross Salary    = Basic + HRA + DA + Allowances

ESI             = Basic × ESI%
PF              = Basic × PF%
Leave Deduction = (Gross / 30) × Leave Days

Net Salary      = Gross − (ESI + PF + Leave Deduction)
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB connection string

### 1. Clone the Repository

```bash
git clone https://github.com/aswanth-kt/Payslip-Model-Machine-task.git
cd Payslip-Model-Machine-task
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---


## 🎥 Video Demo

You can watch a quick walkthrough of the project here:

👉 [Watch Demo Video](https://youtu.be/SSWnA_jMTBw)

---


## Future Improvements

- [ ] Admin / HR authentication
- [ ] Monthly reports & analytics
- [ ] Search and filter functionality
- [ ] Role-based access control

---

## Author

**Aswanth KT** — [GitHub](https://github.com/aswanth-kt)
