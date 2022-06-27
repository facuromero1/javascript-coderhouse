//create db ecommerce.
use ecommerce;

//create collections.
db.createCollection("messages")
db.createCollection("products")

//create products
const products = [
    {   
        product: "parlates boce",
        price: 5000,
        url: "www.parlantesimg.com"   
    },
    {
        product: "mouse gamer",
        price: 650,
        thumbnail: "www.mouseimg.com" 
    },
    {
        product: "silla escritorio",
        price: 2290,
        thumbnail: "www.sillaimg.com"  
    },
    {
        product: "adorno de buda",
        price: 460,
        thumbnail: "www.cocacola.img.com"  
    },
    {
        product: "auricolares sony",
        price:250 ,
        thumbnail: "www.auricularesimg.com"  
    },
    {
        product: "ipad samsung",
        price:3200,
        thumbnail: "www.ipadsamimg.com"  
    },
    {
        product: "teclado inalambrico",
        price:1300,
        thumbnail: "www.tecladoimg.com"  
    },
    {
        product: "pad gamer",
        price:180,
        thumbnail: "www.padimg.com"  
    },
    {
        product: "soporte monitos",
        price:600 ,
        thumbnail: "www.soporteimg.com"  
    },
    {
        product: "jostick ps4",
        price:1100 ,
        thumbnail: "www.jostickps4img.com"  
    },
]

//add manyProducts
db.products.insertMany(products)

//create messages
const messages = [
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
        {
            message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
            email: "mockemail@gmail.com",
            time: Date.now
        },
]

//insert messages
db.messages.insertMany(messages)

//list documents for collections
db.products.find()
db.messages.find()

//number of elements in the collections
db.products.countDocuments()
db.messages.countDocuments()

//insert one product
db.products.insertOne({product:"cable hdmi",price:80,url:"www.cablehdmi"})

//products price lower that 1000
db.products.find({"price": { $lt: 1000} })

//products between 1000 and 3000
db.products.find({"price": { $lt: 3000, $gt: 1000} })

//products price lower that 3000
db.products.find({"price": { $gt: 1000} })

//name of third product more cheap
db.products.find({},{"product":1, "_id":0,"price":1})

//third product more cheap
db.products.find({}, {"product":1, _id:0}).sort({"price": 1}).skip(2).limit(1)

//update all procuts with stock
db.products.updateMany({},{$set:{"stock":100}})

//update products more expensive that 4000
db.products.updateMany({"price":{$gt:4000}},{$set:{"stock":0}})

//delete all products more cheap that 1000
db.products.deleteMany({"price":{$lt:1000}})

//create user only read
db.createUser({user: "pepe",
                pwd: "456",
                roles:
                [{role: "read", db: "ecommerce"}]
            })
