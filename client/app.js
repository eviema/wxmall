//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },

    login({ success, error }) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo'] === false) {
            // 已拒绝授权
            wx.showModal({
              title: '提示',
              content: '请授权我们获取您的用户信息',
              showCancel: false,
              success: () => {
                wx.openSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo'] === true) {
                      this.doQcloudLogin({ success, error })
                    }
                  }
                })
              }
            })
          }
          else {
            this.doQcloudLogin({ success, error })
          }
        }
      })
    },

    doQcloudLogin({ success, error }) {
      qcloud.login({
        success: res => {
          if (res) {
            let userInfo = res
            success & success({
              userInfo
            })
          }
          else {
            // 非首次登录，则不会返回用户信息，需请求用户信息接口获取
            this.getUserInfo({ success, error })
          }
        },
        fail: () => {
          error && error()
        }
      })
    },

    getUserInfo({ success, error }) {
      qcloud.request({
        url: config.service.requestUrl,
        login: true,
        success: res => {
          let data = res.data

          if (!data.code) {
            let userInfo = data.data

            success && success({
              userInfo
            })
          }
          else {
            errorr && error()
          }
        },
        fail: () => {
          error && error()
        }
      })
    },

    checkSession({ success, error }) {
      wx.checkSession({
        success: () => {
          this.getUserInfo({ success, error })
        },
        fail: () => {
          error && error()
        }
      })
    },
})
