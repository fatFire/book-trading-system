import * as request  from '../../common/Request'

export const getMyOrders = function(id, config) {
  return request.get(`/orders?users_permissions_user=${id}`, config)
}