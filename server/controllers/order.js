const DB = require('../utils/db.js')

module.exports = {

  /* 创建订单 */

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let productList = ctx.request.body.list || []

    // 插入订单至 order_user 表; id 和 time 为自动添加
    let order = await DB.query('insert into order_user(user) values (?)', [user])
    
    let orderId = order.insertId

    let sql = 'INSERT INTO order_product (order_id, product_id, count) VALUES '

    let params = []
    let query = []

    productList.forEach(product => {
      query.push('(?, ?, ?)')

      params.push(orderId)
      params.push(product.id)
      params.push(product.count || 1)

    })

    await DB.query(sql + query.join(', '), params)
    
  }
}