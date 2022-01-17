import * as request  from '../../common/Request'

export function register(data) {
  return request.post('/auth/local/register', data)
}

export function createCart(data, config) {
  return request.post('/carts', data, config)
}