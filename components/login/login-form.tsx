"use client";

import { useToast } from "@/components/ui/toast-context";
import { loginUser } from "@/lib/api/index";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/lib/AuthProvider";
import { validateLoginForm } from "@/schema/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setSuccessMsg, setErrorMsg, setInfoMsg } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSuccessMsg("");
    setErrorMsg("");
    setInfoMsg("");

    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      console.log('Login response: ', response);

      if (response.data && response.success === true) {
        setSuccessMsg(response.message);
        await login(response.data);
        
        setEmail("");
        setPassword("");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle different types of errors
      if (error.message) {
        setErrorMsg(error.message);
      } else if (typeof error === 'string') {
        setErrorMsg(error);
      } else {
        setErrorMsg("An unexpected error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-white mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your email"
            disabled={loading}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-white mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your password"
            disabled={loading}
            required
          />
          <span
            className="absolute right-3 top-10 flex items-center text-gray-500 dark:text-white cursor-pointer hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5 mt-2" />
            ) : (
              <FaEye className="w-5 h-5 mt-2" />
            )}
          </span>
        </div>

        <div className="text-right mb-6">
          <a
            href="#"
            className="text-sm text-indigo-500 dark:text-white hover:underline transition"
          >
            Forgot your password ?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white dark:text-white rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
