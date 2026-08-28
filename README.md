# Peer Tutoring Booking Platform

A React and TypeScript web application for browsing tutoring sessions and managing tutoring bookings.

This project was developed for ITELECT4 and demonstrates TypeScript, React routing, state management, API data fetching, form validation, and reusable UI components.

## Features

- User login with protected routes
- Browse available tutoring sessions
- View individual tutoring session details
- Search tutoring sessions
- Create tutoring bookings
- View booking status
- Add a learning goal when booking a session
- Form validation with visible error messages
- Persistent authentication state
- Persistent dark mode preference
- JSON Server REST API
- Typed API queries and mutations
- Responsive user interface

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- Zustand
- TanStack Query
- JSON Server
- React Hook Form
- Zod
- Shadcn UI
- Tailwind CSS

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the JSON Server API

Open a terminal and run:

```bash
npm run api
```

The API runs at:

```text
http://localhost:3001
```

Keep this terminal running.

### 3. Start the frontend

Open a second terminal and run:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## Login

Enter a non-empty name on the Login page to access the application.

Authentication state is managed using Zustand and is persisted in browser storage.

## Main Pages

### Dashboard

Displays an overview of the tutoring platform and booking information.

### Sessions

Displays tutoring sessions retrieved from the JSON Server API.

Users can search through the available sessions and open an individual session page.

### Session Details

Displays information for a specific tutoring session using a route parameter.

### Bookings

Displays the current user's bookings and provides a form for creating a new booking.

The booking form requires:

- A tutoring session
- A learning goal between 10 and 200 characters
- A valid positive session ID

Invalid form submissions display validation messages and do not send a POST request to the API.

## State Management

The project uses Zustand for application state.

The authentication store persists the user's authentication token.

A separate UI store manages interface state such as dark mode and session search.

## Data Fetching

TanStack Query is used for API data fetching and caching.

The application uses typed queries for tutoring sessions and bookings.

Creating a booking uses a mutation that sends a POST request to the JSON Server API and invalidates the bookings query after a successful request.

All API requests are centralized in:

```text
src/api/client.ts
```

## Form Validation

The booking form uses:

- React Hook Form
- Zod
- `@hookform/resolvers`

The booking validation schema is located in:

```text
src/schemas/bookingSchema.ts
```

The form's TypeScript values are derived directly from the Zod schema using `z.infer`.

## UI Components

Shadcn UI components are stored inside the project under:

```text
src/components/ui/
```

The project currently uses reusable:

- Button
- Input
- Label

components across multiple pages.

## Production Build

To verify that the project compiles with TypeScript and builds successfully, run:

```bash
npm run build
```

The build should finish with zero TypeScript errors.

## Project Structure

```text
src/
├── api/
│   └── client.ts
├── components/
│   ├── ui/
│   └── ...
├── data/
├── pages/
├── schemas/
│   └── bookingSchema.ts
├── store/
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## GT3 Implementation

### Part 1 — Routing and Navigation

Implemented routed pages, a shared layout, protected routes, URL parameters, navigation, and authentication-based route protection.

### Part 2 — State Management and Data Fetching

Implemented persisted Zustand stores, JSON Server, typed TanStack Query queries, API caching, and booking mutations.

### Part 3 — Forms and UI Components

Implemented React Hook Form, Zod validation, schema-derived TypeScript types, custom `.refine()` validation, Shadcn UI components, and validated booking submissions.

## Repository

This repository contains the frontend implementation of the Peer Tutoring Booking Platform for ITELECT4.