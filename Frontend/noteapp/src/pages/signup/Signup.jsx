import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    e.preventDefault();
    try {
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-5 rounded-[5px] border border-gray-200 bg-white shadow-sm w-80 ">
        <form className="p-2">
          <h2 className="font-bold text-gray-500 text-xl text-center">
            SignUp
          </h2>
          <div className="pt-4">
            <label className="block text-gray-700 text-[1rem] " htmlFor="name">
              Name
            </label>
            <input
              className="rounded-[5px] border border-gray-200 bg-white shadow-sm p-1 mt-0.5 w-full"
              type="text"
              placeholder="Enter your name "
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              onClick={handleSubmit}
              className="w-full bg-gray-500 rounded-[3px] p-2 cursor-pointer"
            >
              SignUp
            </button>
          </div>
          <div className="pt-2 text-center text-[16px]">
            <p>Already Have Account? Login</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
