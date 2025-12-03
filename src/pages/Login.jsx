import { Link } from 'react-router-dom'
import './Ragister.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';



const Login = () => {


   const navigate = useNavigate();
   const {storeTokenLS} = useAuth()

  
    const [error , setError] = useState("")
    const [from, setFrom] = useState({
      email :"",
      password : ""
    })

    const hamdelChange = (e)=>{
      setFrom({
        ...from,
        [e.target.name] : e.target.value
      })
    }
    const handleSubmit = async (e)=>{
    e.preventDefault();
      try {
        await axios.post("http://localhost:5000/login" , from)
        .then((res)=>{
          
          if (res.status === 200) {
            storeTokenLS(res.data.token)
            localStorage.setItem("user" , JSON.stringify(res.data.user))
            toast.success("Login successfully" , {autoClose:1000})
            
            setTimeout(()=>{
              navigate("/notes")
            },[1000])
            
          }
        })
        .catch((err)=>setError(err.response.data.message))
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message , {autoClose:2000})
        
      }
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="register-container">
        <h2 className="register-title">Welcome Back</h2>
        <p className='text-red-600 aligh-center text-center text-xl ' >{error}</p>

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
          <button type="submit" className="register-button cursor-pointer">Login</button>
        </form>
        <div className="register-footer gap-1">
          Don't have an account? <Link to="/" className='cursor-pointer'><span className='text-black'>Sign Up</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Login