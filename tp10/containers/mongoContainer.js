class MongoContainer {
    constructor(model){
        this.model = model;
    }

    getItems = async () => {
        let arr = [];
        try {
            arr = await this.model.find({});
        }
        catch (err) {
            console.log(err)
        }
        return arr;
    };

    getItemById = async (id) => {
        let product = {};
        try {
            product = this.model.findById(id)
        }
        catch (err) {
            console.log(err)
        }
        return product;
    };

    createItem = async (item) => {
        let newItem = this.model(item);
        try{
            await newItem.save();
        }
        catch (err) {
            console.log(err);
        }
    };
    
    updateItem = async (id,newItem) => {
        let product = this.model.getItemById(id);
        try {
            Object.assign(product,newItem)
            await product.save();
        }
        catch (err) {
            console.log(err);
       }
    };

    deleteItem = async (id) => {
        try{
            await this.model.deleteOne({_id: id});
        }
        catch (err) {
            console.log(err)
        }
    };
}

module.exports = MongoContainer;