import fs from 'fs'

class productManager {
  constructor(path) {
    this.path = path
  }
  async getProducts(queryObj) {
    const { order } = queryObj
    try {
        if (fs.existsSync(this.path)) {
          console.log('order',order);
        const info = await fs.promises.readFile(this.path, 'utf-8')
        const infoParsed = JSON.parse(info)
        return order === 'ASC'
          ? infoParsed.sort((a, b) => a.tíulo.localeCompare(b.first_name))
          : order === 'DESC'
          ? infoParsed.sort((a, b) => b.tíulo.localeCompare(a.first_name))
          : infoParsed
      } else {
        return []
      }
    } catch (error) {
      return error
    }
  }

  async createProduct(obj) {
    try {
      const users = await this.getProducts({})
      let id
      if (!products.length) {
        id = 1
      } else {
        id = products[products.length - 1].id + 1
      }
      const newProduct = { id, ...obj }
      products.push(newProduct)
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
      const products = await this.getProducts()
      const product = products.find((u) => u.id === idProduct)
      if (!product) {
        return -1
      }
      const newArrayProducts = product.filter((u) => u.id !== idProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
      return 1
    } catch (error) {
      return error
    }
  }

  async updateProduct(idProduct, obj) {
    try {
      const Products = await this.getProducts()
      const index = Products.findIndex((u) => u.id === idProduct)
      if (index === -1) {
        return -1
      }
      const user = Products[index]
      Products[index] = { ...Products, ...obj }
      await fs.promises.writeFile(this.path, JSON.stringify(Products))
      return 1
    } catch (error) {
      return error
    }
  }
}
export const productManager = new productManager('productsAPI.json')