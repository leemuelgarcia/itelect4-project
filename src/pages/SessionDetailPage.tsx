import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

import type { ApiSession } from "../types";
import SessionCard from "../components/SessionCard";
import { fetchSessionById } from "../api/client";

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
    </div>
  );
}

export default SessionDetailPage;