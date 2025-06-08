import React from 'react';
import { useStore, actions } from '../store';
import AcrylicBlock from './HuongDan/AcrylicBlock';
import AcrylicDeskPlaque4mm from './HuongDan/AcrylicDeskPlaque4mm';
import AcrylicPlaque from './HuongDan/AcrylicPlaque';
import Badwoodbase from './HuongDan/Badwoodbase';
import BadWoodBaseTeemazing from './HuongDan/BadWoodBaseTeemazing';
import Bamboowireless from './HuongDan/Bamboowireless';
import CandleHolder from './HuongDan/CandleHolder';
import Dock from './HuongDan/Dock';
import KeychainAluminium from './HuongDan/KeychainAluminium';
import KeychaiNormal from './HuongDan/KeychaiNormal';
import OrnamentquaTa from './HuongDan/OrnamentquaTa';
import PCled from './HuongDan/PCled';
import PCsilicon from './HuongDan/PCsilicon';
import Printmetal from './HuongDan/Printmetal';
import AcrylicPlaqueTMZ from './HuongDan/AcrylicPlaqueTMZ';
import CustomShapeAcrylicBlocks from './HuongDan/CustomShapeAcrylicBlocks';
import NEWtransparentORM2M from './HuongDan/NEWtransparentORM2M';
import FatherDayZirror from './HuongDan/FatherDayZirror';
import Hailayerwooden from './HuongDan/Hailayerwooden';
import Balayerwooden from './HuongDan/Balayerwooden';


function HuongDan(props) {
    const [state, dispatch] = useStore();
    const activeProduct = state.activeProduct.product

    let noidung = "";
    switch (activeProduct) {
        case "3d wood base":
            noidung = <Badwoodbase />
            break;
        case "3d woodBase Teemazing":
            noidung = <BadWoodBaseTeemazing />
            break;
        case "Acrylic Plaque":
            noidung = <AcrylicPlaque />
            break;
        case "bamboowireless":
            noidung = <Bamboowireless />
            break;
        case "candle holder":
            noidung = <CandleHolder />
            break;
        case "dock":
            noidung = <Dock />
            break;
        case "keyChain Alunium":
            noidung = <KeychainAluminium />
            break;
            break;
        case "keyChain normal":
            noidung = <KeychaiNormal />
            break;
        case "ornament qua ta nhom":
            noidung = <OrnamentquaTa />
            break;
            break;
        case "PC silicon":
            noidung = <PCsilicon />
            break;
        case "PC led":
            noidung = <PCled />
            break;
        case "print metal":
            noidung = <Printmetal />
            break;
        case "Acrylic Desk Plaque":
            noidung = <AcrylicDeskPlaque4mm />
            break;
        case "Acrylic Block":
            noidung = <AcrylicBlock />
            break;
        case "Acrylic Plaque TMZ":
            noidung = <AcrylicPlaqueTMZ />
            break;
        case "Custom Shape Acrylic Blocks":
            noidung = <CustomShapeAcrylicBlocks />
            break;
        case "NEW transparent ORM 2M":
            noidung = <NEWtransparentORM2M />
            break;
        case "FatherDayZirror":
            noidung = <FatherDayZirror />
            break;

        case "2layer wood ornament":
            noidung = <Hailayerwooden />
            break;
        case "3layer wood ornament":
            noidung = <Balayerwooden />
            break;
        default:
            noidung = ""
            break;
    }
    return (
        <div className='p-2'>
            <p className="loai-tool">{activeProduct}</p>
            {noidung}
        </div>
    );
}

export default HuongDan;