import * as request  from '../../common/Request'

export const findAllCoversations = (data) => {
  return request.post(`/conversations/findall`, data)
}