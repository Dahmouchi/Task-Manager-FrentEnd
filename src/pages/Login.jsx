import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error state
  
    try {
      const res = await axios.post("http://localhost:9091/api/auth/signin", {
        username: form.email,
        password: form.password,
      });
  
      if (res.status === 200) {
        
        localStorage.setItem("authToken", res.data);
        console.log(res)
        toast.success("Login successful")
        console.log("Login successful");
        navigate("/dashboard");
        // router.push("/dashboard"); Redirect to dashboard
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Error during login")
      // Capture more specific error messages, if available
      setError(
        err.response?.data?.message || "An unexpected error occurred during sign-in."
      );
    }
  };
  return (
    <section
      className="bg-center min-h-screen bg-no-repeat bg-gray-700 bg-cover bg-blend-multiply"
      style={{ backgroundImage: 'url("/background3.jpg")' }}    >
      <div className=" py-8  md:h-screen lg:py-0 w-full lg:flex flex-col items-center justify-center">
        <div className=" mb-6 text-2xl font-semibold text-slate-900 dark:text-white flex items-center justify-center"></div>
        <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-800 dark:border-slate-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
            Connectez-vous à votre compte
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  value={form.email}
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter votre username ..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Mot de pass
                </label>
                <input
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
               
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                className="w-full text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Se connecter
              </button>
            </form>
            <p className="text-slate-200 text-center">Vous n'avez pas encore de compte ? <a href="/register" className="font-semibold text-blue-600">Créer un compte</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};



export default Login;
