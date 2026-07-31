import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select value={i18n.language} onChange={handleChange} className='border border-slate-200 rounded-lg text-primary p-2'>
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
}

export default LanguageSwitcher