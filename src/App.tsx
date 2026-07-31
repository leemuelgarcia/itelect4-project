import { useState, useEffect, useRef } from "react";

import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";

import { useToggle } from "./hooks/useToggle";
import { usePrevious } from "./hooks/usePrevious";

import type { User, Course, Submission } from "./types";

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

const submission: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "github.com/juandc/itelect4-project",
  submittedAt: new Date(),
  score: 95,
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showSubmission, toggleSubmission] = useToggle(true);

  const previousSearch = usePrevious(searchTerm);

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  useEffect(() => {
    setTimeout(() => {
      setCourses([course]);
      setIsLoading(false);
      focusSearch();
    }, 500);
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="app">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <p>Previous search: {previousSearch ?? "None"}</p>

      <UserCard
        user={student}
        onSelect={(u) => setSelectedUser(u)}
      />

      {selectedUser && (
        <p>Selected: {selectedUser.name}</p>
      )}

      {filteredCourses.map((course) => (
        <CourseCard
          key={course.code}
          course={course}
        />
      ))}

      <button onClick={toggleSubmission}>
        Toggle Submission
      </button>

      {showSubmission && (
        <SubmissionBadge submission={submission}>
          <p>On time!</p>
        </SubmissionBadge>
      )}
    </div>
  );
}

export default App;