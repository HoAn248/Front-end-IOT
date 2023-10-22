import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../Layouts/Layout'
import style from './adminpage.module.css'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'

export default function AdminPage() {
    const [monHoc, setMonHoc] = useState([])
    const [lop, setLop] = useState([])
    const [diemdanh, setDiemdanh] = useState([])
    const [sinhvien, setSinhVien] = useState([])
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;

    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/monhoc')
            .then((response) => response.json())
            .then((data) => {
                setMonHoc(data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);
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
    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/diemdanh')
            .then((response) => response.json())
            .then((data) => {
                setDiemdanh(data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);

    function updateDiemDanh(params) {
        console.log(params.target.value);
        fetch('https://back-end-iot.onrender.com/diemdanh/update/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: params.target.value
            }),
        })
            .then((res) => {
                if (res.status === 200) alert('Sửa thành công')
            })
    }

    return (

        loadAdmin && (
            admin ? <Layout>
                <main className={style.admin_show}>
                    <div className={style.admin_container}>
                        <div className={style.admin_title}>
                            <h1>Trang Quản Lí Sinh Viên, Môn Học</h1>
                        </div>
                        <div className={style.admin_table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Thông tin</th>
                                        <th>Số lượng</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lớp</td>
                                        <td>{lop.length}</td>
                                        <td><Link to="./lop" rel="noopener noreferrer">Hiển thị thêm</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Sinh Viên</td>
                                        <td>{sinhvien.length}</td>
                                        <td><Link to="./sinhvien" rel="noopener noreferrer">Hiển thị thêm</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Môn Học</td>
                                        <td>{monHoc.length}</td>
                                        <td><Link to="./monhoc" rel="noopener noreferrer">Hiển thị thêm</Link></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className={style.box_diemdanh}>
                            <a href='/admin/diemdanh' className={style.btn_admin}>Tạo Điểm Danh</a>
                        </div>
                        <div className={style.admin_table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Người Điểm Danh</th>
                                        <th>Lớp</th>
                                        <th>Trạng thái</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        diemdanh.map((e) => (
                                            <tr key={e._id}>
                                                <td>{e.giaovien}</td>
                                                <td>{e.lop}</td>
                                                <td>{e.trangthai.toString()}</td>
                                                <td>
                                                    <button onClick={updateDiemDanh} value={e._id}>{e.trangthai?"Tắt":"Bật"}</button>
                                                </td>
                                                {/* <td><Link to="./lop" rel="noopener noreferrer">Hiển thị thêm</Link></td> */}
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
