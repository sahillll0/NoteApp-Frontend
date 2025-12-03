import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import EditNoteModal from '../components/EditNoteModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Notes = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    axios.get("https://note-app-backend-api.vercel.app/allnotes", {
      headers: { // 'Headers' should be 'headers' (lowercase 'h')
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setNotes(res.data.notes)

      })
      .catch((err) => {

        toast.error(err.response.data.message, { autoClose: 2000 })
      })
  }, [])

  const handleNoteDeleted = (deletedNoteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note._id !== deletedNoteId));
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setCurrentNote(null);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                _id={note._id} // Pass the id as a prop
                description={note.description}
                createdAt={note.createdAt}
                onNoteDeleted={handleNoteDeleted} // Pass the delete handler
                onEdit={() => handleEditNote(note)}
              />
            ))
          ) : (
            <div className='col-span-full flex items-center justify-center min-h-[50vh]'>
              <h1 className='text-2xl font-bold text-gray-800'>No notes found</h1>
            </div>
          )}
        </div>
      </div>

      <button onClick={() => navigate("/newnote")} className="cursor-pointer fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <EditNoteModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        note={currentNote}
      />
    </div>
  )
}

export default Notes