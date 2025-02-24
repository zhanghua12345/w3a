import request from '@/libs/request';

/**
 * @description 报价列表--列表
 * @param {Object} param data {Object} 传值参数
 */
export function offerList(data) {
  return request({
    url: 'user/offer',
    method: 'get',
    params: data,
  });
}

/**
 * @description 装修列表--列表
 * @param {Object} param data {Object} 传值参数
 */
export function renovationList(data) {
  return request({
    url: 'user/renovation',
    method: 'get',
    params: data,
  });
}

/**
 * @description 免费设计列表--列表
 * @param {Object} param data {Object} 传值参数
 */
export function designList(data) {
  return request({
    url: 'user/design',
    method: 'get',
    params: data,
  });
}

/**
 * @description 添加备注
 * data 请求参数
 * @param {Object} param data {"type" : "renovation || offer || design" 三选一, "remarks" : "备注"} 传值参数
 */
export function setAddRemarks(data) {
  return request({
    url: `user/addRemarks`,
    method: 'post',
    data,
  });
}

/**
 * @description 会员邀请用户到店列表--会员
 * @param {Object} param data {Object} 传值参数
 */
export function inviteList(data) {
  return request({
    url: 'user/inviteList',
    method: 'get',
    params: data,
  });
}

/**
 * @description 邀请用户到店审核--会员
 * data 请求参数
 * @param {Object} param data {id: "", "status" : "0 是审核中 1 通过 2拒绝" 三选一, "remakes" : "备注"} 传值参数
 */
export function inviteProcess(data) {
  return request({
    url: `user/inviteProcess`,
    method: 'post',
    data,
  });
}

/**
 * @description 提现列表--会员
 * @param {Object} param data {Object} 传值参数
 */
export function withdrawalList(data) {
  return request({
    url: 'user/withdrawalList',
    method: 'get',
    params: data,
  });
}

/**
 * @description 提现审核--会员
 * data 请求参数
 * @param {Object} param data {id: "", "status" : "0 是审核中 1 通过 2拒绝" 三选一, "remakes" : "备注"} 传值参数
 */
export function withdrawal(data) {
  return request({
    url: `user/withdrawal`,
    method: 'post',
    data,
  });
}

/**
 * @description 添加余额列表--会员
 * @param {Object} param data {Object} 传值参数
 */
export function addMoneyList(data) {
  return request({
    url: 'user/addMoneyList',
    method: 'get',
    params: data,
  });
}

/**
 * @description 通过id给用户添加余额--会员
 * data 请求参数
 * @param {Object} param data {id: "", "status" : "0 是审核中 1 通过 2拒绝" 三选一, "remakes" : "备注"} 传值参数
 */
export function addMoney(data) {
  return request({
    url: `user/addMoney`,
    method: 'post',
    data,
  });
}
