import * as request  from '../../common/Request'

export const deleteBookFromCart = function(id, data, config) {
  return request.put(`/carts/${id}`, data, config)
}