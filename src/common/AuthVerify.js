import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContex';
import CartContext from '../context/CartContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import { socket } from '../web-sockets';

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = function () {
  const userContext = UserContext.useContainer();
  const cartContext = CartContext.useContainer();
  const history = useHistory();

  

  

  const isValid = () => {
    const token = JSON.parse(localStorage.getItem('jwt')) || undefined;
    let decodedJwt;
    if (token) {
      decodedJwt = parseJwt(token);
    }
    return token != null && decodedJwt?.exp * 1000 > Date.now();
  };

  const { data: user, isSuccess: getUserSuccess } = useQuery(
    'userData',
    () => {
      let token = JSON.parse(localStorage.getItem('jwt'));
      return axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      enabled: isValid(),
    }
  );

  const { data: cart, isSuccess: getCartSuccess } = useQuery(
    'cart',
    () => {
      let token = JSON.parse(localStorage.getItem('jwt'));
      return axios.get(
        `http://localhost:1337/carts?users_permissions_user=${user.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      enabled: isValid() && getUserSuccess,
      onSuccess: data => { 
        let token = JSON.parse(localStorage.getItem('jwt'));
        console.log(user, data);
        userContext.login({
          jwt: token,
          user: user.data,
        });
        cartContext.setCart(data.data[0]);
        socket.auth = { id: user.data.id };
        socket.connect();
      },
    }
  );

  console.log(user, cart);

  // if(getUserSuccess && getCartSuccess) {
  //   userContext.login({
  //     jwt: token,
  //     user: user.data
  //   })
  //   cartContext.setCart(cart.data[0])
  // }

  // useEffect(() => {
  //   userContext.login({
  //     jwt: token,
  //     user: user.data
  //   })
  //   cartContext.setCart(cart.data[0])
  // }, [])

  // useEffect(() => {
  //   axios.get('http://localhost:1337/users/me', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }, []);

  history.listen(() => {
    let token = JSON.parse(localStorage.getItem('jwt'));
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        userContext.logout();
        cartContext.logout();
      }
    }
  });

  return <div></div>;
};

export default AuthVerify;
