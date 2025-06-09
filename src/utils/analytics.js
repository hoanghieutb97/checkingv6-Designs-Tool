export const logExcelProcessing = (data, file, startTime, errors, warnings) => {
    const analytics = {
        totalRows: data.length,
        processingTime: Date.now() - startTime,
        errorCount: errors.length,
        warningCount: warnings.length,
        fileSize: file.size,
        fileType: file.type,
        timestamp: new Date().toISOString()
    };

    console.log('Analytics:', analytics);
    // Gửi analytics đến server
    // sendAnalytics(analytics);
}; 