// var BaseUrl = "https://crm.breo.cn:18081/api/";
// var BaseUrl = "http://www.51shoop.cn:18002/api/";
var BaseUrl = "http://120.25.27.102:18005/";

module.exports = {
  
  getToken: BaseUrl + 'admin/login', //获取Token
  getCode: BaseUrl + 'dmpMessage/custMessage/getMessage', // 获取验证码
  getOpenId: BaseUrl + 'dmpWeixin/smallProgramAccessConfig/jscode2session',//code换取openid

  // User
  login: BaseUrl + 'BbsUserController/loginByWx', //登录注册
  userUpdate: BaseUrl + 'dmpCustomer/custCustomers/updateCustomerInfo', //用户信息修改
  userQuery: BaseUrl + 'dmpCustomer/custCustomers/getCustomer', //用户信息查询
  addressQuery: BaseUrl + 'dmpCustomer/custAddress/getAllAddress',//所有省市区数据

  // Order
  orderQuery: BaseUrl + 'dmpCustomer/bizOrderHeaders/getOrderRecords', //获取订单列表
  orderProdDetailQuery: BaseUrl + 'dmpCustomer/bizOrderHeaders/findOrderProdDetailByOrderExternalId', //查看订单行商品信息

  // Comment
  submitComment: BaseUrl + 'dmpCustomer/bizOrderEvaluate/orderEvaluate', //添加评价
  orderCommentQuery: BaseUrl + 'dmpCustomer/bizOrderEvaluate/getEvaluateDetail', //订单评价查看
  getEvaluateTabsByLevel: BaseUrl + 'dmpCustomer/bizOrderEvaluate/getEvaluateTabsByLevel', // 根据评价级别获取评价标签

  // Coupon
  couponReceiveQuery: BaseUrl + 'dmpMarketing/mtkCoupon/getAllCoupons', // 获取可领券
  couponReceive: BaseUrl + 'dmpMarketing/mtkCouponCustomer/receiveCoupon', // 领取优惠券
  getMyCoupons: BaseUrl + 'dmpMarketing/mtkCouponCustomer/getReceivedCoupons', // 我的优惠券查询

  // Template
  sendTemplateMsg: BaseUrl + 'dmpWeixin/smallProgramAccessConfig/sendMsg', //领券后推送模版消息给用户

  // bbsForum
  getAllPosts: BaseUrl + 'BbsPostsController/getAllPosts', // 获取所有帖子
  getPostDetail: BaseUrl + 'BbsPostsController/getPosts', // 获取帖子详情
  addPosts: BaseUrl + 'BbsPostsController/addPosts', // 创建帖子
  getAllTopics: BaseUrl + 'BbsTopicController/getAllTopics', // 获取所有话题
  getTopicPosts: BaseUrl + 'BbsTopicController/getPosts', // 获取话题下的帖子
  liked: BaseUrl + 'BbsPostsController/liked',  // 用户点赞帖子
  
}; 
