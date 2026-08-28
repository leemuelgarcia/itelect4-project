import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  ApiBooking,
  ApiSession,
} from "../types";
import type { BookingFormValues } from "../schemas/bookingSchema";

import BookingStatus from "../components/BookingStatus";

import {
  createBooking,
  fetchBookings,
  fetchSessions,
} from "../api/client";

import {
  bookingSchema,
} from "../schemas/bookingSchema";

import { tutee } from "../data/mockData";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function BookingsPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    defaultValues: {
      sessionId: "",
      learningGoal: "",
    },
  });

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

      reset();
    },
  });

  const onSubmit = (values: BookingFormValues): void => {
    addBooking.mutate({
      sessionId: Number(values.sessionId),
      tuteeId: tutee.id,
      status: "requested",
      bookedAt: new Date().toISOString(),
      learningGoal: values.learningGoal,
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 space-y-4 rounded-lg bg-white p-5 shadow dark:bg-gray-800"
      >
        <div className="space-y-2">
          <Label
            htmlFor="sessionId"
            className="text-gray-900 dark:text-white"
          >
            Tutoring Session
          </Label>

          <select
            id="sessionId"
            {...register("sessionId")}
            aria-invalid={errors.sessionId ? true : undefined}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          >
            <option value="">Choose a tutoring session</option>

            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.title}
              </option>
            ))}
          </select>

          {errors.sessionId && (
            <p className="text-sm text-red-600">
              {errors.sessionId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="learningGoal"
            className="text-gray-900 dark:text-white"
          >
            Learning Goal
          </Label>

          <Input
            id="learningGoal"
            {...register("learningGoal")}
            aria-invalid={errors.learningGoal ? true : undefined}
            placeholder="Example: I want help understanding React state."
          />

          {errors.learningGoal && (
            <p className="text-sm text-red-600">
              {errors.learningGoal.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={addBooking.isPending}
        >
          {addBooking.isPending
            ? "Booking..."
            : "Book Session"}
        </Button>
      </form>

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
              (item) =>
                Number(item.id) === booking.sessionId
            );

            return (
              <div
                key={booking.id}
                className="rounded-lg bg-white p-5 shadow dark:bg-gray-800"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {session?.title ?? "Unknown Session"}
                </h3>

                <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Subject: {session?.subject ?? "Unknown"}
                </p>

                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
  Learning goal: {booking.learningGoal}
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