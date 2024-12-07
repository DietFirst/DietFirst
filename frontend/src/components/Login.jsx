import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);  // State to track login success

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      setError("");
      console.log("Attempting login with:", { email, password });

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
      );

      console.log("Login response:", response.data);

      const { token } = response.data;
      localStorage.setItem("token", token);

      if (onLogin) {
        onLogin();
        console.log("Logged in");
      }

      setLoginSuccess(true);  // Set loginSuccess to true on successful login

    } catch (error) {
      setError("Invalid email or password.");
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    console.log("Google login success:", credentialResponse);
    // Here, you can use the credentialResponse.token to authenticate with your server or Google APIs
  };

  const handleGoogleLoginError = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex h-screen items-center justify-center p-6">
        <Navbar />
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-cyan-600">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-cyan-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Login
            </button>
          </form>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}

           {/* Displaying success message */}
           {loginSuccess && (
            <p className="mt-4 text-center text-green-500 font-semibold">
              Login successful!
            </p>
          )}

          {/* Google Login Button with full width */}
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleLoginError}
              useOneTap
              shape="rectangular"
              size="large"
              width="full"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
