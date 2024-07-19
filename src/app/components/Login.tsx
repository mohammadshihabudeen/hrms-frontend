// components/Login.tsx
"use client";
import React, { useState, useEffect } from "react";
import { clearSession, setSession } from "@/app/store/slices/sessionSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/authService";
import { RootState, AppDispatch } from "../store/store";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmitter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password) return;

    const result = await dispatch(loginUser({ email: input.email, password: input.password }));
    if (loginUser.fulfilled.match(result)) {
      dispatch(clearSession());
      const customSession = {
        user: {
          id: result.payload.id,
          name: result.payload.name,
          role: result.payload.role,
          image: result.payload.image || "/profile.png",
        },
      };
      dispatch(setSession(customSession));
      router.push("/pages/Home");
    }
  };

  return (
    <div className="background_image flex items-center justify-center min-h-screen bg-gray-200">
      <div className="login_box relative p-10 bg-white shadow-lg rounded-2xl max-w-lg">
        <div className="text-center mb-2">
          <img src="/assets/Logo.jpg" alt="Logo" className="img mx-auto " />
        </div>
        <form onSubmit={formSubmitter}>
          {error && <p className="text-red-500 mx-5 p-2">{error}</p>}
          <div className="user_box1 relative mb-4">
            <input
              type="text"
              name="email"
              required
              onChange={handleChange}
              placeholder="Email"
              className="input w-10/12 py-2 text-lg text-gray-600 mt-5 border-bottom-gray border-b-2 border-gray-300 outline-none mx-8"
            />
          </div>
          <div className="user_box relative mb-5">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="Password"
              className="input w-10/12 py-2 text-lg text-gray-600 mb-3 border-bottom-gray border-b-2 border-gray-300 outline-none mx-8"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="login_box_button bg-gradient-to-r from-blue-400 to-blue-700 text-white font-bold py-2 px-8 rounded-full w-1/4 mx-auto"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="a text-gray-600 no-underline font-semibold">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
