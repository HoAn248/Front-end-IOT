import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout'
import style from './lop.module.css'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'
export default function Lop() {
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;
    const [lop, setLop] = useState([])
    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/lop')
            .then((response) => response.json())
            .then((data) => {
                setLop(data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);
    return (
        loadAdmin && (
            admin ? <Layout>
                <main className={style.class_show}>
                    <div className={style.class_container}>
                        <div className={style.class_title}>
                            <h1>Trang Quản Lí Lớp Học</h1>
                        </div>
                        <div className={style.class_table}>
                            <table>

                                <thead>
                                    <tr>
                                        <th>Tên Lớp</th>
                                        <th>Giáo Viên</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lop.map((e) => (
                                            <tr key={e._id}>
                                                <td>{e.lop}</td>
                                                <td>{e.giaovien}</td>
                                            </tr>
                                        ))
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
