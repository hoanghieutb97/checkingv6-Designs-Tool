import React from 'react';

function AcrylicPlaque(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: </p>
                <p className="noidung-til ">Chất liệu: - mica 3mm</p>
                <p className="noidung-til ">2 loại sản phẩm: chân đá - chân mica 1m</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt: 4x6in, 6x8in, co 2 chiều </p>

                <img className='img-ct' src={"/3d woodBase Teemazing.jpg"} alt="" />
            </p>
        </>
    );
}

export default AcrylicPlaque;