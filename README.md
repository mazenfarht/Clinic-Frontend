# 🏥 ClinicQ – Clinic Queue Management System

A modern **Clinic Queue Management System** built with **Next.js 16**, **TypeScript**, and a clean healthcare-focused UI.

ClinicQ streamlines patient flow by providing appointment booking, real-time queue management, and an intuitive dashboard for doctors and clinic staff.

---

## 📸 Preview

> Add screenshots

---

## ✨ Features

### 👨‍⚕️ Doctor Dashboard

- Dashboard overview
- Live queue management
- Patient appointments
- Analytics page
- Settings page

### 📋 Queue Management

- Real-time queue updates
- Current patient display
- Waiting patients
- Completed patients
- Queue number tracking
- Automatic queue progression

### 📅 Appointment Booking

- Patient booking form
- Queue assignment
- Appointment confirmation

### 📺 Waiting Room Display

- Public display screen
- Current patient
- Live queue list
- Auto refresh

### 🔐 Authentication

- Secure login
- Route protection
- Cookie-based authentication
- Protected dashboard pages

---

## 🚀 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- React Hook Form
- Axios

### Backend

- Node.js
- Express.js
- REST API

---

## 🎨 Design System

The project follows a custom healthcare UI system with:

- Modern Medical SaaS Design
- Responsive Layout
- Soft Color Palette
- Accessible Components
- Clean Typography
- Consistent Spacing
- Reusable UI Components

---

## 📂 Project Structure

```text
src
├── app
│   │
│   ├── page.tsx                     # Landing Page
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   │
│   ├── book
│   │   └── page.tsx                 # Booking Form
│   │
│   ├── display
│   │   └── page.tsx                 # Waiting Room Display
│   │
│   ├── login
│   │   └── page.tsx
│   │
│   └── admin
│       ├── layout.tsx               # Sidebar + Navbar
│       ├── page.tsx                 # Redirect → Dashboard
│       │
│       ├── dashboard
│       │   └── page.tsx
│       │
│       ├── patients
│       │   ├── page.tsx
│       │   └── [id]
│       │       └── page.tsx
│       │
│       ├── appointments
│       │   ├── page.tsx
│       │   ├── create
│       │   │   └── page.tsx
│       │   └── [id]
│       │       └── page.tsx
│       │
│       ├── queue
│       │   └── page.tsx
│       │
│       ├── visits
│       │   ├── page.tsx
│       │   └── [id]
│       │       └── page.tsx
│       │
│       ├── analytics
│       │   └── page.tsx
│       │
│       ├── settings
│       │   └── page.tsx
│       │
│       └── profile
│           └── page.tsx
│
├── components
│   │
│   ├── Shared
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── Search.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── auth
│   │
│   ├── Sidebar
│   │
│   ├── Landing-Page
│   │
│   ├── book
│   │
│   ├── Dashboard
│   │   ├── OverviewCards.tsx
│   │   ├── StatisticsCards.tsx
│   │   ├── QueueOverview.tsx
│   │   ├── RecentPatients.tsx
│   │   ├── RecentAppointments.tsx
│   │   ├── DashboardCharts.tsx
│   │   └── TodaySummary.tsx
│   │
│   ├── Patients
│   │   ├── PatientTable.tsx
│   │   ├── PatientRow.tsx
│   │   ├── PatientForm.tsx
│   │   ├── PatientDetails.tsx
│   │   ├── PatientSearch.tsx
│   │   ├── PatientFilters.tsx
│   │   └── DeletePatientModal.tsx
│   │
│   ├── Appointments
│   │   ├── AppointmentTable.tsx
│   │   ├── AppointmentRow.tsx
│   │   ├── AppointmentForm.tsx
│   │   ├── AppointmentCalendar.tsx
│   │   ├── AppointmentStatus.tsx
│   │   └── CancelAppointmentModal.tsx
│   │
│   ├── Queue
│   │   ├── QueueTable.tsx
│   │   ├── QueueRow.tsx
│   │   ├── QueueStatus.tsx
│   │   ├── QueueActions.tsx
│   │   ├── WaitingList.tsx
│   │   └── NowServingCard.tsx
│   │
│   ├── Visits
│   │   ├── VisitTable.tsx
│   │   ├── VisitForm.tsx
│   │   ├── VisitDetails.tsx
│   │   ├── DiagnosisCard.tsx
│   │   ├── TreatmentCard.tsx
│   │   ├── PrescriptionCard.tsx
│   │   └── NotesCard.tsx
│   │
│   ├── Analytics
│   │   ├── PatientsChart.tsx
│   │   ├── VisitsChart.tsx
│   │   ├── QueueChart.tsx
│   │   ├── AppointmentsChart.tsx
│   │   └── SummaryCards.tsx
│   │
│   └── ClinicSettings
│       ├── ClinicInfoForm.tsx
│       ├── WorkingHours.tsx
│       ├── WorkingDay.tsx
│       ├── MaxPatientsInput.tsx
│       └── SaveSettingsButton.tsx
│
├── context
│   ├── AuthContext.tsx
│   ├── DateContext.tsx
│   └── QueueContext.tsx
│
├── hooks
│   ├── useAuth.ts
│   ├── usePatients.ts
│   ├── useAppointments.ts
│   ├── useQueue.ts
│   ├── useVisits.ts
│   ├── useDashboard.ts
│   ├── useAnalytics.ts
│   └── useClinicSettings.ts
│
├── services
│   ├── auth.ts
│   ├── patients.ts
│   ├── appointments.ts
│   ├── queue.ts
│   ├── visits.ts
│   ├── dashboard.ts
│   ├── analytics.ts
│   └── clinicSettings.ts
│
├── lib
│   ├── axios.ts
│   ├── auth.ts
│   └── utils.ts
│
├── types
│   ├── auth.ts
│   ├── patient.ts
│   ├── appointment.ts
│   ├── queue.ts
│   ├── visit.ts
│   ├── dashboard.ts
│   ├── analytics.ts
│   └── clinic.ts
│
├── middleware.ts
│
└── constants
    ├── routes.ts
    └── roles.ts
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/ClinicQ.git
```

Install dependencies

```bash
npm install
```

Create environment variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Run production

```bash
npm run start
```

---

## 🔒 Authentication

The application uses:

- JWT Authentication
- Cookies
- Route Protection
- Middleware / Proxy

---

## 📈 Future Improvements

- React Query
- WebSocket live updates
- Email notifications
- SMS notifications
- Multi-doctor support
- Patient profiles
- Dark Mode
- PWA Support
- Role-based permissions

---

## 💡 Why this project?

This project was built to simulate a real-world clinic management workflow while practicing modern frontend architecture, reusable components, API integration, and scalable application design.

---

## 👨‍💻 Author

## **Mazen Mostafa**

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
