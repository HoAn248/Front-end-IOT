import './App.css';
import HomePage from './components/HomePage/HomePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Signin from './components/Signin/Signin';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Signup from './components/Signup/Signup';
import InforSV from './components/InforSV/InforSV';
import AdminPage from './components/Admin/AdminPage/AdminPage';
import Lop from './components/Admin/Lop/Lop';
import MonHoc from './components/Admin/MonHoc/MonHoc';
import SinhVien from './components/Admin/SinhVien/SinhVien';
import ViewSinhVien from './components/Admin/CRUDSinhVien/ViewSinhVien/ViewSinhVien';
import UpdateSinhVien from './components/Admin/CRUDSinhVien/UpdateSinhVien/UpdateSinhVien';
import DeleteSinhVien from './components/Admin/CRUDSinhVien/DeleteSinhVien/DeleteSinhVien';
import AuthProvider from './context/AuthProvider'
import DiemDanh from './components/Admin/DiemDanh/DiemDanh';
function App() {
  return (
    
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/infor' element={<InforSV/>} />

        <Route path='/admin' element={<AuthProvider><AdminPage/></AuthProvider> } />
        <Route path='/admin/lop' element={<AuthProvider><Lop/></AuthProvider>} />
        <Route path='/admin/monhoc' element={<AuthProvider><MonHoc/></AuthProvider>} />
        <Route path='/admin/sinhvien' element={<AuthProvider><SinhVien/></AuthProvider>} />
        {/* <Route path='/admin/sinhvien/lop' element={<AuthProvider><SinhVien/></AuthProvider>} /> */}
        <Route path='/admin/sinhvien/:id' element={<AuthProvider><ViewSinhVien/></AuthProvider>} />
        <Route path='/admin/diemdanh' element={<AuthProvider><DiemDanh/></AuthProvider>} />
        <Route path='/admin/sinhvien/update/:id' element={<AuthProvider><UpdateSinhVien/></AuthProvider>} />
        <Route path='/admin/sinhvien/delete/:id' element={<AuthProvider><DeleteSinhVien/></AuthProvider>} />

        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </>
  
  );
}

export default App;
