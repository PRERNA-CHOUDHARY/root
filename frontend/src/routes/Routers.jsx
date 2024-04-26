import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import Pharmacy from '../pages/Pharmacy/Pharmacy'
import { Routes, Route } from 'react-router-dom'
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import UserAccount from "../Dashboard/user-account/UserAccount";
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess'
import ProtectedRoute from "./ProtectedRoute";

export const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:id" element={<DoctorDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/pharmacy" element={<Pharmacy/>}/>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowed={['patient']}>
            <UserAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowed={['doctor']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      </Routes>
   
      </>
  )
}
