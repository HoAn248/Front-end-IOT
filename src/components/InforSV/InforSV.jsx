import React from 'react'
import Layout from '../Layouts/Layout'
import style from './inforsv.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../context/AuthProvider'
function convertDateFormat(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


export default function InforSV() {
    const [user, setUser] = useState({ ten: '', idsv: '', ngaysinh: '', lop: '', diemdanh: '' })
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const auth = localStorage.getItem('token');


    useEffect(() => {

        if (!auth) return navigate('/signin')

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
                if (res.status === 200) {
                    res.json().then(e => setUser(e.data))
                } else {
                    navigate('/signin')
                }
            })
    }, [])
    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/diemdanh/sinhvien', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: auth
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(e => setList(e.data))
                }
            })
    }, [])


    return (
        <Layout>
            <main className={style.main}>
                <div className={style.infor_main}>
                    <div className={style.infor_sv}>
                        <ul>
                            <li>
                                <p>Tên: <span>{user.ten}</span></p>
                            </li>
                            <li>
                                <p>Mã sinh viên: <span>{user.idsv}</span></p>
                            </li>
                            <li>
                                <p>Ngày sinh: <span>{convertDateFormat(user.ngaysinh)}</span></p>
                            </li>
                            <li>
                                <p>Lớp: <span>{user.lop}</span></p>
                            </li>
                        </ul>
                    </div>
                    <div className={style.infor_vh}>
                        <ul className={style.list_infor}>
                            <li>ID Sinh Viên</li>
                            <li>ID Cuộc Điểm Danh</li>
                        </ul>
                        <hr></hr>
                        <div className={style.list_box}>
                            <ul className={style.list_infor}>
                                {
                                    list.map((e) => (
                                        <>
                                            <li>{e.idsv}</li>
                                            <li>{e.idDiemdanh}</li>
                                        </>
                                    ))
                                }
                                {/* <li>Lập trình JS</li>
                                <li>10/09/2023</li>
                                <li>Có</li>
                                <li>Tạ Quốc Ý</li> */}
                            </ul>

                        </div>
                    </div>
                </div>
            </main>
        </Layout>

    )
}
