import React, { useEffect, useState,useContext } from 'react'
import Layout from '../../Layouts/Layout'
import { AuthContext } from '../../../context/AuthProvider'
import style from './sinhvien.module.css'
import { Link ,Navigate} from 'react-router-dom'

export default function SinhVien() {
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;
    const [sinhvien, setSinhVien] = useState([])
    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/sinhvien/all')
            .then((response) => response.json())
            .then((data) => {
                setSinhVien(data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);

    return (
        loadAdmin && (
            admin ? <Layout>
                <main className={style.sinhvien_show}>
                    <div className={style.sinhvien_container}>
                        <div className={style.sinhvien_title}>
                            <h1>Trang Quản Lí Tất Cả Sinh Viên</h1>
                        </div>
                        <div className={style.sinhvien_table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Lớp</th>
                                        <th>Tên</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sinhvien.map((e) =>
                                            <tr key={e._id}>
                                                <td>{e.idsv}</td>
                                                <td>{e.lop}</td>
                                                <td>{e.ten}</td>
                                                <td>
                                                    <Link to={`/admin/sinhvien/${e.idsv}`} rel="noopener noreferrer"><i className="fa-regular fa-eye"></i></Link>
                                                    <Link to={`/admin/sinhvien/update/${e.idsv}`} rel="noopener noreferrer"><i className="fa-regular fa-pen-to-square"></i></Link>
                                                    <Link to={`/admin/sinhvien/delete/${e.idsv}`} rel="noopener noreferrer"><i className="fa-solid fa-trash"></i></Link>
                                                </td>
                                            </tr>
                                        )
                                    }



                                </tbody>
                            </table>

                        </div>
                    </div>
                </main>
            </Layout> : <Navigate to='/infor'></Navigate>
        )

    )
}
