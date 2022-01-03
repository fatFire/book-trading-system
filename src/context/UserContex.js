import React, { useState } from 'react'
import { createContainer } from "unstated-next"
import { useHistory } from 'react-router';
import { socket } from '../web-sockets';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function useUser() {
  const [user, setUser] = useState({})
  const [cart, setCart] = useState({})
  const history = useHistory()

  const login = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data.jwt))
    setUser(data.user)
  }
  const logout = () => {
    window.localStorage.removeItem('jwt')
    setUser({})
    socket.disconnect()
  }
  const reLogin = (user) => {
    setUser(user)
  }
    
  const verify = () => {
    const decodeJWT = parseJwt(localStorage.getItem('jwt'))
    // console.log(decodeJWT)
    if(decodeJWT && decodeJWT.exp * 1000  < Date.now()) {
    }
  }
  //console.log(decodeJWT)
  // console.log(new Date(token?.exp * 1000))

  return { user, login, logout, reLogin, cart, setCart }
}

const User = createContainer(useUser)

export default User