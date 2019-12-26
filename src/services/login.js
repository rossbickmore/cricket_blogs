const baseUrl = '/api/login'

const login = async credentials => {
  const response = await fetch(baseUrl, credentials)
  return response.data
}

export default { login }

