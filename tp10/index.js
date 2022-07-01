const express = require("express");
const app = express();
const Database = require("./db/mongodb");
const productsRouter = require("./routers/productsRouter");
const cartRouter = require("./routers/cartRouter");

if (process.env.STORAGE === "mongodb") Database.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));