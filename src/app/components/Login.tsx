"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { setError, setLogin } from "../store/slices/loginSlice";
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
    router.push("pages/Home");
  };

  return (
    <div className="background_image flex items-center justify-center min-h-screen bg-gray-200">
  <div className="login_box relative p-10 bg-white shadow-lg rounded-2xl max-w-lg">
    <div className="text-center mb-2">
      <img src="/assets/Logo.jpg" alt="Logo" className="img mx-auto " />
    </div>
    <form onSubmit={formSubmitter}>
      {errorMessage.length > 0 && (
        <p className="text-red-500  mx-5 p-2">{errorMessage}</p>
      )}
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
          className="login_box_button bg-gradient-to-r from-blue-400 to-blue-700 text-white font-bold py-2 px-8 rounded-full w-1/4 mx-auto "
        >
          Login
        </button>
      </div>
      <div className="text-center">
        <a href="#" className="a text-gray-600 no-underline font-semibold ">
          Forgot password?
        </a>
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;
