var BaseUrl = "http://www.51shoop.cn:18002/api/";

module.exports = {
  
  getToken: BaseUrl + 'dmpWeixin/init/getToken', //获取Token
  getCode: BaseUrl + 'dmpMessage/custMessage/getMessage', // 获取验证码

  // User
  login: BaseUrl + 'dmpCustomer/custCustomers/customerLogin', //登录注册
  userUpdate: BaseUrl + 'dmpCustomer/custCustomers/updateCustomerInfo', //用户信息修改
  userQuery: BaseUrl + 'dmpCustomer/custCustomers/getCustomer', //用户信息查询

  // Order
  orderQuery: BaseUrl + 'dmpCustomer/bizOrderHeaders/getOrders', //获取订单列表
  OrderProdDetailQuery: BaseUrl + 'dmpCustomer/bizOrderHeaders/findOrderProdDetailByOrderExternalId', //查看订单行商品信息

  // Comment
  orderCommentQuery: BaseUrl + 'dmpCustomer/bizOrderEvaluate/getEvaluateDetail', //订单评价查看
  getEvaluateTabsByLevel: BaseUrl + 'dmpCustomer/bizOrderEvaluate/getEvaluateTabsByLevel', // 根据评价级别获取评价标签

  // Coupon
  couponReceiveQuery: BaseUrl + 'dmpMarketing/mtkCoupon/getAllCoupons', // 获取可领券
  couponReceive: BaseUrl + 'dmpMarketing/mtkCouponCustomer/receiveCoupon', // 领取优惠券
  getMyCoupons: BaseUrl + 'dmpMarketing/mtkCouponCustomer/getReceivedCoupons', // 我的优惠券查询

};
