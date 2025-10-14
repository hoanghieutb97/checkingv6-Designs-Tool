import _ from "lodash";
import sortSheet from './sortSheet';

export default function mapSheetGllm({ sheet, gllm, product }) {

    
    console.log(gllm);
    gllm = gllm.map(item => ({
        ...item,
        nameId: item.nameId,
        hight: Number(item.hight),
        width: Number(item.width),
        box: item.box.split(",").map(item => Number(item)),
        direction: item.direction,
        ProductType: item.ProductType.split(",").filter(param2 => param2 !== "").map(param => param.toLowerCase().trim().replace(/ /g, '')),
        variant: item.variant.split(",").filter(param2 => param2 !== "").map(param => param.toLowerCase().trim().replace(/ /g, '')),
        button: item.button ? item.button : "normal",
        amountFile: (item.amountFile !== "1" && item.amountFile !== "2") ? "1" : item.amountFile
    }))


    sheet = sheet.map(item => ({
        ...item,
        // product: item.product.toLowerCase().trim().replace(/ /g, ''),
        // variant: item.variant.toLowerCase().trim().replace(/ /g, '')

    })).map(itemSheet => {
        let arr = gllm
            .filter(itemGllm => _.intersection(itemGllm.ProductType, [itemSheet.product.toLowerCase().trim().replace(/ /g, '')]).length !== 0)
            .filter(itemx => _.intersection(itemx.variant, [itemSheet.variant.toLowerCase().trim().replace(/ /g, '')]).length !== 0)
        if (arr.length == 0) return ({ ...itemSheet, addGllm: false })
        else return ({
            ...itemSheet,
            addGllm: true,
            nameId: arr[0].nameId,
            box: arr[0].box,
            button: arr[0].button,
            direction: arr[0].direction,
            width: arr[0].width,
            hight: arr[0].hight,
            amountFile: arr[0].amountFile
        })
    })


    // sheet = sortSheet(sheet, product);

    return sheet
}   