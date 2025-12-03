
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('')
    const [passwords, setPasswords] = useState({
        oldPassword:"",
        newPassword:""
    })

    const handelChange = (e)=>{
        setPasswords({...passwords,
            [e.target.name] : e.target.value
        })
    }

    const handleUpdatePassword =  async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/update-password" , passwords , 
                {
                    headers:{
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then((res)=>{
               if (res.status === 200) {
                toast.success("Password updated successfully" , {autoClose:2000})
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
               }
              })
              .catch((err)=>{
                setError(err.response.data.message)
              })
              
        } catch (error) {
            setError(error.response.data.message)
        }
       
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl text-center font-bold text-gray-800 mb-10">Update Your Password</h2>
                    <p className="text-center text-xl text-red-500">{error || ""}</p>
                    <form onSubmit={handleUpdatePassword}>
                        <div className="mb-6">
                            <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-semibold mb-2">Old Password</label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="Enter your old password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                                value={passwords.oldPassword}
                                onChange={handelChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Enter your new password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                                value={passwords.newPassword}
                                onChange={handelChange}

                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => navigate(-1)} className="cursor-pointer  px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                            <button
                            type="submit" className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword