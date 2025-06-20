const _ = require('lodash');

class SortSheetService {
  static async sortSheet(sheet, product) {
    if (!product || !product.sortConfig) {
      return this.defaultSort(sheet);
    }

    const { primary, secondary, tertiary } = product.sortConfig;

    // Special cases
    if (product.name === "Acrylic Plaque") {
      return this.sortAcrylicPlaque(sheet);
    }

    // General sorting
    return _.orderBy(
      sheet,
      [primary, secondary, tertiary],
      ['asc', 'asc', 'asc']
    ).map((item, key) => ({ ...item, stt: key + 1 }));
  }

  static defaultSort(sheet) {
    return _.orderBy(
      sheet,
      ['orderId', 'variant', 'sku'],
      ['asc', 'asc', 'asc']
    ).map((item, key) => ({ ...item, stt: key + 1 }));
  }

  static sortAcrylicPlaque(sheet) {
    let arr5 = _.chunk(
      sheet.filter(item => (
        item.nameId === "A.Plaque6x8in" ||
        item.nameId === "DZT-Plaque6x8" ||
        item.nameId === "wood-Plaque6x8in" ||
        item.nameId === "2M-Plaque6x8inTMZ"
      )),
      5
    );

    let arr1 = sheet.filter(item => (
      item.nameId === "A.Plaque4x6in" ||
      item.nameId === "DZT-Plaque4x6" ||
      item.nameId === "wood-Plaque4x6in"
    ));

    if (arr5.length > arr1.length) {
      for (let i = 0; i < arr5.length; i++) {
        if (arr1[i] !== undefined) {
          arr5[i] = [...arr5[i], arr1[i]];
        }
      }
      return _.flattenDeep(arr5);
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr5[i] !== undefined) {
          arr1[i] = [...arr5[i], arr1[i]];
        }
      }
      return _.flattenDeep(arr1);
    }
  }
}

module.exports = SortSheetService; 