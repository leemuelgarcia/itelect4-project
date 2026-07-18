import type { User, Course, Submission } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====

// Variables with explicit types
const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

// void: function that does NOT return a value
function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====

// any -- disables TypeScript type checking
let anything: any = "hello";

anything = 42;
anything = true;

// unknown -- safer than any
let userInput: unknown = "test";

if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

// never -- function never returns
function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

console.log(student);
console.log(course);

// ===== TYPE NARROWING =====
import type { StringOrNumber } from "../types/index";

// Narrowing with typeof
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }

  return input.toFixed(2);
}

// Narrowing with instanceof
function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value;
}

console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));