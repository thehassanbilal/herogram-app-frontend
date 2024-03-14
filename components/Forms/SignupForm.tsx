import React, { FC, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/router";

interface SignupFormProps {
  setDisplayLoginForm: (value: React.SetStateAction<boolean>) => void;
}
const SignupForm: FC<SignupFormProps> = ({ setDisplayLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        login(user);
        router.replace("/");
      } else {
        const data = await response.json();
        setError(data.message || "Sign up failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center mt-10 items-center py-4">
      <form
        className="bg-white p-8 rounded shadow-md border border-gray-400 w-96"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up for an account
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="emailSignUp"
          >
            Email
          </label>
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type="text"
            id="emailSignUp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="passwordSignUp"
          >
            Password
          </label>
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type="password"
            id="passwordSignUp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="confirmPasswordSignUp"
          >
            Confirm Password
          </label>
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type="password"
            id="confirmPasswordSignUp"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="text-blue-600 text-sm cursor-pointer"
          onClick={() => setDisplayLoginForm((prev) => !prev)}
        >
          Login instead?
        </button>
        <div className="flex items-center justify-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
