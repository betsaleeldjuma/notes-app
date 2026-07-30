import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import moment from 'moment'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: 'add',
    data: null
  })

  const [showToastMsg, setShowToastMsg] = useState({
    isShow: false,
    message: "",
    type: "add"
  })

  const [allNotes, setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [isSearch, setIsSearch] = useState(false)

  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShow: true, data: noteDetails, type: "edit"})
  }

  const handleNoteSaved = (type) => {
    if(type === "add") {
      showToastMessage("Note Added Successfully", "add")
    } else {
      showToastMessage("Note Updated Successfully", "add")
    }

    getAllNotes()
  }

  const showToastMessage = (message, type = "add") => {
    setShowToastMsg({
      isShow: true,
      message: message,
      type: type
    })

    setTimeout(() => {
      setShowToastMsg({
        isShow: false,
        message: "",
        type: "add"
      })
    }, 3000)
  }


const handleCloseToast = () => {
  setShowToastMsg({
    isShow: false,
    message: "",
    type: "add"
  })
}  

  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get('/get-user')

      if(response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if(error.response?.status === 401) {
        localStorage.clear();
        navigate('/login')
      } else {
        console.log(error)
      }
    }
  }

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes')

      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Delete Home
  const deleteNote = async (data) => {
    const noteId = data._id

        try {
            const response = await axiosInstance.delete('/delete-note/' + noteId)

            if(response.data && response.data.note) {
                showToastMessage('Note Deleted Successfully', 'delete')
                getAllNotes()
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log("An unexpected error occurred. Please try again")
            }
        }
  }

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get('/search-notes', {
        params: {query}
      })

      if(response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes()
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id

        try {
            const response = await axiosInstance.put('/update-note-pinned/' + noteId, {
                isPinned: !noteData.isPinned
            })

            if(response.data && response.data.note) {
                showToastMessage('Note Updated Successfully', 'add')
                getAllNotes()
            }
        } catch (error) {
            console.log(error)
        }
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo();
    return () => {}
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto'>
        <div className='flex flex-row flex-wrap justify-center items-center gap-4 mt-8'>
          {allNotes.map((item) => (<NoteCard 
            key={item._id}
            title={item.title} 
            date={item.createdOn}
            content={item.content}
            tags={item.tags} isPinned={item.isPinned}
            onEdit={() => handleEdit(item)} 
            onDelete={() => deleteNote(item)} 
            onPinNote={() => updateIsPinned(item)}  
            />)
          )}
        </div>
        <button className='w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg lg:rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' 
        onClick={() => {
          setOpenAddEditModal({isShow: true, type:"add", data: null})
        }}
        >
          <MdAdd className='text-[32px] text-white' />
        </button>
        <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style= {{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }
        }}
        contentLabel=""
        className="w-[90%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll flex flex-row justify-center"
        >
          <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({isShow: false, type:'add', data: null});
          }}
          getAllNotes={getAllNotes}
          showToastMessage={handleNoteSaved}
          />
        </Modal>

        <Toast
        isShow={showToastMsg.isShow}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
        />
      </div>
    </>
  )
}

export default Home