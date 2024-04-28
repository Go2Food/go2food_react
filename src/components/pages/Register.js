import {React, useState, useRef} from "react";
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register () {
    const navigate = useNavigate()
    const [emailInvalid, SetEmailInvalid] = useState(false);
    const [passwordInvalid, SetPasswordInvalid] = useState(false);
    const [ConfirmPasswordInvalid, SetConfirmPasswordInvalid] = useState(false);
    const [showPassword, SetShowPassword] = useState(false);
    const [showConfirmPassword, SetShowConfirmPassword] = useState(false);

    const ToggleShowPassword = () => {
        SetShowPassword(!showPassword)
    }

    const ToggleShowConfirmPassword = () => {
        SetShowConfirmPassword(!showConfirmPassword)
    }

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);;

    function isValidEmailAddress(address) {
        return !! address.match(/.+@.+/);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let emailValid = true;
        let passwordValid = true;
        let confirmPasswordValid = true;
        console.log(isValidEmailAddress(emailRef.current.value.trim()))

        if (!isValidEmailAddress(emailRef.current.value.trim()))
        {
            SetEmailInvalid(true);
            emailValid = false;
        }
        
        if (passwordRef.current.value.trim() === "")
        {
            SetPasswordInvalid(true);
            passwordValid = false;
        }

        if (confirmPasswordRef.current.value.trim() !== passwordRef.current.value.trim())
        {
            SetConfirmPasswordInvalid(true);
            confirmPasswordValid = false;
        }

        if (emailValid && passwordValid && confirmPasswordValid)
        {
            navigate("/login");
        }
    }

    return (  
        <div className="flex h-[100vh] w-full flex-col bg-gray-100 py-10">
            {/* Login form */}
            <form onSubmit={handleSubmit} className="flex flex-col px-6 py-6 text-center mx-auto my-[40px] bg-white rounded-xl md:w-[500px] w-[350px] shadow-lg" noValidate>

                {/* login info */}
                <div className="my-2">
                    <p className="mb-3 text-4xl font-extrabold text-dark-grey-900">Register</p>
                    <p className="mb-4 text-grey-700">Create your account</p>
                </div>

                {/* register fields */}

                {/* email field */}
                <div className="flex flex-col mb-5">
                    <label for="email" className="mb-2 text-sm text-start text-grey-900">Email</label>
                    <input id="email" type="email" ref={emailRef} required={emailInvalid} placeholder="Email" className="w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer"/>
                    <p for="email" className="text-start hidden peer-required:block peer-invalid:block text-pink-600 text-sm px-2 animate-nav-bars-menu-popup">Please provide a valid email address.</p>
                </div>

                {/* password field */}
                <div className="flex flex-col mb-5">
                    <label for="password" className="mb-2 text-sm text-start text-grey-900">Password</label>
                    <div className="relative">
                        <input id="password" ref={passwordRef} required={passwordInvalid} type={showPassword ? "text" : "password"} placeholder="Password" className="flex items-center w-full pl-5 pr-10 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer"/>
                        {showPassword ? 
                            <VisibilityOffIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowPassword}/>
                            :
                            <VisibilityIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowPassword}/>
                        }
                        <p for="password" className="relative text-start hidden text-pink-600 peer-required:block text-sm px-2 animate-nav-bars-menu-popup">Please provide a password.</p>
                    </div>
                </div>
                
                {/* confirm password field */}
                <div className="flex flex-col mb-5">
                    <label for="confirm_password" className="mb-2 text-sm text-start text-grey-900">Confirm Password</label>
                    <div className="relative">
                        <input id="confirm_password" ref={confirmPasswordRef} required={ConfirmPasswordInvalid} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="flex items-center w-full pl-5 pr-10 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl peer"/>
                        {showConfirmPassword ? 
                            <VisibilityOffIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowConfirmPassword}/>
                            :
                            <VisibilityIcon className={`absolute right-2 -translate-y-[50%] peer-required:-translate-y-[90%] top-[50%] text-gray-400 hover:text-gray-500`} onClick={ToggleShowConfirmPassword}/>
                        }
                        <p for="confirm_password" className="relative text-start hidden text-pink-600 peer-required:block text-sm px-2 animate-nav-bars-menu-popup">Password doesn't match</p>
                    </div>
                </div>

                {/* Register Button*/}
                <button className="max-w-[250px] min-w-[250px] mx-auto px-6 py-5 my-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-green-700 focus:ring-4 focus:ring-purple-100 bg-green-600">Register</button>
                
                <div className="flex flex-row mx-auto">
                    <p className="text-sm leading-relaxed text-gray-900 mr-2">Already registered?</p>
                    <button onClick={() => navigate("/login")}>
                        <p className="text-sm font-bold text-grey-700 hover:underline">Sign in</p>
                    </button>
                </div>

                {/* or separator */}
                <div className="flex items-center my-4">
                    <hr className="h-0 border-b border-solid border-grey-500 grow"/>
                    <p className="mx-4 text-grey-600">or</p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow"/>
                </div>
                
                {/* Sign in with Google o auth*/}
                <button className="flex items-center justify-center mx-auto w-[250px] py-4 my-4 text-sm font-medium rounded-2xl text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-200">
                    <img className="h-5 mr-2 pointer-events-none" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt=""/>
                    <p className="select-none">Sign in with Google</p>
                </button>

            </form>      
        </div>
    )
}

export default Register;