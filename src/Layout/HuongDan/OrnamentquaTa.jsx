import React from 'react';

function OrnamentquaTa(props) {
    return (
        <>
            <p className="tiu-de">
                <span className="titl-tiu">số design: </span>
                <span className="noidung-til">2</span>
            </p>
            <p className="tiu-de">
                <p className="titl-tiu">quy cách: "SKU front.png"  và "SKU back.png"</p>
                <p className="noidung-til ">Chất liệu: - quả tạ nhôm của DZT </p>
                <p className="noidung-til ">2 file front và back khác nhau, không có back thì dùng file front làm back</p>
                <p className="noidung-til ">Kích thước sản phẩm cắt:không đổi, loại móc khóa nhớ thêm móc khi làm file</p>
                {/* <img className='img-ct' src={"/3dwoodbase.jpg"} alt="" /> */}
            </p>
        </>
    );
}

export default OrnamentquaTa;