import * as request  from '../../common/Request'

export function getAllBooks(query) {
  return request.get(`/books?status=available&isDeleted=false${query ? `&${query}` : ''}`)
}
