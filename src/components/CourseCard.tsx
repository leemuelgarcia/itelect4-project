import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
}

function CourseCard({
  course,
  variant = "default",
}: CourseCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
        isCompact ? "space-y-1" : "space-y-3"
      }`}
    >
      <h3 className="font-bold text-gray-900 dark:text-white">
        {isCompact ? course.code : course.title}
      </h3>

      {!isCompact && (
        <>
          <p className="text-gray-600 dark:text-gray-300">
            Code: {course.code}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            Units: {course.units}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            Semester: {course.semester}
          </p>
        </>
      )}
    </div>
  );
}

export default CourseCard;