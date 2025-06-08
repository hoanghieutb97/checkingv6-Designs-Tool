import React from 'react';

function CustomShapeAcrylicBlocks(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: dành cho mọi khách</p>
                <p className="noidung-til ">Chất liệu: - mica 15mm và mica 20mm</p>
                <p className="noidung-til ">Thiết kế có file cắt ở trên, file in ở dưới đúng vị trí.</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt: tự do - co 0 chiều.</p>
                
                <img className='img-ct' src={"/3dwoodbase.jpg"} alt="" />
            </p>
        </>
    );
}

export default CustomShapeAcrylicBlocks;