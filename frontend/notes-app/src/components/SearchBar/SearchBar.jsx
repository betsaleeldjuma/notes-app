import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation()

  return (
    <div className='w-80 flex items-center px-4 lg:bg-slate-100 rounded-md'>
      <div className='block lg:hidden flex items-center gap-5'>
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (<div className='absolute top-13 left-20 flex justify-center items-center gap-5 rounded-full pr-3 pl-3 bg-slate-100 shadow-xl'>
          <input 
          type='text'
          placeholder={t('Search your notes')}
          className='w-full text-2sm lg:text-xl bg-transparent py-[11px] outline-none'
          value={value}
          onChange={onChange}
        />
        <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={() => setIsOpen(false)} />
        </div>)}
      </div>
      <div className='hidden lg:block'>
        <input 
        type='text'
        placeholder={t('Search yours notes')}
        className='w-full text-xl bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
        />
        {value && <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />}
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />
      </div>
    </div>
  )
}

export default SearchBar