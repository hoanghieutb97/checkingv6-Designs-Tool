import { List } from "antd";
import _ from "lodash";
import { PRODUCTS } from '../constants';

export default function checkActiveProduct(sheet) {
    let activeProduct = _.uniq(sheet.map(item => item.button));

    

    activeProduct = activeProduct.map(item => {

        let item2;
        for (let i = 0; i < PRODUCTS.length; i++) {
            for (let j = 0; j < PRODUCTS[i][1].length; j++) {
                if (_.intersection([item], PRODUCTS[i][1][j]).length == 1) {
                    item2 = {
                        list: PRODUCTS[i][0],
                        product: PRODUCTS[i][1][j][0]
                    }
                    return item2
                }
            }
        }

        
    })
    
    return activeProduct[0]
}