require("dotenv").config();
const express = require('express');
const connectDB =require('./config/DB');
const errorHandler = require('./middlewares/error');
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
process.on("unhandledRejection", (err,promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
})
