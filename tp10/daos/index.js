const productsDaoFiles = require("./products/ProductsDaoFiles");
const cartDaoFiles = require("./carts/CartDaoFiles");

const productsDaoMemory = require("./products/ProductsDaoMemory");
const cartDaoMemory = require("./carts/CartDaoMemory");

const productsDaoMongoDB = require("./products/ProductsDaoMongoDB");
const cartDaoMongoDB = require("./carts/CartDaoMongoDB");

const productsDaoFirebase = require("./products/ProductsDaoFirebase");
const cartDaoFirebase = require("./carts/CartDaoFirebase");


const getStorage = () => {
    const storage = process.env.STORAGE;
    switch (storage) {
        case "archivo":
            return {
                products: new productsDaoFiles("products.json"),
                carts: new cartDaoFiles("cats.json"),
            };
        case "memoria":
            return {
                products: new productsDaoMemory(),
                carts: new cartDaoMemory(),
            };
        case "mongodb":
            return {
                products: new productsDaoMongoDB(),
                carts: new cartDaoMongoDB(),
            };
        case "firebase":
            return {
                products: new productsDaoFirebase(),
                carts: new cartDaoFirebase(),
            };
    }
};

module.exports = getStorage;