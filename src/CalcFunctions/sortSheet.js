import _ from "lodash";
import dupItems from "../CalcFunctions/dupItems"
export default function sortSheet(sheet, product) {




    if (product === "Acrylic Plaque") {
        let arr5 = _.chunk(sheet.filter(item => (item.nameId === "A.Plaque6x8in"
            || item.nameId === "DZT-Plaque6x8"
            || item.nameId === "wood-Plaque6x8in"
            || item.nameId === "2M-Plaque6x8inTMZ")), 5);

        let arr1 = sheet.filter(item => (item.nameId === "A.Plaque4x6in"
            || item.nameId === "DZT-Plaque4x6"
            || item.nameId === "wood-Plaque4x6in"));
        if (arr5.length > arr1.length) {
            for (let i = 0; i < arr5.length; i++) {
                if (arr1[i] !== undefined) arr5[i] = [...arr5[i], arr1[i]]

            }
         
            return _.flattenDeep(arr5)
        }
        else {
            for (let i = 0; i < arr1.length; i++) {
                if (arr5[i] !== undefined) arr1[i] = [...arr5[i], arr1[i]]

            }

            return _.flattenDeep(arr1)
        }

    }
    else if (product === "Ceramic Flower Vase cn") {

        sheet = _.orderBy(sheet, ['country', 'orderId', 'sku'], ['asc', 'asc', 'asc']).map((item, key) => ({ ...item, stt: key + 1 }));


    }
    else

        if (product === "PC glass" ||
            product === "PC luminous" ||
            product === "PC led" ||
            product === "print metal" ||
            product === "thot 5mm" ||
            product === "cut metal" ||
            product === "3d wood base" ||
            product === "thot den" ||
            product === "thot amazone" ||
            product === "PC silicon" ||
            product === "FatherDayZirror" ||
            product === "Photo Magnet" ||
            product === "Wooden Parterre" ||
            product === "photo frame lamp" ||
            product === "Custom Acrylic Name Night Light pine" ||
            product === "dia nhua" ||
            product === "Led Light Wood Base TMZ" ||
            product === "Wooden Picture Frame Magnet" ||
            product === "Photo Magnet 2 3 layer" ||
            product === "Custom 2 Layered Acrylic Keychain" ||
            product === "Custom 2 Layered Art Piece" ||


            product === "mica DZT Style") {
         
            sheet = _.orderBy(sheet, ['variant', 'orderId', 'sku'], ['asc', 'asc', 'asc']).map((item, key) => ({ ...item, stt: key + 1 }));


        }
        else if (product === "Suncatcher Art Piece" ||
            product === "suncatcher" ||
            product === "1 Layer Suncatcher Ornament" ||
            product === "ornament mica 1M-Singer" ||
            product === "ornament mica 2M-Singer" ||
            product === "ornament go 1M-Singer" ||
            product === "2layer wood ornament" ||
            product === "2 layer mix" ||
            product === "3L Shaker Ornament" ||
            product === "5L Shaker Ornament" ||
            product === "Christmas Tree Topper" ||
            product === "1M Photo Building Block" ||
            product === "2M Photo Building Block" ||

            product === "ornament go 2M-Singer" ||
            product === "NEW transparent ORM 1M" ||
            product === "NEW transparent ORM 1M no white" ||

            product === "NEW transparent ORM 1M Wooden" ||
            product === "Stained Glass Suncatcher" ||
            product === "Desk Name Plate Night Light" ||
            product === "Custom Shape Acrylic Block TMZ" ||
            product === "A Custom Shape Keychain With Charm" ||
            product === "Custom Shape Photo Light Box" ||
            product === "Magnetic Car Visor Photo Clip" ||
            product === "3 Layered Shaker Fridge Magnet" ||

            product === "NEW transparent ORM 2M" ||
            product === "Stained Glass Suncatcher" ||
            product === "Stained Glass Ornament type 2" ||
            product === "Stained Glass Ornament" ||
            product === "Custom Shape Fridge Magnet" ||
            product === "tranh trang guong" ||
            product === "Stained Glass Suncatcher - Type 2"


        ) {
            sheet = _.orderBy(sheet, ['width', 'orderId', 'sku'], ['asc', 'asc', 'asc']).map((item, key) => ({ ...item, stt: key + 1 }));
        }

        else if (
            product === "Leather Keychain" ||
            product === "2M Leather Keychain") {
            sheet = _.orderBy(sheet, ['nameId', 'orderId', 'sku'], ['asc', 'asc', 'asc']).map((item, key) => ({ ...item, stt: key + 1 }));
        }
        else {


            sheet = _.orderBy(sheet, ['orderId', 'variant', 'sku'], ['asc', 'asc', 'asc']);


            sheet = sheet.map((item, key) => ({ ...item, stt: key + 1 }));
        }

    return sheet
} 