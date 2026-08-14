import type { BookingStatus as BookingStatusType } from "../types";

interface BookingStatusProps {
  status: BookingStatusType;
}

function BookingStatus({ status }: BookingStatusProps) {
  const statusStyles = {
    requested: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default BookingStatus;