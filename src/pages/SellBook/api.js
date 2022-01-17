import * as request  from '../../common/Request'

export const createBook = function(data, config) {
  return request.post(`books`, data, config)
}


export const googleBookApi = (isbn) => {
  return request.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(books => {
    if (!books.totalItems) {
      throw new Error(`no books found with isbn: ${isbn}`);
    }
    if (!books.items || books.items.length === 0) {
      throw new Error(`no volume info found for book with isbn: ${isbn}`);
    }
    const book = books.items[0].volumeInfo;
    return book;
  })
}