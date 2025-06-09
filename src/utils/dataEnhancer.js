export const enhanceData = (data) => {
    return data.map(row => ({
        ...row,
        sku: formatSKU(row.sku),
        estimatedDeliveryDate: calculateDeliveryDate(row.dateItem),
        priority: calculatePriority(row),
        suggestedFactory: suggestFactory(row),
        isDuplicate: checkDuplicate(row, data)
    }));
};

const formatSKU = (sku) => {
    if (!sku) return null;
    return sku.toString().toUpperCase().trim();
};

const calculateDeliveryDate = (orderDate) => {
    if (!orderDate) return null;
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7); // Giả sử thời gian giao hàng là 7 ngày
    return date;
};

const calculatePriority = (row) => {
    if (row.Priority) return row.Priority;
    // Logic tính toán ưu tiên dựa trên các yếu tố khác
    return 'NORMAL';
};

const suggestFactory = (row) => {
    // Logic đề xuất nhà máy dựa trên sản phẩm và số lượng
    return 'FACTORY_1';
};

const checkDuplicate = (row, allData) => {
    return allData.filter(item => 
        item.sku === row.sku && 
        item.orderId !== row.orderId
    ).length > 0;
}; 