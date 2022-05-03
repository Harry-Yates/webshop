const express = require("express");
const products = require("./data/products");

const app = express();
// Initialise express with the variable "app"

//Shows Server is running
app.get("/", (req, res) => {
    res.send("API is running...");
});

//API Route gets all prducts
app.get("/api/products", (req, res) => {
    res.json(products);
});

//API Route gets product by it's id
app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
    //
});

app.listen(5050, console.log("Server running on port 5050"));
