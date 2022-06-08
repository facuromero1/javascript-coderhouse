const Container = require("./project/contenedor");
const express = require("express");

const port = 8080;

const app = express();
const containerOne = new Container("/project/objetos.txt")

let item1 = { title: 'Monitor',
  price: 450055,
  thumbnail: 'url',}
let item2 = { title: 'TV',
  price: 450055,
  thumbnail: 'url',}
let item3 = { title: 'Stereo',
  price: 24000,
  thumbnail: 'url',}

containerOne.saveNewItem(item1);
containerOne.saveNewItem(item2);
containerOne.saveNewItem(item3);




const ConectionServer = app.listen(port,(req,res) =>{
    console.log(`server is litening on port: ${ConectionServer.address().port}`)
})



app.get("/productos",(req,res) =>{
    let allProducts = containerOne.getAllItem()
    res.send(console.log(allProducts))
    
   
})


app.get("/productoRandom",(req,res) =>{
  let randomProduct
  randomProduct = containerOne.getRandom()
  res.send(randomProduct);
})






