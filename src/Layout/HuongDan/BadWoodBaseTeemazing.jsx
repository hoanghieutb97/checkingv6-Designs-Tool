import React from 'react';

function BadWoodBaseTeemazing(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: chỉ dành cho sản phẩm này </p>
                <p className="noidung-til ">Chất liệu: - mica 5mm</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt: 14 x20.5 cm - co 2 chiều </p>
                <p className="noidung-til ">kéo dãn mica 1.5 cm x 1.5 cm không kéo file in.</p>
                <p className="noidung-til ">tool tự thêm đường cắt đỏ</p>
                <img className='img-ct' src={"/3d woodBase Teemazing.jpg"} alt="" />
            </p>
        </>
    );
}

export default BadWoodBaseTeemazing;