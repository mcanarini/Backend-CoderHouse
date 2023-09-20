import fs from 'fs'

class productsManager {
    constructor (path) {
      this.path = path
    }
    async getProducts (queryObj) {
      const { order } = queryObj
      try {
          if (fs.existsSync (this.path)) {
            console.log ('order',order);
          const info = await fs.promises.readFile(this.path, 'utf-8')
          const infoParsed = JSON.parse(info)
          return order === 'ASC'
            ? infoParsed.sort((a, b) => a.first_name.localeCompare(b.first_name))
            : order === 'DESC'
            ? infoParsed.sort((a, b) => b.first_name.localeCompare(a.first_name))
            : infoParsed
        } else {
          return []
        }
      } catch (error) {
        return error
      }
    }
  
    async createProducts (obj) {
      try {
        const products = await this.getProducts({})
        let id
        if (!products.length) {
          id = 1
        } else {
          id = products [products.length - 1].id + 1
        }
        const newProduct = { id, ...obj }
        users.push(newUser)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return newProduct
      } catch (error) {
        return error
      }
    }
  
    async getProductById(idProduct) {
      try {
        const products = await this.getProducts({})
        const product = products.find((u) => u.id === idProduct)
        return product
      } catch (error) {
        return error
      }
    }
  
    async deleteProduct(idProduct) {
      try {
        const products = await this.getUsers()
        const product = products.find((u) => u.id === idProduct)
        if (!product) {
          return -1
        }
        const newArrayProducts = products.filter((u) => u.id !== idProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
        return 1
      } catch (error) {
        return error
      }
    }
  
    async updateProduct (idProduct, obj) {
      try {
        const products = await this.getProducts()
        const index = products.findIndex((u) => u.id === idProduct)
        if (index === -1) {
          return -1
        }
        const product = products[index]
        products[index] = { ...product, ...obj }
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return 1
      } catch (error) {
        return error
      }
    }
  }
  
  export const productsManager = new productsManager('Products.json')