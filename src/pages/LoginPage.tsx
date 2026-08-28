import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "../store/authStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    login(name.trim());
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Peer Tutoring Platform
        </h1>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Sign in to manage tutoring sessions and bookings.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-gray-900 dark:text-white"
            >
              Name
            </Label>

            <Input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
            />
          </div>

          <Button
            type="submit"
            disabled={name.trim() === ""}
            className="w-full"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;