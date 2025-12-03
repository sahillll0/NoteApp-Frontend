import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditNoteModal = ({ isOpen, onClose, note }) => {

    const token = localStorage.getItem("token")

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
        }
    }, [note]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://localhost:5000/edit/note/${note._id}` , {
                title,
                description
            },
            {
                headers:{
                    Authorization:` Bearer ${token}`
                }
            }
        
        )
        .then(res => {
            if(res.status === 200){
                setTitle("")
                setDescription("")
                onClose();
                toast.success("Note updated successfully", { autoClose: 2000 })
            }
        })
        .catch(err => {
            toast.error(err.response.data.message, { autoClose: 2000 })
        })
        } catch (error) {
            toast.error("Internal server error", { autoClose: 2000 })
        }
    };

    return (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Note</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="edit-title" className="block text-gray-700 text-sm font-semibold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="edit-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Note Title"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="edit-description" className="block text-gray-700 text-sm font-semibold mb-2">
                                Description
                            </label>
                            <textarea
                                id="edit-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                placeholder="Note Description"
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                            >
                                Update Note
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;
