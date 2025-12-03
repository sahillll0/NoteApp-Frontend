
import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewNoteAdd = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [noteData, setNoteData] = useState({
        title: "",
        description: ""
    })

    const handelChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/notes", noteData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(() => {
                    toast.success("Note added successfully", { autoClose: 1000 })
                    navigate("/notes")
                })
                .catch(err => console.log(err))
        } catch (error) {
            toast.error(error.response.data.message, { autoClose: 2000 })


        }

    }


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a New Note</h2>
                    <form onSubmit={handelSubmit}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter note title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={noteData.title}
                                onChange={handelChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter note description"
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={noteData.description}
                                onChange={handelChange}

                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                            <button type="submit" className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Note</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewNoteAdd