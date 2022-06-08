const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars')
const Container = require('./helpers/fileManager');
const formatDate = require('./helpers/setTime')

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: `${__dirname}/views/index.hbs`,
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/partials`,
    })
);


app.use(express.static("./public"))

const Store = new Container();

app.set('views', './views')
app.set('view engine', 'hbs')

const products = [];
const users = [];
const messages = [];



app.get("/products", (req, res) => {
    return res.send(products);
});



io.on("connection", (socket) => {
   console.log(`new user id: ${socket.id}`)
    
   socket.on("addProduct",(data) =>{
        const newProduct = {...data,id:products.length + 1}
        products.push(newProduct)
        io.emit("newProduct",newProduct)
    })

    socket.on("login", async (email) => {
        users.push({
            email,
            id: socket.id,
        });
        const messages = await Store.getAllItems();
        socket.emit("success", messages);
    });
    
    socket.on("addMessage", async (data) => {
        const now = new Date();
        const newMessage = {
            message: data.message,
            email: data.email,
            time: formatDate(now),
        };
    
        await Store.saveMessage(newMessage);
        io.emit("newMessage", newMessage);
    });

});

httpServer.listen(port, () => {
    console.log(`server run on port ${port}`)
})




