
function formatTime(date) {
  date = new Date(date)
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET", type = "json") {
  return new Promise(function (resolve, reject) {
    console.log(data)    
    let contentType = "application/json"
    if (type == "json"){
      data = JSON.stringify(data);
    }else{
      contentType = "application/x-www-form-urlencoded"
    }
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'Authorization': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(url+"==success");
        console.log(res)

        if (res.data.code == 200) {
          resolve(res.data);
        } else if (res.data.code == 401){
          console.log("用户身份过期,请重新登录!")
          wx.removeStorageSync("token"); 
          wx.reLaunch({
            url: '/pages/index/index'
          })
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}


module.exports = {
  formatTime: formatTime,
  request: request
}
