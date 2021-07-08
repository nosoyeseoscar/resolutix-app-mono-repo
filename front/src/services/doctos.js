import axios from 'axios'
const BASEURL = '/api/documents/'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(BASEURL)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(BASEURL, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${BASEURL}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
