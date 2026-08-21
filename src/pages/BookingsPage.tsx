import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  ApiBooking,
  ApiSession,
} from "../types";
import BookingStatus from "../components/BookingStatus";
import {
  createBooking,
  fetchBookings,
  fetchSessions,
} from "../api/client";
import { tutee } from "../data/mockData";

function BookingsPage() {
  const [sessionId, setSessionId] = useState("1");

  const queryClient = useQueryClient();

  const bookingsQuery = useQuery<ApiBooking[]>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const sessionsQuery = useQuery<ApiSession[]>({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const addBooking = useMutation({
    mutationFn: createBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      setSessionId("1");
    },
  });

  const handleAddBooking = (): void => {
    addBooking.mutate({
      sessionId: Number(sessionId),
      tuteeId: tutee.id,
      status: "requested",
      bookedAt: new Date().toISOString(),
    });
  };

  if (bookingsQuery.isPending || sessionsQuery.isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading bookings...
      </div>
    );
  }

  if (bookingsQuery.isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {bookingsQuery.error.message}
      </div>
    );
  }

  if (sessionsQuery.isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {sessionsQuery.error.message}
      </div>
    );
  }

  const bookings = bookingsQuery.data;
  const sessions = sessionsQuery.data;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Bookings
      </h2>

      <div className="mb-6 flex gap-2">
        <select
          value={sessionId}
          onChange={(event) => setSessionId(event.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        >
          {sessions.map((session) => (
            <option key={session.id} value={session.id}>
              {session.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddBooking}
          disabled={addBooking.isPending}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addBooking.isPending ? "Booking..." : "Book Session"}
        </button>
      </div>

      {addBooking.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addBooking.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {bookings
          .filter((booking) => booking.tuteeId === tutee.id)
          .map((booking) => {
            const session = sessions.find(
              (item) => Number(item.id) === booking.sessionId
            );

            return (
              <div
                key={booking.id}
                className="rounded-lg bg-white p-5 shadow dark:bg-gray-800"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {session?.title ?? "Unknown Session"}
                </h3>

                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  Subject: {session?.subject ?? "Unknown"}
                </p>

                <BookingStatus status={booking.status} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BookingsPage;