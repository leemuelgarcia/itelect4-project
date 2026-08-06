// ===== INTERFACES =====

// An interface defines the SHAPE of an object.

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

// ===== TYPE ALIASES =====

// Alias for a union type (string OR number)
export type ID = number | string;

// Alias for an object shape
export type Coordinate = {
  x: number;
  y: number;
};

// Alias for a function signature
export type Formatter = (value: number) => string;

// Using them
const studentId: ID = "S2026-001";
export const position: Coordinate = { x: 10, y: 20 };
const formatScore: Formatter = (value) => `${value}%`;

console.log(studentId);
console.log(formatScore(95.5));

// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";

// Function that accepts a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

printId(101);
printId("S2026-001");

// ===== INTERSECTION TYPES -- combines ALL properties =====
export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

export const topStudent: StudentWithCourse = {
  id: 1,
  name: "Maria Santos",
  email: "m@example.com",
  role: "student",
  isActive: true,
  enrolledCourse: {
    code: "ITELECT4",
    title: "IT Elective 4",
    units: 3,
    semester: "1st",
  },
  gpa: 1.25,
};

// ===== GENERIC INTERFACE =====

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====

// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;

// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;

// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<
  "student" | "admin" | "instructor",
  number
>;

// ===== ENUMS =====

// Regular enum -- exists at runtime
export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}