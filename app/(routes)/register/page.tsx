import React from "react";
import Header from "@/app/multiy-components/headers/header";
import Footer from "@/app/multiy-components/footer-2";
import Image from "next/image";

const Register = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden h-auto flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Create an Account
            </h2>
            <form className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-gray-600 mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Email Input */}
              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Password Input */}
              <div>
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login here
              </a>
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto">
            <Image
              src="/carousel1.png" // Replace with your image path
              alt="Register"
              width={600}
              height={500}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
