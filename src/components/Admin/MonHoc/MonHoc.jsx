import React, {useContext } from 'react'
import Layout from '../../Layouts/Layout'
import { AuthContext } from '../../../context/AuthProvider'
import { Navigate} from 'react-router-dom'
import style from './monhoc.module.css'
export default function MonHoc() {
    const admin = useContext(AuthContext).admin;
    const loadAdmin = useContext(AuthContext).loadAdmin;
    const [monHoc, setMonHoc] = React.useState([])
    React.useEffect(() => {
        fetch('https://back-end-iot.onrender.com/monhoc')
            .then((response) => response.json())
            .then((data) => {
                setMonHoc(data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);

    return (
        loadAdmin &&(
            admin?
        <Layout>
            <main className={style.monhoc_show}>
                <div className={style.monhoc_container}>
                    <div className={style.monhoc_title}>
                        <h1>Trang Quản Lí Môn Học</h1>
                    </div>
                    <div className={style.monhoc_table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên Môn</th>
                                    <th>Giáo Viên</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    monHoc.map((e) => (
                                        <tr key={e._id}>
                                            <td >{e.tenmon}</td>
                                            <td>{e.giaovien}</td>
                                        </tr>
                                    ))
                                }
                                {/* <tr>
                                    <td>Lập trình giao diện Web</td>
                                    <td>Thầy ....</td>
                                </tr>
                                <tr>
                                    <td>Lớp học thầy Huấn</td>
                                    <td>Thầy ....</td>
                                </tr>
                                <tr>
                                    <td>Lớp sống đẹp, sống sạch</td>
                                    <td>Cô ....</td>
                                </tr> */}
                            </tbody>
                        </table>

                    </div>
                </div>
            </main>
        </Layout>: <Navigate to='/infor'></Navigate>
    )
    )
}
