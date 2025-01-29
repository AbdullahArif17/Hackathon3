import React from "react";
import Image from "next/image";
import Header from "@/app/multiy-components/headers/header";
import Footer from "@/app/multiy-components/footer-2";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden h-auto flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
            <p className="text-sm text-gray-600 mb-8">
              Enter your credentials to access your account.
            </p>
            <form className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Log In
              </button>
            </form>

            {/* Footer Section */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register here
                </a>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto">
            <Image
              src="/media.png" // Replace with your image path
              alt="Login Illustration"
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

export default Login;
