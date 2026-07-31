import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';

const SignUp = () => {
  const {t} = useTranslation()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name) {
      setError('Please enter your name');
      return;
    }

    if(!validateEmail(email)) {
      setError('Please enter a valid email adress.');
      return;
    }

    if(!password) {
      setError('Please enter the password');
      return;
    }

    setError('')

    //SignUp API Call
    try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password
            });

            if(response.data && response.data.token) {
              localStorage.setItem("token", response.data.token);
              navigate('/dashboard');
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again")
            }
        }
  }

  return (
    <>
        {/* <Navbar /> */}
        <div className='flex items-center justify-center mt-20 lg:mt-28 p-5 lg:p-0'>
          <div className='w-96 border rounded bg-white px-7 py-18'>
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl text-primary mb-7'><strong>{t("SignUp")}</strong></h4>
              <input 
              type='text' 
              placeholder={t('Names')} 
              className='input-box' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              />
              <input 
              type='text' 
              placeholder={t('Email')} 
              className='input-box' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              />
              <PasswordInput 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              />
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button type='submit' className='btn-primary'>{t("Create Account")}</button>
                <p className='text-sm text-center mt-4'>
                  {t("Already have an account ?")}{" "}
                  <Link to="/login" className='font-medium text-primary underline'>{t("Login")}</Link>    
                </p>
            </form>
          </div>
        </div>
        <div className='absolute bottom-5 right-5'>
          <LanguageSwitcher />
        </div>
    </>
  )
}

export default SignUp