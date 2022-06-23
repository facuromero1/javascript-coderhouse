const express = require('express')
const {productsRouter, cartRouter} = require('./routers')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", productsRouter);
app.use("/api/carrito", cartRouter);


app.use((req, res, next) => {
    return res.json({
        error: -2,
        descripcion: `Ruta ${req.url} método ${req.method} no implementada`,
    });
});

const server = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));