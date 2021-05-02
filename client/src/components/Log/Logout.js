import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";


const Logout = () => {

    const removeCookie = (key) => {
        if (window!== undefined){
            cookie.remove(key, {expires: 1})
        }
    }

const loggout = async () => {
    await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true
    })
    .then(()=> removeCookie('jwt'))
    .catch((err) => console.log(err))
// allows you to go back to the reception and check if the user is existing /jwtid
    window.location = "/"
}

    return (
      <li onClick={loggout}>
          <img src="./img/icons/logout.svg" alt= "logout"/>
      </li>
    );
};

export default Logout;