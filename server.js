const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const { connectDb } = require('./utils/dbConnection'); 
require('dotenv').config();

const app = express();


app.use(cors({
    origin: "https://www.tarothealerrashmiravi.com",
    credentials: true,
}));
app.use(bodyParser.json());  


connectDb()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
})
.catch((err) => {
    console.error("Failed to connect: ", err);
});

app.use('/api', bookingRoutes);