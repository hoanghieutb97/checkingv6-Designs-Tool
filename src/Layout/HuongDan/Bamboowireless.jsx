import React from 'react';

function Bamboowireless(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: </p>
                <p className="noidung-til ">Chất liệu: Phôi có sẵn</p>
                <p className="noidung-til ">Kích thước: 3 loại tròn, vuông, bát giác</p>
                <p className="noidung-til ">làm tay file in và khung, để ý xóa viền</p>
                <img className='img-ct' src={"/bambowiless.jpg"} alt="" />
            </p>
        </>
    );
}

export default Bamboowireless;