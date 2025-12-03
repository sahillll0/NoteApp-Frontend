import React from 'react'
import { Link } from 'react-router-dom'
import './Ragister.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'

const Register = () => {

  const ragisterNotify = ()=> toast("Ragister Successfull" , {autoClose : 1000 , style: {
    background: "#4caf50",
    color: "#fff",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "5px",
  }})

  const errorNotify = ()=> toast("Something went wrong" , {autoClose : 1000 , style: {
    background: "red",
    color: "#fff",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "5px",
  }})

  const navigate = useNavigate();
  const {storeTokenLS} = useAuth()

  const [error , setError] = useState("")
  const [from, setFrom] = useState({
    fullName : "",
    email :"",
    password : ""
  })

  

  const handelChange = (e) =>{
    setFrom({
      ...from,
      [e.target.name] : e.target.value
    })

  }

  const handleSubmit = async  (e) => {
    e.preventDefault();
     try {
       await axios.post("https://note-app-backend-api.vercel.app/register" , from)
       .then((res)=>{
        if (res.status === 200) {
          ragisterNotify()
            storeTokenLS(res.data.token)
           setTimeout(()=>{
          navigate("/login")
           },1000)
        }
       })
       .catch((err)=> setError(err.response.data.message))
     } catch (error) {
       errorNotify()
        toast.error(error.response.data.message , {autoClose:2000})

     }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="register-container">
        <h2 className="register-title">Create Account</h2>
        <p className='text-red-600 aligh-center text-center text-xl ' >{error}</p>
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
          <button type="submit" className="register-button cursor-pointer">Sign Up</button>
        </form>
        <div className="register-footer">
          Already have an account? <Link to="/login" className='cursor-pointer'><span className='text-black'>Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Register