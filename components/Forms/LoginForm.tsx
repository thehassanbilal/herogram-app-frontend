import React, { FC, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Head from "next/head";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/router";

interface LoginFormProps {
  setDisplayLoginForm: (value: React.SetStateAction<boolean>) => void;
}

const LoginForm: FC<LoginFormProps> = ({ setDisplayLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
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
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <TestingTipBox />
      <div className="flex justify-center items-center py-4">
        <form
          className="bg-white p-8 rounded shadow-md border border-gray-400 w-96"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to begin!
          </h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="text-blue-600 text-sm cursor-pointer"
            onClick={() => setDisplayLoginForm((prev) => !prev)}
          >
            Create new account?
          </button>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const TestingTipBox: FC = () => {
  return (
    <div
      className={`bg-gray-100 border-2 my-4 w-[30%] m-auto flex items-center justify-center border-gray-500 rounded-lg text-gray-900 px-4 py-4 shadow-md`}
      role="alert"
    >
      <div className="flex justify-center">
        <div>
          <p className="font-bold flex items-center -ml-6">
            <div className="py-4">
              <IconBulb />
            </div>
            <span>Testing: Here is a user from Database to login! </span>
          </p>
          <p className="text-sm">
            <b>Email:</b> joe@herogram.com
          </p>
          <p className="text-sm">
            <b>Password:</b> mypassword
          </p>
        </div>
      </div>
    </div>
  );
};

function IconBulb(props: any) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M348 676.1C250 619.4 184 513.4 184 392c0-181.1 146.9-328 328-328s328 146.9 328 328c0 121.4-66 227.4-164 284.1V792c0 17.7-14.3 32-32 32H380c-17.7 0-32-14.3-32-32V676.1zM392 888h240c4.4 0 8 3.6 8 8v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32v-32c0-4.4 3.6-8 8-8z" />
    </svg>
  );
}

export default LoginForm;
