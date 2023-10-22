import React, { useEffect, useState ,useContext} from 'react'
import Layout from '../../../Layouts/Layout'
import style from './viewsv.module.css'
import { AuthContext } from '../../../../context/AuthProvider'
import {useParams} from 'react-router-dom'
import {Navigate} from 'react-router-dom'

export default function ViewSinhVien() {
    const [sinhvien, setSinhVien] = useState({})
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;
    const id = useParams().id
    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/sinhvien/'+id)
            .then((response) => response.json())
            .then((data) => {
                setSinhVien(data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);
    return (
        loadAdmin &&(
            admin?<Layout>
            <div className={style.sv_container}>
                <div className={style.sv_img}>
                    <img src={sinhvien.img} alt="ok bro" />
                </div>
                <p>ID: {sinhvien.idsv}</p>
                <p>Họ tên: {sinhvien.ten}</p>
                <p>Lớp: {sinhvien.lop}</p>
                <p>Ngày sinh: {sinhvien.ngaysinh}</p>
            </div>

        </Layout>: <Navigate to='/infor'></Navigate>
        )

    )
}
