import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post(`/api/auth/login`, userInput);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatApp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('./images/bg.jpg')" }}
    >
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white/20 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-white">
          <div>
            <label className="block font-bold text-lg">Email :</label>
            <input
              id="email"
              type="email"
              onChange={handleInput}
              placeholder="Enter your email"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block font-bold text-lg">Password :</label>
            <input
              id="password"
              type="password"
              onChange={handleInput}
              placeholder="Enter your password"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center text-white mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-bold text-blue-300 hover:underline">
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
