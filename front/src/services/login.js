import axios from 'axios'
const BASEURL = '/api/login/'

const login = async credentials => {
  const { data } = await axios.post(BASEURL, credentials)
  return data
}

export default { login }
