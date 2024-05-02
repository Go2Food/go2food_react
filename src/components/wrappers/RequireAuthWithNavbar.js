import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { BackendURL } from '../configs/GlobalVar';
import LoadingOverlay from '../items/LoadingOverlay';
import { UseUserInfo } from '../../store';

function RequireAuthWithNavbar({ children }) {
  const {UpdateUserName} = UseUserInfo((state) => ({
    UpdateUserName: state.UpdateUserName
  }));
  const [initialCheckValue, setInitialCheckValue] = useState(true);
  const [actualCheckValue, setActualCheckValue] = useState(false);
  const navigate = useNavigate();

  let validateToken = async function () {
    const cookies = new Cookies();
    let token_cookies = cookies.get("jwt_auth");
    let token_session_storage = window.sessionStorage.getItem("jwt_auth")
    let token_value = "null"
  
    // check first if there are jwt values either in cookies or session storage
    if (token_cookies)
    {
      token_value = token_cookies;
    }
    else if (token_session_storage)
    {
      token_value = token_session_storage
    }
  
    // if both cookies and session storage have no jwt values just return false
    if (token_value === "null")
    {
      return false
    }
  
    let result = await axios.post(`${BackendURL}/validate_token/`, {
      token: token_value
    })
      .then(async (response) => {
        if (response.data["detail"] === "Invalid Token") {
          return false
        }
        else if (response.data["detail"] === "Signature has expired") {
          return false
        }
        else {
          const user_id = response.data["detail"]["user_id"]
          get_user_info(user_id)
          return true
        }
      })
      .catch(async (error) => {
        console.log(error, 'error');
        return false
      });
  
    return result;
  }
  
  let get_user_info = async function (user_id) {
        await axios.post(`${BackendURL}/get_account_by_id`, {
          id: user_id
        })
        .then((res) => {
          UpdateUserName(res.data[0]['username']);
        })
        .catch((err) => {
          console.log(err, 'error')
        })
  }

  const checkLogin = async () => {
    let login_valid = await validateToken();
    console.log(login_valid)
    setInitialCheckValue(login_valid);
    setActualCheckValue(login_valid);
  }

  useEffect(() => {
    checkLogin();
  }, [])

  useEffect(() => {
    if (!initialCheckValue) {
      navigate("/login");
    }
  }, [initialCheckValue])

  if (actualCheckValue)
  {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    )
  }
  else {
    return (
      <LoadingOverlay />
    )
  }

};

export default RequireAuthWithNavbar;