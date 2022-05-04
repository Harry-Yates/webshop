const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");

dotenv.config();
//This enables environment variables.

const app = express();

// Initialise express with the variable "app"

//Shows Server is running
app.get("/", (req, res) => {
    res.send("API is running....");
});

//API Route gets all prducts
app.get("/api/products", (req, res) => {
    res.json(products);
});

//API Route gets product by it's id
app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
});

const PORT = process.env.PORT || 5050;
//Acessing environment variables from dotenv

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
