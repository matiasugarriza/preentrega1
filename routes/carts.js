const express = require('express')
const { Router } = express
const router = new Router()
const ProductManager = require("../ProductManager")

router.get('/', (req, res) => {
    let manager = new ProductManager("./carts.json")
    const products = manager.getProducts()
    products.then(product => {
        let response = JSON.parse(product)
        res.send({ menssage: "Carritos", data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/:id', (req, res) => {
    let manager = new ProductManager("./carts.json")
    let id = req.params.id
    let productRes = manager.getProductById(id)
    productRes.then(product => {
        let response = product
        res.send({ menssage: "Productos", data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/createProduct', (req, res) => {
    let manager = new ProductManager("./carts.json")
    let productRes = manager.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.status, req.body.category)
    productRes.then(product => {
        let response = product
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.delete('/deleteProduct/:id', (req, res) => {
    let manager = new ProductManager("./carts.json")
    let productRes = manager.deleteProduct(req.params.id)
    productRes.then(product => {
        let response = product
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.put('/updateProduct/:id', (req, res) => {
    let manager = new ProductManager("./carts.json")
    let productRes = manager.updateProduct(req.params.id, req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.status, req.body.category)
    productRes.then(product => {
        let response = product
        res.send({ data: response, message: 'Producto Actualizado' })
    }).catch(err => {
        console.log(err)
    })
})
module.exports = router