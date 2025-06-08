import React from 'react';

function CandleHolder(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: phôi trái tim và không trái tim</p>
                <p className="noidung-til ">Chất liệu: Phôi có sẵn</p>
                <p className="noidung-til ">Kích thước: loại 2 chân nến-co 0 chiều </p>
                <p className="noidung-til ">để ý chân nến nhiều cỡ</p>
                <img className='img-ct' src={"/candlehold.jpg"} alt="" />
            </p>
        </>
    );
}

export default CandleHolder;