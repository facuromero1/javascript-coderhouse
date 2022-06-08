const path = process.cwd()
const express = require('express')
const Container = require('/Users/facu/Documents/coderHouse/tp2/project/contenedor');

const app = express()


const contenedor = new Container('/prod.ejs');
console.log(contenedor)

app.set('views', path)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: 'true' }))
app.use(express.static('/public'))

app.get('/', (req, res) => {
    return res.render('index')
})

app.get('/productos',async (req, res) => {
    const productos = await contenedor.getAllItems()
    const data = {
        productos
    }

    return res.render('prod', data)
})

app.post('/productos', async (req, res) => {
    const producto = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    const id = await contenedor.saveNewItem(producto)
    console.log("ID asignado: ", id)
    return res.redirect('/')
})

const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))

server.on("error", (error) => console.log(`Hubo un error: ${error}`));