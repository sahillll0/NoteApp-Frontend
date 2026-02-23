import { Link } from 'react-router-dom'
import './Ragister.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenLS } = useAuth();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [from, setFrom] = useState({
    email: "",
    password: ""
  });

  const hamdelChange = (e) => {
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
      const res = await axios.post("https://note-app-backend-api.vercel.app/login", from);

      if (res.status === 200) {
        storeTokenLS(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successfully", { autoClose: 1000 });

        setTimeout(() => {
          navigate("/notes");
        }, 1000);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message, { autoClose: 2000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
      <div className="register-container">
        <h2 className="register-title">Welcome Back</h2>
        <p className="text-sm text-gray-500 text-center mb-4">Login to access your notes</p>
        {error && (
          <p className="text-red-600 text-center text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="form-input"
              placeholder="Enter your email"
              value={from.email}
              onChange={hamdelChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="form-input"
              placeholder="Enter your password"
              value={from.password}
              onChange={hamdelChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="register-button cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="register-footer gap-1">
          Don't have an account?{" "}
          <Link to="/" className="cursor-pointer">
            <span className="text-black">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
