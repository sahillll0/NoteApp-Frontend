
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ searchQuery, onSearchChange }) => {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  
  // const user = localStorage.setItem("user" , JSON.stringify(res.data.user))
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        NotesApp
      </div>

      <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg w-1/3">
        <input
          type="text"
          placeholder="Search by title..."
          className="bg-transparent outline-none w-full text-sm text-gray-700"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <div onClick={()=> navigate('/profile')} className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg cursor-pointer">
          {user.email[0].toUpperCase()}
        </div>
        <button className="text-sm text-gray-600  font-medium hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg cursor-pointer">
          <Link to="/logout">Logout</Link>
        </button>
      </div>
    </div>
  )
}

export default Navbar