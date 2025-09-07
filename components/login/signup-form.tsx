"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpUser } from "@/lib/api/index";
import { useToast } from "@/components/ui/toast-context";
import { validateSignUpForm } from "@/schema/auth";
import { MdOutlineWarning } from "react-icons/md";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
 

  const {setSuccessMsg,setErrorMsg } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validation = validateSignUpForm({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      photo: selectedImage
    });

    if (!validation.isValid) {
      setErrorMsg(validation.errors[0]); // Show first error
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear previous messages
    setErrorMsg("");
    setSuccessMsg("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // According to API docs, we need to send 'info' as JSON and 'photo' as file
      const signUpInfo = {
        email: formData.email,
        password: formData.password,
        name: formData.name
      };

      formDataToSend.append("info", JSON.stringify(signUpInfo));
      formDataToSend.append("photo", selectedImage!);

      const response = await signUpUser(formDataToSend);

      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }

      setSuccessMsg(response.message || "Registration successful!");
      
      // Reset form on success
      setFormData({ email: "", password: "", name: "" });
      setSelectedImage(null);
      
      // Reset file input
      const fileInput = document.getElementById('uploadImage') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Handle different types of errors
      if (error.message) {
        setErrorMsg(error.message);
      } else if (typeof error === 'string') {
        setErrorMsg(error);
      } else {
        setErrorMsg("An unexpected error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block dark:text-white text-gray-700 mb-2"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block dark:text-white text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your full name"
            disabled={loading}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your password"
            disabled={loading}
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

        <div className="mb-6">
          <label
            htmlFor="uploadImage"
            className="block dark:text-white text-gray-700 mb-2"
          >
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="uploadImage"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setSelectedImage(event.target.files[0]);
              }
            }}
            disabled={loading}
          />
          {selectedImage && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 dark:text-white">
                Selected Image:
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-white">
                {selectedImage.name}
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white dark:text-white rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
