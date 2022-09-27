const mongoose = require("mongoose");
const products = require("../data/productsCopy");
const dotenv = require("dotenv");
dotenv.config({ path: "BackEnd/config/config.env" });
const DatabaseConnection = require("../database");

const Product = require("../models/product");
DatabaseConnection();

const addProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted successfully");
    await Product.insertMany(products);
    console.log("Products inserted successfully");
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};
addProduct();
