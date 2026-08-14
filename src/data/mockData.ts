import type { User, Session, Booking } from "../types";

export const tutor: User = {
  id: 1,
  name: "Maria Santos",
  email: "maria@example.com",
  role: "tutor",
  isActive: true,
};

export const tutee: User = {
  id: 2,
  name: "Lem Cruz",
  email: "lem@example.com",
  role: "tutee",
  isActive: true,
};

export const allSessions: Session[] = [
  {
    id: 1,
    tutorId: 1,
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of HTML, CSS, and JavaScript through guided exercises.",
    subject: "Web Development",
    duration: 60,
  },
  {
    id: 2,
    tutorId: 1,
    title: "TypeScript Fundamentals",
    description:
      "Understand TypeScript types, interfaces, unions, and generics.",
    subject: "TypeScript",
    duration: 60,
  },
  {
    id: 3,
    tutorId: 1,
    title: "React Basics",
    description:
      "Learn React components, props, state, and basic application structure.",
    subject: "React",
    duration: 90,
  },
];

export const allBookings: Booking[] = [
  {
    id: 1,
    sessionId: 1,
    tuteeId: 2,
    status: "confirmed",
    bookedAt: new Date(),
  },
  {
    id: 2,
    sessionId: 2,
    tuteeId: 2,
    status: "requested",
    bookedAt: new Date(),
  },
  {
    id: 3,
    sessionId: 3,
    tuteeId: 2,
    status: "completed",
    bookedAt: new Date(),
  },
];