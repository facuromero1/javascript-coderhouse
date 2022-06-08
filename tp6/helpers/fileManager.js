const fs = require("fs")
const path = process.cwd()

class Container {
    constructor() {
        this.messagesFile = path + "/helpers/messages.json"
        
    }
async saveFile(newArr, filePath) {
        await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
    }

    async saveMessage(message) {
        let arr = await this.getAllItems(this.messagesFile);
        if (arr.length > 0) message.id = arr[arr.length - 1].id + 1;
        else message.id = 1;
        arr.push(message);
        await this.saveFile(arr, this.messagesFile);
        return message.id;
    }

    async saveNewItem (item) {
        let info
        try{
            info = await fs.promises.readFile(`${this.messagesFile}`)
            info = JSON.parse(info)
        }
        catch(e){
            info = []
        }
        const lastItem = info[info.length - 1]
        let id = 1
        if (lastItem) {
             id = lastItem.id + 1
        }
        item.id = id
        info.push(item)
        return fs.promises.writeFile(`${this.messagesFile}`,JSON.stringify(info, null, 2))
    }

    async getById(id) {
        let info
        try{
            info = await fs.promises.readFile(`${this.messagesFile}`)
            info = JSON.parse(info)
        }
        catch(err){
            console.error("item not found")
        }
        return info.find(item => item.id === id)
    }

    async getAllItems(){
        let info
        try{
            const file = await fs.promises.readFile(`${this.messagesFile}`)
            if(!file) info = []
            else info = JSON.parse(file)
        }catch(err){
            info = []
        }
        return info
    }

    async deleteById(id) {
        let info
        try{
            info = await fs.promises.readFile(`${this.messagesFile}`)
            info = JSON.parse(info)
        }
        catch(err){
            info = []
        }
        
        const findProductId = info.findIndex(item => item.id === id)
        
        if (findProductId === -1){
            return console.error('error 404')
        }
        
        info.splice(findProductId, 1)
        return fs.promises.writeFile(`${this.messagesFile}`, JSON.stringify(info, null, 2))
        }

    async deleteAll(){
        return fs.promises.writeFile(`${this.name}`, " ")

    }

    async getRandom(){
        let info
        let randomIndex
        let randomItem
        
        try {
            
            info = await fs.promises.readFile(`${this.messagesFile}`)
            info = JSON.parse(info)
            randomItem = info[Math.floor(Math.random()*info.length)];
            
        
            
        } catch (err) {
            console.error("empty list")
        }
        return randomItem;
    }
 
}

module.exports = Container;

