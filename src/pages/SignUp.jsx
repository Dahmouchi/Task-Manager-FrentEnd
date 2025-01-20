import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9091/api/auth/signup",
        formData
      );
      if (response.status === 200) {
        toast.success("register user successfly");
        navigate("/login");
        setFormData({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
      } else {
        toast.error("Failed to register user");
        setError(response.data)
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user");
    }
  };
  return (
    <section
      className="bg-center min-h-screen bg-no-repeat bg-gray-700 bg-cover bg-blend-multiply"
      style={{ backgroundImage: 'url("/background3.jpg")' }}
    >
      <div className=" py-8  md:h-screen lg:py-0 w-full lg:flex flex-col items-center justify-center">
        <div className=" mb-6 text-2xl font-semibold text-slate-900 dark:text-white flex items-center justify-center"></div>
        <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-slate-800 dark:border-slate-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter your email ..."
                  required
                />
              </div>
             <div className="flex flex-row items-center w-full gap-2">
             <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  FirstName
                </label>
                <input
                  type="text"
                  placeholder="enter you firstName ..."
                  name="firstName"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  LastName
                </label>
                <input
                  type="text"
                  placeholder="enter your lastName ..."
                  name="lastName"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
             </div>
             
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="username"
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter your username ..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between"></div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                className="w-full text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
            <p className="text-slate-200 text-center">
            Already a member? {" "}
              <a href="/login" className="font-semibold text-blue-600">
              Log in
              </a>
            </p>
          </div>
        </div>
      </div>  
    </section>
  );
};

export default SignUp;
