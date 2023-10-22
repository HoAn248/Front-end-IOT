import React, { useEffect, useRef, useState } from 'react'
import style from './signup.module.css'
import { Link } from 'react-router-dom'
// import * as faceapi from 'face-api.js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
  const videoRef = useRef()
  const canvasRef = useRef()
  const navigate = useNavigate()
  const [img, setImg] = useState('')

  const formik = useFormik({
    initialValues: {
      idsv: "",
      tensv: "",
      ngaysinh: "",
      lop: "",
      matkhau: "",
      nhaplaimatkhau: "",
    },
    validationSchema: Yup.object({
      idsv: Yup.string().required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true).length(5, "ID có 5 kí tự"),
      tensv: Yup.string().required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true).min(4, "Độ dài tối thiểu là 4").max(20, "Độ dài tối đa là 20"),
      matkhau: Yup.string()
        .required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true)
        .min(6, "Độ dài tối thiểu là 6").max(12, "Độ dài tối đa là 12"),
      nhaplaimatkhau: Yup.string().required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true).oneOf([Yup.ref("matkhau"), null], "Mật khẩu nhập lại không đúng"),
      ngaysinh: Yup.date().required("Bắt buộc phải nhập"),
      lop: Yup.string().required("Bắt buộc phải nhập").trim('Không dược bắt đầu bằng kí tự trống')
        .strict(true).length(7, "Tên lớp không quá 7 kí tự"),
    }),
    onSubmit: () => {
      if (img !== '') {
        fetch('https://back-end-iot.onrender.com/sinhvien', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ten: formik.values.tensv,
            idsv: formik.values.idsv,
            ngaysinh: formik.values.ngaysinh,
            matkhau: formik.values.matkhau,
            lop: formik.values.lop,
            img: img
          }),
        })
          .then((res) => {
            if (res.status === 200){
              alert('Tạo thành công')
              navigate("/")

            }else if (res.status === 401){
              alert('Tạo không thành công, có thể ID đã bị trùng, liên hệ với admin để sửa')
            }
          })
          .catch((e) => {
            // console.log(e);
          })
      } else {
        alert("Bạn chưa chụp hình")
      }
    }
  })


  // LOAD FROM USEEFFECT
  useEffect(() => {
    startVideo()

  }, [])

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function capture(e) {
    const videoElement = videoRef.current;
    const canvas = document.createElement('canvas'); // Tạo một canvas tạm thời
    const context = canvas.getContext('2d');

    // Đặt kích thước cho canvas (có thể làm cho nó nhỏ hơn để giảm chất lượng)
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Vẽ hình ảnh từ video lên canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Chuyển canvas thành ảnh dưới dạng image/jpeg với chất lượng mong muốn
    canvas.toBlob((blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      img.onload = () => {
        const canvasForJPEG = document.createElement('canvas');
        canvasForJPEG.width = img.width;
        canvasForJPEG.height = img.height;
        const ctx = canvasForJPEG.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Chuyển canvasForJPEG thành ảnh dưới dạng image/jpeg với chất lượng được điều chỉnh (ở đây là 0.7)
        const jpegDataURL = canvasForJPEG.toDataURL('image/jpeg', 0.3);

        // Đặt ảnh với chất lượng đã điều chỉnh vào trạng thái React
        setImg(jpegDataURL);
        alert("Chụp ảnh thành công")
      };
    }, 'image/jpeg');

  }

  return (
    <div className={style.login_page} >
      <div className={style.form}>
        <div className={style.login_form}>
          <input id='tensv' onChange={formik.handleChange} value={formik.values.tensv} type="text" placeholder="tên" />
          {formik.errors.tensv && (<p>{formik.errors.tensv}</p>)}
          <input id='lop' onChange={formik.handleChange} value={formik.values.lop} type="text" placeholder="lớp" />
          {formik.errors.lop && (<p>{formik.errors.lop}</p>)}
          <input id='idsv' onChange={formik.handleChange} value={formik.values.idsv} type="text" placeholder="id" />
          {formik.errors.idsv && (<p>{formik.errors.idsv}</p>)}
          <input id='matkhau' onChange={formik.handleChange} value={formik.values.matkhau} type="password" placeholder="mật khẩu" />
          {formik.errors.matkhau && (<p>{formik.errors.matkhau}</p>)}
          <input id='nhaplaimatkhau' onChange={formik.handleChange} value={formik.values.nhaplaimatkhau} type="password" placeholder="nhập lại mật khẩu" />
          {formik.errors.nhaplaimatkhau && (<p>{formik.errors.nhaplaimatkhau}</p>)}
          <input id='ngaysinh' onChange={formik.handleChange} value={formik.values.ngaysinh} type="date" placeholder="ngày sinh" />
          {formik.errors.ngaysinh && (<p>{formik.errors.ngaysinh}</p>)}
          <div className={style.login_box_camera}>
            <video width="270" height="200" crossOrigin="anonymous" autoPlay ref={videoRef}></video>
            <canvas width="270" height="200"
              className="appcanvas" ref={canvasRef} />
          </div>

          <button onClick={capture} >Chụp ảnh</button>
          <hr />
          <button type='onSubmit' onClick={formik.handleSubmit}>Đăng Ký</button>
          <p className={style.message}><a href="/" rel="noopener noreferrer">Home Page</a></p>
          <p className={style.message}>Already registered?<Link to="/signin" rel="noopener noreferrer">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

