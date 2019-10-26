import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
  // 添加商品
  addCart({state,commit}, payload) {
    let oldProduct = state.cartList.find(item => {
      return item.iid === payload.iid
    })  
    if (oldProduct) {
      commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      commit(ADD_TO_CART, payload)
    }
  }
}