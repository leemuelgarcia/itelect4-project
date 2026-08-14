import { Link, useParams } from "react-router";

import SessionCard from "../components/SessionCard";
import { allSessions, tutor } from "../data/mockData";

function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();

  const session = allSessions.find(
    (item) => item.id === Number(id)
  );

  if (!session) {
    return (
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Session Not Found
        </h2>

        <Link
          to="/sessions"
          className="text-blue-600 underline hover:text-blue-700"
        >
          Back to Sessions
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/sessions"
          className="text-blue-600 underline hover:text-blue-700"
        >
          ← Back to Sessions
        </Link>
      </div>

      <SessionCard session={session} />

      <div className="mt-6 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          Tutor
        </h3>

        <p className="text-gray-700 dark:text-gray-300">
          {tutor.name}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tutor.email}
        </p>
      </div>
    </div>
  );
}

export default SessionDetailPage;