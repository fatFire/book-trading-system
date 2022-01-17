import * as request  from '../../common/Request'

export function signin(data) {
  return request.post('/auth/local', data)
}

export function getCart(id, config) {
  return request.get(`/carts?users_permissions_user=${id}`, config)
}