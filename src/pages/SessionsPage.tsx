import { useState } from "react";
import { Link } from "react-router";

import SessionCard from "../components/SessionCard";
import { allSessions } from "../data/mockData";

function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSessions = allSessions.filter(
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
        onChange={(e) => setSearchTerm(e.target.value)}
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