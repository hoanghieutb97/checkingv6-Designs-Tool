export const validateExcelData = (data) => {
    const errors = [];
    const warnings = [];

    data.forEach((row, index) => {
        // Kiểm tra các trường bắt buộc
        if (!row.orderId) {
            errors.push(`Dòng ${index + 1}: Thiếu OrderID`);
        }
        if (!row.sku) {
            errors.push(`Dòng ${index + 1}: Thiếu SKU`);
        }
        if (!row.Quantity || row.Quantity <= 0) {
            errors.push(`Dòng ${index + 1}: Số lượng không hợp lệ`);
        }

        // Kiểm tra định dạng
        if (row.sku && !/^[A-Za-z0-9-]+$/.test(row.sku)) {
            warnings.push(`Dòng ${index + 1}: SKU có ký tự đặc biệt`);
        }

        // Kiểm tra ngày tháng
        if (row.dateItem && !isValidDate(row.dateItem)) {
            warnings.push(`Dòng ${index + 1}: Ngày không hợp lệ`);
        }
    });

    return { errors, warnings };
};

const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
}; 