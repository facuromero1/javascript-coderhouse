const fs = require('fs');


class Storage {
    constructor(){
    this.productFileName = './products.json'
    this.cartsFileName = './carts.json'
    }

    async saveFile(newArr, filePath) {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(newArr,null,2))
        }
        catch (err) {
            throw new Error(err)
        }
    };
    
    async getFile(filename) {
        let arr
        try{
            const file = await fs.promises.readFile(filename, "utf-8")
            if (!file) arr = []
            else arr = JSON.parse(file)
            } 
            catch (err) {
                throw Error(err);
            }
            return arr
    };

    async getProducts() {
        return await this.getFile(this.productFileName)
    }
    
    
    
    
    async getProductById(id) {
       let arr = await [this.getProducts]
       let product = arr.find((item) => item.id === Number(id));
       return product;
       
    }
    
    async createProduct(product){
       const arr = await this.getFile(this.productFileName)
       const lastId = arr.length > 0 ? productArr[productArr.length - 1].id : 0;
       product.id = lastId + 1
       product.created_at = Date.now();
       arr.push(product)
       this.saveFile(arr,this.productFileName)
       return product;
    };
    
    updateProduct = async (id, newProduct) => {
        const productArr = await this.getFile(this.productsFilename);
        const newArr = productArr.map((product) => {
            if (Number(id) !== product.id) return product;
            else {
                newProduct.id = product.id;
                newProduct.created_at = product.created_at;
                return newProduct;
            }
        });
        this.saveFile(newArr, this.productsFilename);
        return;
    };
    
    deleteProduct = async (id) => {
        let arr = this.getFile(this.productFileName)
        let productDeleted = arr.filter((productDeleted) => productDeleted.id === id)
    
        this.saveFile(arr,this.productFileName)
        return arr;
    
    };
    
    
    createCart = async () => {
        const cartArr = this.getFile(this.cartsFileName);
        const newCart = {};
        const lastId = arr.length > 0 ? productArr[productArr.length - 1].id : 0;
        newCart.id = lastId + 1;
        newCart.products = [];
        cartArr.push(newCart);
        await this.saveFile(cartArr,this.cartsFileName)
        return newCart.id
    };
    
    updateCart = async (id, newCart) => {
        const cartArr = await this.getFile(this.cartsFilename);
        const newArr = cartArr.map((cart) => {
            if (Number(id) !== cart.id) return cart;
            else {
                newCart.id = cart.id;
                newCart.created_at = cart.created_at;
                return newCart;
            }
        });
        this.saveFile(newArr, this.cartsFilename);
        return;
    };
    
    deleteCart = async(id) => {
        const cartArr = await this.getFile(this.cartsFilename);
        const newCartArr = cartArr.filter((cart) => cart.id === (id));
        this.saveFile(newCartArr, this.cartsFileName)
        return cartArr;
    };
    
    getCartById = async (id) => {
        const cartArr = await this.getFile(this.cartsFileName);
        return cartArr.find((cart) => cart.id === id);
    };
    
    getCartProducts = async (id) => {
        const cart = await this.getCartById(id);
       
    };
    
    deleteCartProducts = async (id,prodId) => {
        const cart = await this.getCartById(id);
        const newProductArr = cart.products.filter((product) => product.id === prodId)
        cart.products = [...newProductArr];
            await this.updateCart(id, cart);
            return;
    };
    
    addCartProduct = async (id, prodId) => {
        const cart = await this.getCartById(Number(id));
        const prod = await this.getProductById(Number(prodId));
        console.log(prod);
        cart.products.push(prod);
        await this.updateCart(id, cart);
        return;
    };

};



module.exports = Storage