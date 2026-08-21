import type { ApiSession } from "../types";

interface SessionCardProps {
  session: ApiSession;
}

function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {session.title}
        </h3>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {session.subject}
        </span>
      </div>

      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        {session.description}
      </p>

      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Duration: {session.duration} minutes
      </p>
    </div>
  );
}

export default SessionCard;