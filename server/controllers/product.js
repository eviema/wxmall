const DB = require('../utils/db.js')
module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },

  detail: async ctx => {
    let productId = +ctx.params.id // “+”强制把字符变为整数
    let product
    
    if (!isNaN(productId)) {
      product = (await DB.query("SELECT * FROM product WHERE product.id = ?", [productId]))[0]
    }
    else {
      product = {}
    }

    product.commentCount = (await DB.query('SELECT COUNT(id) AS comment_count FROM comment WHERE comment.product_id = ?', [productId]))[0].comment_count || 0
    product.firstComment = (await DB.query('SELECT * FROM comment WHERE comment.product_id = ? LIMIT 1 OFFSET 0', [productId]))[0] || null

    ctx.state.data = product

  }
}