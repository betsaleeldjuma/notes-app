import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { RiLoginCircleFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher'

const Login = () => {
    const {t}= useTranslation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return
        }

        if(!password) {
            setError("Please enter the password")
        }

        setError("")

        //Login API Call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password
            });

            if(response.data && response.data.token) {
                localStorage.setItem("token", response.data.token)
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
        <div className='flex items-center justify-center mt-25 lg:mt-28 p-5 lg:p-0'>
            <div className='w-96 border rounded bg-white px-7 py-18'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7 flex items-center gap-1'><RiLoginCircleFill className='text-primary' />{t("Login")}</h4>
                    <input type='text' placeholder={t('Email')} className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                    <button type='submit' className='btn-primary'>{t("Login")}</button>
                    <p className='text-sm text-center mt-4'>
                        {t("Not registered yet?")}{" "}
                        <Link to="/signup" className='font-medium text-primary underline'>{t("Create an Account")}</Link>    
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

export default Login