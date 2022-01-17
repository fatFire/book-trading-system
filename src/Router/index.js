import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Explore from '../pages/Explore/Explore';
import Signup from '../pages/SignUp/Signup';
import Signin from '../pages/Signin/Signin';
import SellBook from '../pages/SellBook/SellBook';
import MyBooks from '../pages/MyBook/MyBooks';
import Details from '../pages/BookDetail/Details';
import Cart from '../pages/Cart/Cart';
import Payment from '../pages/Payment/Payment';

import ModifyBook from '../pages/ModifyBook/ModifyBook';
import PaySuccess from '../pages/PaymentSuccess/PaySuccess';
import MyOrders from '../pages/MyOrder/MyOrders';
import Contact from '../pages/Contact/Contact';
import UserSignin from '../pages/Signin/UserSignin';

const routes = [
  {
    component: Home,
    routes: [
      { path: '/', exact: true, render: () => <Redirect to="/explore" /> },
      { path: '/explore', component: Explore },
      { path: '/sellbook',  component: SellBook },
      { path: '/payment',  component: Payment },
      { path: '/paysuccess',  component: PaySuccess },
      { path: '/cart',  component: Cart },
      { path: '/books/:id',  component: Details },
      { path: '/myorders',  component: MyOrders },
      { path: '/mybooks',  component: MyBooks },
      { path: '/signin',  component: UserSignin },
      { path: '/signup',  component: Signup },
      { path: '/modifybook',  component: ModifyBook },
      { path: '/contact',  component: Contact },
    ],
  },
];

export default routes;
