import React, { useState } from 'react'
import { createContainer } from "unstated-next"


function useCart() {
  const [cart, setCart] = useState({})
  const logout = () => {
    setCart({})
  }
  return { cart, setCart, logout }
}

const CartContext = createContainer(useCart)

export default CartContext