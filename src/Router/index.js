import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Explore from '../components/Explore';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import SellBook from '../components/SellBook';
import YourBooks from '../components/YourBooks';
import Details from '../components/details';
import Cart from '../components/Cart';
import Payment from '../components/Payment';
import AllBooks from '../components/AllBooks';
import AddBook from '../components/AddBook';
import ModifyBook from '../components/ModifyBook';
import AllOrders from '../components/AllOrders';
import ModifyOrder from '../components/ModifyOrder';
import AllUsers from '../components/AllUsers';
import ModifyUser from '../components/ModifyUser';
import AddUser from '../components/AddUser';
import PaySuccess from '../components/PaySuccess';
import MyOrders from '../components/MyOrders';
import Contact from '../components/Contact';

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
      { path: '/mybooks',  component: YourBooks },
      { path: '/signin',  component: Signin },
      { path: '/signup',  component: Signup },
      { path: '/modifyuser',  component: ModifyUser },
      { path: '/modifyorder',  component: ModifyOrder },
      { path: '/modifybook',  component: ModifyBook },
      { path: '/adduser',  component: AddUser },
      { path: '/addabook',  component: AddBook },
      { path: '/allorders',  component: AllOrders },
      { path: '/allusers',  component: AllUsers },
      { path: '/allbooks',  component: AllBooks },
      { path: '/contact',  component: Contact },
    ],
  },
];

export default routes;
