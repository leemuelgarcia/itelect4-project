import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

import type { ApiSession } from "../types";
import SessionCard from "../components/SessionCard";
import { fetchSessionById } from "../api/client";
import { tutor } from "../data/mockData";

function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError, error } = useQuery<ApiSession>({
    queryKey: ["sessions", id],
    queryFn: () => fetchSessionById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading tutoring session...
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          {error.message}
        </div>

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

      <SessionCard session={data} />

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