import React from 'react'
import { Link } from 'react-router-dom'
import './Ragister.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'

const Register = () => {
  const navigate = useNavigate();
  const { storeTokenLS } = useAuth();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [from, setFrom] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handelChange = (e) => {
    setFrom({
      ...from,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await axios.post("https://note-app-backend-api.vercel.app/register", from);

      if (res.status === 200) {
        toast.success("Register successful", { autoClose: 1000 });
        storeTokenLS(res.data.token);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message, { autoClose: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="register-container">
        <h2 className="register-title">Create Account</h2>
        <p className="text-sm text-gray-500 text-center mb-4">Sign up to start creating notes</p>
        {error && (
          <p className="text-red-600 text-center text-sm mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              className="form-input"
              placeholder="Enter your name"
              value={from.fullName}
              onChange={handelChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="form-input"
              placeholder="Enter your email"
              value={from.email}
              onChange={handelChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="form-input"
              placeholder="Create a password"
              value={from.password}
              onChange={handelChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="register-button cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="cursor-pointer">
            <span className="text-black">Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
