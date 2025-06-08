import React, { useEffect, useState } from 'react';

import InputExcel from '../Components/InputExcel';

import TachVariant from '../Components/TachVariant';
import TachKhach from '../Components/TachKhach';
import TachSKU from '../Components/TachSKU'
import ThongKe from './ThongKe';
function Excel(props) {


    return (<>
        <div className="tble">
            <div className='ctn-excel mt-3'>
                <InputExcel />
            </div>
            {/* <div className=" ctn-excel tach-sku mt-3">
                <div className="">
                    <p className="title-ex">Tách Khách</p>
                    <TachKhach />
                </div>
            </div> */}
            <div className=" ctn-excel tach-sku mt-3">
                <div className="">
                    <p className="title-ex">Tách bằng Variant</p>
                    <TachVariant />
                </div>
            </div>
            <div className=" ctn-excel tach-sku mt-3">
                <div className="">
                    <p className="title-ex">Tách bằng SKU</p>
                    <TachSKU />
                </div>
            </div>
            <div className=" ctn-excel tach-sku mt-3">
                <div className="">  <p className="title-ex">Thống kê</p>
                    <ThongKe />
                </div>
            </div>
        </div>
    </>
    );
}

export default Excel;