import axios from "axios";
import * as qs from "qs"

const baseURL = 'http://localhost:1337'
const token = JSON.parse(window.localStorage.getItem('jwt'));
 

const create = (url) => (data) => {
  return axios.post(`${baseURL}/${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

const find = (url) => (ids) => {
  const idsArr = ids && ids.map((id) => `id_in=${id}`)
  const param = idsArr ? '?' + idsArr.join('&') : ''
  return axios.get(`${baseURL}/${url}${param}`)
}

const findOne = (url) => (id) => {
  return axios.get(`${baseURL}/${url}/${id}`)
}

const update = (url) => (id, data) => {
  return axios.put(`${baseURL}/${url}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

const delet = (url) => (id) => {
  return axios.put(`${baseURL}/${url}/${id}`, {
    isDeleted: true
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const createBook = create('books')

export const findBooks = find('books')

export const findAllBooks = () => {
  return axios.get(`${baseURL}/books?isDeleted=false`)
}

export const findOneBook = findOne('books')

export const updateBook = update('books')

export const deleteBook = delet('books')

export const createOrder = create('orders/mycreate')

export const findOrders = () => {
  return axios.get(`${baseURL}/orders?isDeleted=false`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const findOneOrder = findOne('orders')

export const deleteOrder = delet('orders')

export const updateOrder = update('orders')

export const createUser = create('users')

export const findUsers = () => {
  return axios.get(`${baseURL}/users?isDeleted=false`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const findOneUser = findOne('users')

export const updateUser = update('users')

export const deleteUser = delet('users')

export const adminLogin = (data) => {
  return axios.post(`${baseURL}/admin/login`, data)
}

export const googleBookApi = (isbn) => {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(({status, data}) => {
    if (status !== 200) {
      throw new Error(`wrong response code: ${status}`);
    }

    const books = data;

    if (!books.totalItems) {
      throw new Error(`no books found with isbn: ${isbn}`);
    }

    // In very rare circumstances books.items[0] is undefined (see #2)
    if (!books.items || books.items.length === 0) {
      throw new Error(`no volume info found for book with isbn: ${isbn}`);
    }

    const book = books.items[0].volumeInfo;
    return book;
  });
}

export const createMessage = create('messages')

export const findOrCreateConversation = (data) => {
  return axios.post(`${baseURL}/conversations/findorcreate`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}

export const findAllCoversations = (data) => {
  return axios.post(`${baseURL}/conversations/findall`, data)
}

export const createComment = create('comments')

export const findAllComments = (book) => {
  return axios.get(`${baseURL}/comments?book=${book}&_sort=published_at:ASC`)
}
