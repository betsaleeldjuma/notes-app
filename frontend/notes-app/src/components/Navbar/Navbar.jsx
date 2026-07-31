import React, { useState } from 'react'
import ProfilInfo from '../Cards/ProfilInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import { PiNotePencilBold } from "react-icons/pi";
import { useTranslation } from 'react-i18next';

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  const {t} = useTranslation()
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
    navigate('/login');
  }

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2 flex items-center gap-2'><PiNotePencilBold size={30} className='text-primary' />{t("Notes")}</h2>
        <SearchBar
        value={searchQuery}
        onChange={({target}) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />
        <ProfilInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar