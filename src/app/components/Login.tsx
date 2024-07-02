"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin, setError } from "../store/slices/loginSlice";
import { Dispatch } from "redux";
import { RootState } from "../store/store";

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch, _getState: () => RootState) => {
    try {
      if (email === "admin" && password === "saravanan") {
        dispatch(setLogin(true));
      } else {
        dispatch(setError("Invalid email or password"));
      }
    } catch (error) {
      dispatch(setError("An error occurred"));
    }
  };
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmitter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email) return setErrorMessage("Please enter a valid email ID");
    if (!input.password) return setErrorMessage("Password is required");
    if (input.email !== "admin" || input.password !== "saravanan")
      return setErrorMessage("Invalid email or password");

    dispatch(setLogin(true));
    router.push("/Home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <div className="text-center mb-4">
          <img src="/assets/Logo.jpg" alt="Logo" className="mx-auto mb-4" />
          <h1 className="text-xl font-bold">Login</h1>
        </div>
        <form onSubmit={formSubmitter}>
          {errorMessage.length > 0 && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <div className="mb-4">
            <input
              type="text"
              name="email"
              required
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-blue-500">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
