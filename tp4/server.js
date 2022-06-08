const express = require('express')
const producRouter = require('./Routers/products')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : 'true'}))
app.use(express.static('public'))
app.use('/',producRouter)

const port = 8080;

const conectedServer = app.listen(port,() => {
    console.log(`server listening on port: ${conectedServer.address().port}`)
})

conectedServer.on("error",(error) => console.log(`error in server: ${error}`))
