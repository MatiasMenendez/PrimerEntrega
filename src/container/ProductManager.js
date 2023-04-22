const fs = require ('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./files/Products.JSON"
    }

//Bien
setId() {
  try {
      let idProduct = 1
      if (this.products.length > 0) {
          idProduct = (Math.max(...this.products.map(product => product.idProduct))) + 1
      }
      return idProduct
  }
  catch (error) {
      console.log(err)
  }
      
}

//Bien
async getAll(){
  try{
      const data = await fs.promises.readFile(this.path, "utf-8")
      const products = JSON.parse(data);
      return products;
  } 
  catch(err) {
      console.log(err)
  }
}

//bien
async getFiltered(id) {
  try{
    let products = await this.getAll()
    products = products.filter(item => item.idProduct <= id)
    return products
  }
  catch(err){
    console.log(err)
  }
}

//Bien
async getProductById(id) {
  try{
  let products = await this.getAll()
  products = products.filter(item => item.idProduct == id)
  if (products.length) {
      return products[0]
  } else { 
      console.log("product not founded")
  }
}
catch (err) {
  console.log (err)
}}

//bien pero falta que genere error si no tiene todos los parametros
async addProduct(newProduct) {
  try{
    this.products = await this.getAll()
    newProduct.idProduct = this.setId()
    if(newProduct){
    this.products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    return console.log('product added')}
    else{
      console.log("wrong parameters")
    }
  }catch(err){
    console.log(err)
  }
}

//testear
async updateProduct(id, newValues) {
  try {
      let oldProduct = (await this.getProductById(idProduct)).value

      Object.keys(newValues).forEach(property => {
          if (this.validateProperty(property, oldProduct)) {
              oldProduct[property] = newValues[property]
          }
      });
     
      let products = (await this.getProducts()).filter(item => item.idProduct != id)
      products.push(oldProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(products))

      return console.log('product updated')
  }
  catch (err) {
      console.log(err)
  }

}

//Bien
async deleteProduct(id) {
  try{
    if(id >= 1){
    let products = (await this.getAll()).filter(item => item.idProduct != id)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
    return console.log("product deleted")}

    else{ console.log("wrong params")
    }}
    catch (err){
      console.log(err)   
}
}

}

module.exports = ProductManager;