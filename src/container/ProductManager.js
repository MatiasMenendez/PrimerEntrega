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
    if(newProduct.length === 8){
    this.products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    return console.log('product added')}
    else{
      console.log(newProduct.length)
    }
  }catch(err){
    console.log(err)
  }

}



async putProduct(id, prodMod) {
  
  const format = prodMod.title && prodMod.escription && prodMod.code && prodMod.price && prodMod.status && prodMod.stock && prodMod.category && prodMod.thumbnail && 
  Object.keys(prodMod).length === 8 ? true : null;

  const prodIndex = this.products.findIndex(elem => elem.idProduct === Number(id))

  const product = this.products.find(elem => elem.idProduct === Number(id));

  if (format && product) {
      prodMod.id = this.products[prodIndex].id;
      this.products[prodIndex] = prodMod;
      return res.send("Producto modificado");
  } else{
    console.log("error")
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