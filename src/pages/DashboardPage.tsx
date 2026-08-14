import { allBookings, allSessions, tutee } from "../data/mockData";

function DashboardPage() {
  const requestedCount = allBookings.filter(
    (booking) => booking.status === "requested"
  ).length;

  const confirmedCount = allBookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const completedCount = allBookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Peer Tutoring Dashboard
        </h2>

        <p className="mt-1 text-gray-600 dark:text-gray-300">
          Welcome, {tutee.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Available Sessions
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {allSessions.length}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Bookings
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {allBookings.length}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Requested
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {requestedCount}
          </p>
        </div>

        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Confirmed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {confirmedCount}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
        <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
          Booking Overview
        </h3>

        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>Requested bookings: {requestedCount}</p>
          <p>Confirmed bookings: {confirmedCount}</p>
          <p>Completed bookings: {completedCount}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;