import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <nav className="border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/sessions"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                Sessions
              </NavLink>

              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                Bookings
              </NavLink>
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white dark:bg-gray-200 dark:text-gray-900"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-3 py-1.5 text-sm text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-6xl p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;