import React from 'react'
// import { useContext } from 'react'
import style from './signin.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'


export default function Signin() {
  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      idsv: "",
      matkhau: ""
    },
    validationSchema: Yup.object({
      idsv: Yup.string().required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true).length(5, "ID có 5 kí tự"),
      matkhau: Yup.string()
        .required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true)
        .min(6, "Độ dài tối thiểu là 6").max(12, "Độ dài tối đa là 12"),
    }),
    onSubmit: () => {
      fetch('https://back-end-iot.onrender.com/sinhvien/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idsv: formik.values.idsv,
          matkhau: formik.values.matkhau
        }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then(e => {
              const token = e.token;
              localStorage.setItem('token', token);
              // setAuth(localStorage.getItem('token'))
              navigate('/infor')
            });
            
          } else {
            alert('Thông tin tài khoản hoặc mật khẩu không chính xác')
          }
        })
    }
  })

  return (
    <div className={style.login_page} >
      <div className={style.form}>
        <form className={style.login_form} onSubmit={formik.handleSubmit}>
          <input onChange={formik.handleChange} value={formik.values.idsv} id='idsv' type="text" placeholder="Id sinh viên" autoComplete='idsv' />
          {formik.errors.idsv && (<p>{formik.errors.idsv}</p>)}
          <input onChange={formik.handleChange} value={formik.values.matkhau} id='matkhau' type="password" placeholder="Mật khẩu" autoComplete="current-password" />
          {formik.errors.matkhau && (<p>{formik.errors.matkhau}</p>)}
          <button type='submit' >login</button>
          <p className={style.message}><Link to="/" rel="noopener noreferrer">Home Page</Link></p>
          <p className={style.message}>Not registered?<Link to="/signup" rel="noopener noreferrer">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}
