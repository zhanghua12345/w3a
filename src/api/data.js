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
 * @param {Object} param data {"type" : "renovation || offer || offer" 三选一, "remarks" : "备注"} 传值参数
 */
export function setAddRemarks(data) {
  return request({
    url: `user/addRemarks`,
    method: 'post',
    data,
  });
}
