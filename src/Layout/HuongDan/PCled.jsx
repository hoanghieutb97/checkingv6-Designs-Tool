import React from 'react';

function PCled(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">2</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: "SKU.png"  và "SKUflash.png"</p>
                <p className="noidung-til ">Chất liệu: phôi ốp Led( loại phôi riêng) </p>
                <p className="noidung-til ">File flash, chỗ nào cần sáng phải tách nền chỗ đó</p>
                <p className="noidung-til ">in 3 file, trắng set máy in là 100%</p>
                <p className="noidung-til ">chạy tool xong có thể gửi sang in luôn ko cần sửa</p>
                {/* <img className='img-ct' src={"/3dwoodbase.jpg"} alt="" /> */}
            </p>
        </>
    );
}

export default PCled;