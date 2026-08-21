import type {
  ApiBooking,
  ApiSession,
  NewBooking,
} from "../types/index";

export const API_URL = "http://localhost:3001";

export async function fetchSessions(): Promise<ApiSession[]> {
  const res = await fetch(`${API_URL}/sessions`);

  if (!res.ok) {
    throw new Error("Could not load tutoring sessions");
  }

  return res.json();
}

export async function fetchSessionById(
  id: string
): Promise<ApiSession> {
  const res = await fetch(`${API_URL}/sessions/${id}`);

  if (!res.ok) {
    throw new Error(`No tutoring session found with id "${id}".`);
  }

  return res.json();
}

export async function fetchBookings(): Promise<ApiBooking[]> {
  const res = await fetch(`${API_URL}/bookings`);

  if (!res.ok) {
    throw new Error("Could not load bookings");
  }

  return res.json();
}

export async function createBooking(
  newBooking: NewBooking
): Promise<ApiBooking> {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });

  if (!res.ok) {
    throw new Error("Could not save the booking");
  }

  return res.json();
}