import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';


const Profile = () => {

    // Dummy user data for UI display purposes
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handelDeleteAccount = async () => {
        try {
            const res = await axios.delete("http://localhost:5000/delete-account", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.status === 200) {
                toast.success("Account deleted successfully.", { autoClose: 2000 });
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsModalOpen(false);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred while deleting the account.", { autoClose: 2000 });
            console.log(err);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

                    <div className="space-y-6">

                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-1">Full Name</label>
                                <p className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">{user.fullName}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-1">Email Address</label>
                                <p className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">{user.email}</p>
                            </div>
                        </div>

                        <hr />

                        {/* Account Actions Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
                            <div className="flex flex-col sm:flex-row gap-4 ">
                                <button type="button" className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                                    <Link to="/update-password">Update Password</Link></button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                                >Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handelDeleteAccount}
                title="Delete Account"
                message="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
            />
        </div>
    );
};

export default Profile;