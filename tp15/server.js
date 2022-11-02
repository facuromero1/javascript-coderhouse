const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const { fork }  = require("child_process")

const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const initializePassport = require("./config/passport");
const {isAuthenticated, isNotAuthenticated} = require("./middlewares/authenticator");



const Storage = require("./storage/Storage");
const conectDataBase = require("./config/dataBase");


const normalizeMessages = require("./utils/normalizeMessages");
const createRandomProducts = require("./utils/createRandomProducts");
const formatDate = require("./utils/dateFormatter");
const replace = require("./utils/replaceNameOnIndex");
const { argv } = require("process");
const randomRouter = require("./routes/randomRouter")
require('dotenv').config();

const server = (args) => {
    const app = express();
    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);

    conectDataBase(process.env.MONGODB_URI);
    initializePassport(passport);
    

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            rolling: true,
            cookie: {maxAge: 600000}
}));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(express.static("./public"));
    app.use("/api", randomRouter);



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static("./public"));
app.use("/api", randomRouter);

const PORT = args.port || 8080;


app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: `${__dirname}/views/index.hbs`,
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/partials`,
    })
);

const Store = new Storage();

app.set("views", "./views");
app.set("view engine", "hbs");

const products = [];
const users = [];


app.get('/info', (req,res) => {
    const data = {
        args: JSON.stringify(args,null,2),
        nodeVersion: process.version,
        os: process.platform,
        path: process.execPath,
        processId: process.id,
        folderPath: process.cwd(),
        maxRSS: process.resourceUsage().maxRSS + " bytes",
        

    };
    return res.render("partials/info", {data: data});
})

app.get("/", isAuthenticated, async (req, res) => {
    const parseData = await replace(req.user.email)
    return res.send(parseData)
})


app.get("/login", isNotAuthenticated, (req, res) => {
    return res.render("partials/login");
});

app.post("/login", passport.authenticate("login",{
    successRedirect: "/",
    failureRedirect: "/register",
    failureFlash: true,
}));

app.get('/register',(req,res) => {
    return res.render("partials/register")
});

app.post('/register',passport.authenticate("register",{
    successRedirect:"/register",
    failureRedirect: "/register",
    failureFlash: true
}))

app.get("/logout",isAuthenticated, (req, res, next) => {
    const email = req.session.email
    return req.logOut((err) => {
        if(err) {
            return next(err)
        }
        return res.render("partials/logout", {email})
    })
});


app.get("/products", (req, res) => {
    return res.send(products);
    
});

app.get("/api/productos-test", (req, res) => {
    const randomProducts = createRandomProducts(5);
   
    return res.render("partials/products-table", {
        productos: randomProducts,
    });
});


io.on("connection", (socket) => {
    console.log(`nuevo usuario id: ${socket.id}`);

    //productos

    socket.on("addProduct", (data) => {
        const newProduct = { ...data, id: products.length + 1 };
        products.push(newProduct);
        io.emit("newProduct", newProduct);
    });

    //chat
    socket.on("login", async (user) => {
        users.push({
            user,
            id: socket.id,
        });
        const messages = await Store.getAll();
        normalizeMessages(messages);
        socket.emit("success", normalizeMessages(messages));
    });

    socket.on("addMessage", async (data) => {
        const now = new Date();
        const newMessage = {
            text: data.message,
            author: data.user,
            time: formatDate(now),
        };
        console.log(newMessage);

        await Store.saveMessage(newMessage);
        io.emit("newMessage", newMessage);
    })
});

httpServer.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto ${PORT}`)});
};

module.exports = server;