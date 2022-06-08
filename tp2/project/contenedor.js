const fs = require("fs")


class Container {
    constructor() {
        this.file = "./helpers/products.json"
        
    }

    async saveNewItem (item) {
        let info = await this.getAllItems(this.file)
        if (info.length > 0) item.id = info[info.length -1]. id + 1;
        else item.id = 1;
        info.push(item)
        await fs.promises.writeFile(this.file, JSON.stringify(info, null, 2));
        return item.id
    }

    async getById(id) {
        let info;
        try{
            info = await this.getAllItems(this.file) 
        }
        catch(err){
            console.error(err)
        }
        return info.find(item => item.id === id)       
    }

    
    
    async getAllItems(){
        let info;
        try{
            const file = await fs.promises.readFile(this.file)
            if (!file){
                info = [];
        }
            else  info = [JSON.parse(info)]
        }
        catch(err){
            console.log(err)
        }
        return info;
    }

    
    async deleteById(id) {
        let info
        try{
            info = await this.getAllItems();
            const producFound = info.filter((item) => item.id !== id);
            info.splice(producFound, 1)
            await fs.promises.writeFile(this.file, JSON.stringify(info, null, 2));}
            
            catch(err){
            console.log(err)
        }
        return info
    }

    async deleteAll(){
        const info = [];
        await fs.promises.writeFile(this).file, JSON.stringify(info,null,2);
}

    async getRandom(){
        let info
        let randomItem
        
        try {
            
            info = await fs.promises.readFile(`${this.file}`)
            info = JSON.parse(info)
            randomItem = info[Math.floor(Math.random()*info.length)];
            
        
            
        } catch (err) {
            console.error("empty list")
        }
        return randomItem;
    }
 
}

module.exports = Container;

