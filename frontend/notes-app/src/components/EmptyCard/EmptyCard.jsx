import React from 'react'
import { useTranslation } from 'react-i18next';
import { ImFilesEmpty } from "react-icons/im";

const EmptyCard = () => {
  const {t} = useTranslation();

  return (
    <div className='flex flex-col items-center justify-center mt-30 gap-5'>
        <ImFilesEmpty size={200} className='text-slate-200' />
        <p className='text-xl text-slate-300'>{t("Your notes are empty")}</p>
    </div>
  )
}

export default EmptyCard