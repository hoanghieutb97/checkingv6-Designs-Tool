import { List } from "antd";
import _ from "lodash";

export default function checkActiveProduct(sheet, products = []) {
    if (!sheet || !Array.isArray(sheet)) {
        console.warn('Sheet is not valid:', sheet);
        return null;
    }

    let activeProduct = _.uniq(sheet.map(item => item.button));

    activeProduct = activeProduct.map(item => {
        if (!item) return null;

        let item2;
        for (let i = 0; i < products.length; i++) {
            if (products[i] && products[i].name === item) {
                item2 = {
                    list: products[i].type || 'Other',
                    product: products[i].name
                }
                return item2;
            }
        }
        return null;
    }).filter(Boolean); // Remove null values
    
    return activeProduct[0] || null;
}