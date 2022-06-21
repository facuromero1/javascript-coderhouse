const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars')


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const port = 8080

const SqlStorage = require('./storage/SqlStorage');
const sqliteStorage = require('./storage/sqliteStorage')
const { mysqlConfig } = require('./db/mysql');
const {sqliteConfig} = require('./db/sqlite')


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

const sqlStore = new SqlStorage(mysqlConfig, 'products')
const sqliteStore = new sqliteStorage(sqliteConfig,'messages')

 
app.set('views', './views')
app.set('view engine', 'hbs')

const products = [];
const users = [];
const messages = [];



app.get("/products",async (req, res) => {
    const allProducts = await sqlStore.getAllProducts();
    return res.send(allProducts);
});



io.on("connection", (socket) => {
   console.log(`new user id: ${socket.id}`)
    
   socket.on("addProduct",async (data) =>{
        const newProduct = await sqlStore.saveProduct(data);
        console.log(newProduct);
        io.emit("newProduct",newProduct)
    });

    socket.on("login", async (email) => {
        users.push({
            email,
            id: socket.id,
        });
        const messages = await sqliteStore.getAll();
        socket.emit("success", messages);
    });
    
    socket.on("addMessage", async (data) => {
        const now = new Date();
        const newMessage = {
            message: data.message,
            email: data.email,
            created_at: now,
        };
    
        await sqliteStorage.saveMessage(newMessage)
        io.emit("newMessage", newMessage);
    });

});

httpServer.listen(port, () => {
    console.log(`server run on port ${port}`)
})