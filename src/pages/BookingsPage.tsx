import BookingStatus from "../components/BookingStatus";
import { allBookings, allSessions, tutee } from "../data/mockData";

function BookingsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Bookings
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allBookings
          .filter((booking) => booking.tuteeId === tutee.id)
          .map((booking) => {
            const session = allSessions.find(
              (item) => item.id === booking.sessionId
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