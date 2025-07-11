import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import CopyOrderId from '../Components/CopyOrderId';
import CheckTrello from "./CheckTrello"

function Navbar(props) {

    return (<>
        <div className="container-fluid h-56 pstick">
            <div className="row">
                <div className="col-12 p-0">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="navbar-brand" >CheckingV6-Design-Tool</div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
              
                                <li className="btc">
                                    <CopyOrderId />
                                    
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <>
        </>
    </>
    );
}

function ModalURLDesign(props) {
    const [Rerender, setRerender] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valueInput, setvalueInput] = useState();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    let arr = JSON.parse(localStorage.FileDesign);
    let deleteFileDesign = (item) => {
        localStorage.FileDesign = JSON.stringify(arr.filter(param => param !== item));

        setRerender(!Rerender);
        setvalueInput("");
    }
    let addFileDesign = () => {
        arr.push(valueInput.split("\\").join("/"));
        localStorage.FileDesign = JSON.stringify(arr);
        setRerender(!Rerender);
        setvalueInput("");

    }
    const handleChangeVlue = (value) => setvalueInput(value);
    let handleChangeActiveFileDesign = (item) => {
        localStorage.ActiveFileDesign = JSON.stringify(item);
        window.location.reload(true);

    }
    return (
        <>
            <div className="nav-link cp" onClick={showModal}>
                File Design
            </div>

            <Modal title="Cài đặt link design trên máy tính" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>

                <div >
                    {arr.map((item, key) => <div key={key} className="ctn-themlink">
                        <div className="b-fileDesign position-relative" onClick={() => handleChangeActiveFileDesign(item)}><span className="deleteDSF" onClick={() => deleteFileDesign(item)}>• </span>{item}</div>
                        <DeleteFilled onClick={() => deleteFileDesign(item)} />
                    </div>)}
                    {/* <Input placeholder="New Link..." className=" input-file0design mt-2" id="inputLinkDesign" onChange={(e) => handleChangeVlue(e.target.value)} value={valueInput} />
                    <div className='d-flex align-items-center justify-content-center mt-2'>
                        <Button type="primary" size="small" className='b-center' onClick={addFileDesign} >Add link design</Button>
                    </div> */}


                </div>
            </Modal>
        </>
    )
}
export default Navbar;