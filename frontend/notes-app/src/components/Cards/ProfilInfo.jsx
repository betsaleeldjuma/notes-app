import React from 'react'
import { getInitials } from '../../utils/helper'
import { useTranslation } from 'react-i18next';

const ProfilInfo = ({userInfo, onLogout}) => {
    const {t} = useTranslation()

    if(!userInfo) return null;

  return (
    <div>
        <div className='block lg:hidden flex flex-col gap-2 lg:gap-3'>
            <div className='w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitials(userInfo.fullName)}
            </div>
            <button className='text-sm text-slate-700 underline' onClick={onLogout}>
                {t("Logout")}
            </button>
        </div>
        <div className='hidden lg:block flex justify-center gap-3'>
            <div className='w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
                {getInitials(userInfo.fullName)}
            </div>
            <div className='flex flex-col items-start gap-2'>
                <p className='text-sm font-medium'>{userInfo.fullName}</p>
                <button className='text-sm text-slate-700 underline' onClick={onLogout}>
                    {t("Logout")}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProfilInfo