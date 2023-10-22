// import { useNavigate } from 'react-router-dom'
import React, { useState, createContext, useEffect } from 'react';
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    // const navigate = useNavigate()
    const [auth, setAuth] = useState(localStorage.getItem('token'));
    const [login, setLogin] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [loadAdmin, setLoadAdmin] = useState(false)
    // const [user, setUser] = useState({ ten: '', idsv: '', ngaysinh: '', lop: '', diemdanh: '' })


    useEffect(() => {

        fetch('https://back-end-iot.onrender.com/sinhvien/checkadmin', {
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
                    setAdmin(true)
                } else {
                    setAdmin(false)
                }
            })
            .finally(() => {
                setLoadAdmin(true)
            })
    }, [])


    return (
        <AuthContext.Provider value={{ login, setLogin, auth, setAuth, admin, setAdmin, loadAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
