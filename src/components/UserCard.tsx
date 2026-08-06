import type { User } from "../types";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (): void => {
    onSelect(user);
  };

  const handleNoteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log("Note:", e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {user.name}
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        {user.email}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Role: {user.role}
      </p>

      <button
        onClick={handleClick}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Select
      </button>

      <input
        onChange={handleNoteChange}
        placeholder="Quick note (demo only)"
        className="mt-4 w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}

export default UserCard;