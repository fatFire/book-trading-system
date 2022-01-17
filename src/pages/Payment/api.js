import * as request  from '../../common/Request'

export const createOrder = function (data, config) {
  return request.post(`/orders/mycreate`, data, config)
}

export const deleteBookFromCart = function (id, data, config) {
  request.put(`http://localhost:1337/carts/${id}`, data, config)
}