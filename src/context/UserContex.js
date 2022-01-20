import React, { useState } from 'react'
import { createContainer } from "unstated-next"
import { socket } from '../web-sockets';

function useUser() {
  const [user, setUser] = useState({})

  const login = (data) => {
    localStorage.setItem('jwt', data.jwt)
    setUser(data.user)
    socket.auth = { id: data.user.id };
    socket.connect();
  }
  const logout = () => {
    window.localStorage.removeItem('jwt')
    setUser({})
    socket.disconnect()
  }

  return { user, login, logout }
}

const User = createContainer(useUser)

export default User