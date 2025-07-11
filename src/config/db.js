const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://hoanghieutb97:r8piz5uGp6OKcOGa@cluster0.elvs6.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017', {
            dbName: 'test'
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log('Continuing without database connection...');
    }
};

module.exports = connectDB; 