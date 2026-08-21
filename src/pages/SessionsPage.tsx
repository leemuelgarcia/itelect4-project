import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import type { ApiSession } from "../types";
import SessionCard from "../components/SessionCard";
import { fetchSessions } from "../api/client";
import useUiStore from "../store/uiStore";

function SessionsPage() {
  const { data, isPending, isError, error } = useQuery<ApiSession[]>({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);

  if (isPending) {
    return (
      <div className="animate-pulse p-6">
        Loading tutoring sessions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  const filteredSessions = data.filter(
    (session) =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Tutoring Sessions
      </h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search sessions..."
        className="mb-6 w-full rounded border px-3 py-2"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map((session) => (
          <Link
            key={session.id}
            to={`/sessions/${session.id}`}
            className="block"
          >
            <SessionCard session={session} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SessionsPage;