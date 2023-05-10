const express = require('express')
const app = express()
const PORT = 8080
const ProductManager = require("./ProductManager")

app.use(express.json())


app.get('/products', (req, res) => {
    let manager = new ProductManager("./products.json")
    const products = manager.getProducts()
    products.then(product => {
        let response = JSON.parse(product)
        res.send({ menssage: "Productos", data: response })
    }).catch(err => {
        console.log(err)
    })
})

app.get('/product/:id', (req, res) => {
    let manager = new ProductManager("./products.json")
    let id = req.params.id
    let productRes = manager.getProductById(id)
    productRes.then(product => {
        let response = product
        res.send({ menssage: "Productos", data: response })
    }).catch(err => {
        console.log(err)
    })
})

app.post('/createProduct', (req, res) => {
    let manager = new ProductManager("./products.json")
    let productRes = manager.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock)
    productRes.then(product => {
        let response = product
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

app.delete('/deleteProduct/:id', (req, res) => {
    let manager = new ProductManager("./products.json")
    let productRes = manager.deleteProduct(req.params.id)
    productRes.then(product => {
        let response = product
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

app.put('/updateProduct/:id', (req, res) => {
    let manager = new ProductManager("./products.json")
    let productRes = manager.updateProduct(req.params.id, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock)
    productRes.then(product => {
        let response = product
        res.send({data: response,message:'Producto Actualizado' })
    }).catch(err => {
        console.log(err)
    })
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})