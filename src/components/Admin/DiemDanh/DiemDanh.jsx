import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../Layouts/Layout'
import { useParams ,useNavigate,Navigate} from 'react-router-dom'
import style from './diemdanh.module.css'

export default function DiemDanh() {
    const [giaovien, setGiaovien] = useState('')
    const [lop, setLop] = useState('')
    const navigate = useNavigate()


    function doiLop(e) {
        setLop(e.target.value)
    }
    function doiTen(e) {
        setGiaovien(e.target.value)
    }
    function submit() {
        fetch('https://back-end-iot.onrender.com/diemdanh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lop: lop,
                giaovien: giaovien
            }),
        })
            .then((res) => {
                if (res.status === 200) alert('Tạo thành công')
                navigate('/admin')
            })
    }
    return (
        <Layout>
            <div className={style.update_container}>
                <input onChange={doiTen} placeholder="Tên Giáo Viên"></input>
                <input onChange={doiLop} placeholder="Lớp Học"></input>
                <button onClick={submit} className={style.button_3}>Submit</button>
            </div>

        </Layout>
    )
}
