import React from 'react';

function KeychaiNormal(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">2</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: "SKU front.png"  và "SKU back.png"</p>
                <p className="noidung-til ">Chất liệu: - móc khóa gỗ,...  </p>
                <p className="noidung-til ">Cách in: in xuôi như gỗ  </p>
                <p className="noidung-til ">2 file front và back khác nhau, không có back thì dùng file front làm back</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt: tự do - co 2 chiều.</p>
                <p className="noidung-til ">cắt xong in: Mặt 1 ở dưới, mặt 2 ở bên trên</p>
                {/* <img className='img-ct' src={"/3dwoodbase.jpg"} alt="" /> */}
            </p>
        </>
    );
}

export default KeychaiNormal;