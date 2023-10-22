import React from 'react'
// import { useContext } from 'react'
import style from './header.module.css'
import { Link } from 'react-router-dom'
// import { AuthContext } from '../../../context/AuthProvider'
import {useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const auth = localStorage.getItem('token');
  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate()
  
  useEffect(() => {
    // if (!auth) return setAuth('')

    fetch('https://back-end-iot.onrender.com/sinhvien/checktoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: auth
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          localStorage.setItem('token', '');
        }
      })
  }, [])

  function logout(){
    localStorage.setItem('token', '');
    navigate('/')
  }

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src="/images/logo.png" alt=""></img>
      </div>
      <ul>
        <li><a href="/admin" rel="noopener noreferrer">Admin</a></li>
        <li><Link to="/" rel="noopener noreferrer">Trang chủ</Link></li>
        <li><a href="/infor">Thông tin sinh viên</a></li>
        {/* <li><Link to="/" rel="noopener noreferrer">Thông báo điểm danh</Link></li> */}

        {
          !auth ? <><li><a href="/signin" rel="noopener noreferrer">Đăng nhập</a></li>
            <li><a href="/signup" rel="noopener noreferrer">Đăng kí</a></li></>
            :
            <li><button onClick={logout}>Đăng xuất</button></li>
        }
      </ul>
    </header>
  )
}
