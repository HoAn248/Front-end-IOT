import React, { useEffect, useState,useContext } from 'react'
import Layout from '../../../Layouts/Layout'
import { AuthContext } from '../../../../context/AuthProvider'
import style from './updatesv.module.css'
import { useParams ,Navigate} from 'react-router-dom'
export default function UpdateSinhVien() {
    const id = useParams().id
    const [idsv, setIDsv] = useState('')
    const [tensv, setTenSV] = useState('')
    const [ngaysinh, setNgaySinh] = useState('')
    const [lop, setLop] = useState('')
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;
    useEffect(() => {
        fetch('https://back-end-iot.onrender.com/sinhvien/' + id)
            .then((response) => response.json())
            .then((data) => {
                setIDsv(data.idsv);
                setTenSV(data.ten);
                setNgaySinh(data.ngaysinh);
                setLop(data.lop);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);

    function doiTen(e) {
        setTenSV(e.target.value)
    }
    function doiID(e) {
        setIDsv(e.target.value)
    }
    function doiNgaySinh(e) {
        setNgaySinh(e.target.value)
    }
    function doiLop(e) {
        setLop(e.target.value)
    }

    function postUpdate() {
        fetch('https://back-end-iot.onrender.com/sinhvien/update/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ten: tensv,
                idsv: idsv,
                ngaysinh: ngaysinh,
                lop: lop
            }),
        })
            .then((res) => {
                if (res.status === 200) alert('Sửa thành công')
            })
    }
    return (
        loadAdmin &&(
            admin?<Layout>
            <div className={style.update_container}>
                <input onChange={doiID} value={idsv} placeholder="ID"></input>
                <input onChange={doiTen} value={tensv} placeholder="Tên sinh viên"></input>
                <input onChange={doiLop} value={lop} placeholder="Lớp"></input>
                <input onChange={doiNgaySinh} value={ngaysinh} placeholder="Ngày sinh"></input>
                <button onClick={postUpdate} className={style.button_3}>Submit</button>
            </div>
        </Layout>: <Navigate to='/infor'></Navigate>
        )
    )
}
