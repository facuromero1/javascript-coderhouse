const express = require('express');
const app = express();
const Container = require('/Users/facu/Documents/coderHouse/tps/project/contenedor');
const contenedor = new Container();






app.use(express.urlencoded({extended: 'true'}))
app.use(express.json())
app.set('views','./views')
app.set('view engine','pug')



app.get('',(req,res)=> {
     return res.render('index')
})





app.get('/productos',async(req,res) => {
    const products = await contenedor.getAllItems()
    const data = {
        products
    }
    return res.render('layouts/productos',data)
})



app.post('/productos',async (req,res) =>{
    const product = {
                    title: req.body.title,
                    price: req.body.price,
                    thumbnail: req.body.thumbnail
                }
    const id = await contenedor.saveNewItem(product)
    console.log('id del producto:', id)
    return res.redirect('/')
})


const port = 8080

const server = app.listen(port,() =>{
    console.log(`server listen on port: ${port}`)
})

server.on('error',error => console.log(`error in server: ${error}`))