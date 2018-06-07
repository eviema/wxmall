const DB = require('../utils/db.js')
module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },
  detail: async ctx => {
    productID = + ctx.params.id // “+”强制把字符变为整数
    
    if (!isNaN(productID)) {
      ctx.state.data = (await DB.query("SELECT * FROM product WHERE product.id = ?", [productID]))[0]
    }
    else {
      ctx.state.data = {}
    }
  }
}