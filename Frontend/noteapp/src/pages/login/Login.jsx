import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/ContextProvider";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://note-app-backend-0tm0.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // console.log(response);
      if (response.data.success) {
        logIn(response.data.user);
        // console.log(response.data.user);
        navigate("/");
        toast.success("Login successfully.");
      }
    } catch (error) {
      console.log("LogIn Failed !", error.message);
      toast.error("Incorrect Login Credentials");
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-5 rounded-[5px] border border-gray-200 bg-white shadow-sm w-80 ">
        <form className="p-2" onSubmit={handleSubmit}>
          <h2 className="font-bold text-gray-500 text-xl text-center">LogIn</h2>

          <div className="pt-4">
            <label className="block text-gray-700 text-[1rem] " htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="rounded-[5px] border border-gray-200 bg-white shadow-sm p-1 mt-0.5 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <label
              className="block text-gray-700 text-[1rem] "
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password "
              required
              className="rounded-[5px] border border-gray-200 bg-white shadow-sm p-1 mt-0.5 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 text-center text-white">
            <button
              type="submit"
              className="w-full bg-gray-500 rounded-[3px] p-2 cursor-pointer"
            >
              Login
            </button>
          </div>
          <div className="pt-2 text-center text-[16px]">
            <p>
              Don't Have Account? <Link to="/register">Register Now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
