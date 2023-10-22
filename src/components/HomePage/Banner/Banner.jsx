import React from 'react'
import style from './banner.module.css'
export default function Banner() {
  return (
    <div  className={style.banner}>
        <div className={style.banner_img}>
            <div>
                <h1>XIN CHÀO SINH VIÊN TRƯỜNG ĐẠI HỌC ĐÔNG Á</h1>
                <h2>"Đầu tư kiến thức phát triển năng lực bản thân, chuyên môn nghề nghiệp, để tạo dựng con đường thành công và đóng góp vào sự phát triển bền vững cộng đồng xã hội."</h2>
                <h3>HIỆU TRƯỞNG TS. NGUYỄN THỊ ANH ĐÀO</h3>
            </div>
        </div>
    </div>
  )
}
