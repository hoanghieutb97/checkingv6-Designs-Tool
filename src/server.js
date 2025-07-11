const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const port = 5000;
// Load env vars


// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

const PORT = port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 