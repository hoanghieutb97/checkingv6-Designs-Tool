import React from 'react';

function Dock(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: tool chỉ chạy 1 file</p>
                <p className="noidung-til ">Chất liệu: - dock cũ</p>
                <p className="noidung-til ">Thiết kế  phải đúng vị trí dock</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt: có sẵn- co 2 chiều.</p>
                <p className="noidung-til ">link khung: <span className="ggg">G:\back up in\ps script data\dock\dock</span></p>
                <img className='img-ct' src={"/dock.jpg"} alt="" />
                <img className='img-ct2' src={"/dock2.jpg"} alt="" />
                
            </p>
        </>
    );
}

export default Dock;