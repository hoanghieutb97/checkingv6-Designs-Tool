import React from 'react';
import CheckSKU from './CheckSKU';
import Excel from './Excel';
import HuongDan from './HuongDan';
import ListItems from './ListItems';
import Products from './Products';
import ServerStatus from './ServerStatus';
import PasswordProtected from '../Components/PasswordProtected';

function Body(props) {
    return (
        <>
            <div className='d-grid'>
                <div className=" grid-tag grid-excel">
                    <div className="title-col">
                        Excel
                    </div>
                    <Excel />
                </div>
                <div className=" grid-tag">
                    <div className="title-col">
                        Chọn sản phẩm
                    </div>
                    <Products />
                </div>
                <div className=" grid-tag">
                    <div className="title-col">
                        Kiểm tra design
                    </div>
                    <CheckSKU />
                </div>
                <div className=" grid-tag">
                    <div className="title-col">

                        Trạng thái server
                    </div>
                    {/* <HuongDan /> */}
                    <PasswordProtected>
                        <ServerStatus />
                    </PasswordProtected>
                </div>
            </div>
            <div className="container-80">

                <ListItems />

            </div>
        </>
    );
}

export default Body;