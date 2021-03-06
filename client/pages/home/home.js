// pages/home/home.js
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
  },

  getProductList(callback){
    wx.showLoading({
      title: '商品数据加载中...',
    })
    qcloud.request({
      url: config.service.productList,
      success: res => {
        wx.hideLoading()
        if (!res.data.code) {
          this.setData({
            productList: res.data.data
          })
        }
        else {
          wx.showToast({
            title: '商品数据加载失败',
          })
        }
      },
      complete: () => {
        callback && callback()
      },
      error: res => {
        wx.hideLoading()
        wx.showToast({
          title: '商品数据加载失败',
        })
      }
    })
  },

  addToTrolley(event) {
    wx.showLoading({
      title: '正在添加...',
    })
    
    let productId = event.currentTarget.dataset.id
    
    if (productId) {
      qcloud.request({
        url: config.service.addTrolley,
        login: true,
        method: 'PUT',
        data: {
          id: productId
        },
        success: result => {
          let data = result.data
  
          if (!data.code) {
            wx.showToast({
              title: '已添加到购物车',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '添加到购物车失败',
            })
          }
        },
        fail: () => {
          wx.showToast({
            icon: 'none',
            title: '添加到购物车失败',
          })
        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getProductList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})