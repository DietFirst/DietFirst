import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    console.log('Google Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="h-screen flex items-center justify-center p-6">
        <Navbar />
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-cyan-600 mb-6">Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 text-white text-lg font-semibold rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
            >
              Login
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

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
