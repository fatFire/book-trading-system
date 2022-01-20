import * as request  from '../../common/Request'

export const getMyBooks = function(id, config) {
  return request.get(`/books?isDeleted=false&users_permissions_user=${id}`, config)
}

export const deleteBook = function(id, config) {
  return request.put(`/books/${id}`, { isDeleted: true }, config)
}