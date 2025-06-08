import React from 'react';

function AcrylicBlock(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">1 hoặc 2</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">Tool có thể chạy cả loại 1 mặt hoặc 2 mặt </p>
                <p className="noidung-til ">Tách 1 mặt và 2 mặt, 15mm và 20 mm chạy riêng, còn lại có thể chạy chung</p>
                <p className="noidung-til ">Chất liệu: - mica 15mm, 20 mm</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt: co 2 chiều </p>
                <p className="noidung-til ">Xóa đường đỏ file in</p>
                <img className='img-ct-bt' src={"/AcrylicBlock.jpg"} alt="" />
            </p>
        </>
    );
}

export default AcrylicBlock;