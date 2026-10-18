import type {
  ApiBooking,
  ApiSession,
  ApiUser,
  AuthReply,
  NewBooking,
  RegisterReply,
} from "../types/index";
import { useAuthStore } from "../store/authStore";

// Vite only exposes variables whose name starts with VITE_, and it
// replaces this at BUILD time, so the value present when the build
// runs is the one baked into the bundle.
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, " +
      "and restart npm run dev."
  );
}

// Every call goes through here: the host, the JSON header, the token
// when there is one, and the API's own message when it refuses.
async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  // getState(), not the hook: this is not a component.
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  return res.json();
}

// ---- sessions: public. No token is needed.

export async function fetchSessions(): Promise<ApiSession[]> {
  const data = await request<{ sessions: ApiSession[] }>("/api/sessions");
  return data.sessions;
}

export async function fetchSessionById(id: string): Promise<ApiSession> {
  const data = await request<{ session: ApiSession }>(`/api/sessions/${id}`);
  return data.session;
}

// ---- bookings: private. The token goes on automatically.

export async function fetchBookings(): Promise<ApiBooking[]> {
  const data = await request<{ bookings: ApiBooking[] }>("/api/bookings");
  return data.bookings;
}

export async function createBooking(
  newBooking: NewBooking
): Promise<ApiBooking> {
  const data = await request<{ booking: ApiBooking }>("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      sessionId: Number(newBooking.sessionId),
      learningGoal: newBooking.learningGoal,
    }),
  });
  return data.booking;
}

// ---- auth: the two routes that make a session exist

export function registerUser(body: {
  name: string;
  email: string;
  password: string;
  role: "tutor" | "tutee";
}): Promise<RegisterReply> {
  return request<RegisterReply>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export type { ApiUser };