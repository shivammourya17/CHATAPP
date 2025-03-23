import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});

  const handleInput = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };

  const selectGender = (selectedGender) => {
    setInputData((prev) => ({
      ...prev,
      gender: selectedGender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password !== inputData.confpassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }
    try {
      const register = await axios.post(`http://localhost:4000/api/auth/register`, inputData);
      const data = register.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
      } else {
        toast.success(data.message);
        localStorage.setItem("chatApp", JSON.stringify(data));
        setAuthUser(data);
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('./image/bg.jpg')" }}
    >
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white/20 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-white">
          <div>
            <label className="block font-bold text-lg">Full Name :</label>
            <input
              id="fullname"
              type="text"
              onChange={handleInput}
              placeholder="Enter Full Name"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-3">
            <label className="block font-bold text-lg">Username :</label>
            <input
              id="username"
              type="text"
              onChange={handleInput}
              placeholder="Enter Username"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-3">
            <label className="block font-bold text-lg">Email :</label>
            <input
              id="email"
              type="email"
              onChange={handleInput}
              placeholder="Enter Email"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-3">
            <label className="block font-bold text-lg">Password :</label>
            <input
              id="password"
              type="password"
              onChange={handleInput}
              placeholder="Enter Password"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-3">
            <label className="block font-bold text-lg">Confirm Password :</label>
            <input
              id="confpassword"
              type="password"
              onChange={handleInput}
              placeholder="Confirm Password"
              required
              className="w-full p-2 mt-1 bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender Selection */}
          <div className="mt-3">
            <label className="block font-bold text-lg">Gender :</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={inputData.gender === "male"}
                  onChange={() => selectGender("male")}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-white">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={inputData.gender === "female"}
                  onChange={() => selectGender("female")}
                  className="w-4 h-4 accent-pink-500"
                />
                <span className="text-white">Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-center text-white mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="font-bold text-blue-300 hover:underline">
            Login Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
