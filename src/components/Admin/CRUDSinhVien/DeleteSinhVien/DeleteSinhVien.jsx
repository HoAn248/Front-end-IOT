import React, {useContext } from 'react'
import Layout from '../../../Layouts/Layout'
import { AuthContext } from '../../../../context/AuthProvider'
import style from './deletesv.module.css'
import { useParams ,useNavigate,Navigate} from 'react-router-dom'
export default function UpdateSinhVien() {
    const id = useParams().id
    const navigate = useNavigate()
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;

    function postDelete() {
        fetch('https://back-end-iot.onrender.com/sinhvien/delete/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.status === 200) alert('Xóa thành công')
                navigate('/admin/sinhvien')
            })
    }
    return (
        loadAdmin &&(
            admin? <Layout>
            <div className={style.update_container}>
                <button onClick={postDelete} className={style.button_3}>Đồng ý</button>
            </div>
        </Layout>: <Navigate to='/infor'></Navigate>
        )
    )
}
