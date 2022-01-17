import * as request  from '../../common/Request'

export const modifyBook = function(id, data, config) {
  return request.put(`/books/${id}`, data, config)
}