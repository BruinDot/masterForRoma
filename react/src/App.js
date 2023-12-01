import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
// import AppContext from './context';

import Catalog from "./pages/catalog.jsx";
import Auth from "./pages/auth.jsx";
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Admin from "./pages/admin.jsx";
import AddTovar from "./pages/AddTovar.jsx";
import FullTovar from "./pages/FullTovar.jsx";
import Cart from "./pages/cart.jsx";
import History from "./pages/history.jsx";
import Orders from "./pages/orders.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Catalog/>}/>
        <Route path='/tovars/:id' element = {<FullTovar/>}/>
        <Route path='/tovars/:id/edit' element = {<AddTovar/>}/>
        <Route path='/tovars' element = {<Catalog/>}/>
        <Route path='/tovars/sort' element = {<Catalog/>}/>
        <Route path='/auth' element = {<Auth/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/admin' element = {<Admin/>}/>
        <Route path='/admin/addTovar' element = {<AddTovar/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/history' element = {<History/>}/>
        <Route path='/orders' element = {<Orders/>}/>
      </Routes>
    </>
)};
