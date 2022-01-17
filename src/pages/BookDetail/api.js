import * as request  from '../../common/Request'

export const addToCart = function(id, data, config) {
  return request.put(`/carts/${id}`, data, config)
}

export const createComment = function(data, config) {
  return request.post(`/comments`, data, config)
}

export const findAllComments = function(id) {
  return request.get(`/comments?book=${id}&_sort=published_at:ASC`)
}

export const findOrCreateConversation = function(data, config) {
  return request.post(`/conversations/findorcreate`, data, config)
}