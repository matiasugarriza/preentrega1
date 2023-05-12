const fs = require('fs')
class CartManager {
    constructor(path) {
        this.path = path
        this.id = 0
    }
    async getCarts() {
        let readFile = await fs.promises.readFile(this.path, "utf-8")
        return readFile
    }
    async addCart() {
        try {
            let readFile = await fs.promises.readFile(this.path, "utf-8")
            let carts = JSON.parse(readFile)
            let id = carts.length + 1
            if (carts.find((cart) => cart.id == id)) {
                id++
            }
            const newCart = {
                id: id,
                products: []
            };
            carts.push(newCart)
            fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return newCart
        } catch {
            let errorNewCart = 'Error al guardar el carrito'
            return errorNewCart
        }
    }
    async getCartById(id) {
        try {
            let getId = parseInt(id)
            if (getId > 0) {
                let readFile = await fs.promises.readFile(this.path, "utf-8")
                let carts = JSON.parse(readFile)
                let cartById = carts.find((cart) => cart.id == id)
                if (cartById) {
                    return cartById
                } else {
                    let menssageId = `No se encuentra ningún cart con el ID: ${id}`
                    return menssageId
                }
            } else {
                let errorId = 'El ID debe ser un número positivo'
                return errorId
            }

        } catch (err) {
            let serverError = `Hubo un problema al leer el archivo ${this.path}`
            console.error(serverError)
            console.error(err)
            return serverError
        }
    }
    async updateCart(id, pid) {
        try {
            let readFile = await fs.promises.readFile(this.path, "utf-8")
            let readFileProd = await fs.promises.readFile('./products.json', "utf-8")
            let carts = JSON.parse(readFile)
            let products = JSON.parse(readFileProd)
            const idCart = carts.find((cart) => cart.id == id)
            if (!idCart) {
                let notId = `No existe ningún carrito con el ID: ${id}`
                return await notId
            } else {
                const idProd = products.find((product) => product.id == pid)
                if (!idProd) {
                    let notId = `No existe ningún producto con el ID: ${pid}`
                    return await notId
                } else {
                const indexCart = carts.indexOf(idCart)
                let quantity = 1
                const products = [pid, quantity]
                const editedCart = { id, products }
                if (indexCart > -1) {
                    carts.splice(indexCart, 1, editedCart)
                    fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                    return await editedCart
                }}
            }
        } catch (err) {
            let updateError = 'Error al actualizar el carrito.'
            return updateError
        }
    }
    async deleteCart(id) {
        let readFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(readFile)
        const idCart = carts.find((cart) => cart.id == id)
        const indexCart = carts.indexOf(idCart)
        if (indexCart > 0) {
            carts.splice(indexCart, 1)
            fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            let sucessMenssage = 'Carrito eliminado con éxito'
            return await sucessMenssage
        } else {
            let errorDelete = 'No existe ningún carrito con ese ID'
            return await errorDelete
        }
    }
}
module.exports = CartManager
