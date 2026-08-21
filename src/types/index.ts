// ===== INTERFACES =====

export interface User {
  id: number;
  name: string;
  email: string;
  role: "tutor" | "tutee";
  isActive: boolean;
}

export interface Session {
  id: number;
  tutorId: number;
  title: string;
  description: string;
  subject: string;
  duration: number;
}

export interface Booking {
  id: number;
  sessionId: number;
  tuteeId: number;
  status: "requested" | "confirmed" | "completed";
  bookedAt: Date;
}

// ===== TYPE ALIASES =====

export type ID = number | string;

export type Coordinate = {
  x: number;
  y: number;
};

export type Formatter = (value: number) => string;

const studentId: ID = "S2026-001";
const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value) => `${value}%`;

console.log(studentId);
console.log(position);
console.log(formatScore(95.5));

// ===== UNION TYPES =====

export type StringOrNumber = string | number;

export type Status = "requested" | "confirmed" | "completed";

export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

printId(101);
printId("S2026-001");

// ===== INTERSECTION TYPES =====

export type TutorWithSession = User & {
  role: "tutor";
  session: Session;
};

const tutorWithSession: TutorWithSession = {
  id: 1,
  name: "Maria Santos",
  email: "maria@example.com",
  role: "tutor",
  isActive: true,
  session: {
    id: 1,
    tutorId: 1,
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development.",
    subject: "Web Development",
    duration: 60,
  },
};

console.log(tutorWithSession);

// ===== GENERIC INTERFACE =====

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====

export type UserUpdate = Partial<User>;

export type UserPreview = Pick<User, "id" | "name" | "role">;

export type PublicUser = Omit<User, "email" | "isActive">;

export type RoleCount = Record<"tutor" | "tutee", number>;

// ===== ENUM-LIKE TYPES =====
//
// Booking status is intentionally represented as a union type.
// This works with the project's erasableSyntaxOnly configuration.

export type BookingStatus = "requested" | "confirmed" | "completed";

export type ApiSession = Omit<Session, "id"> & {
  id: string;
};

export type ApiBooking = Omit<Booking, "id" | "bookedAt"> & {
  id: string;
  bookedAt: string;
};

export type NewBooking = Omit<ApiBooking, "id">;