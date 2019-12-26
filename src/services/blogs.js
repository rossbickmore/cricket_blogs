const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await fetch(baseUrl)
  const commits = await response.json()
  return commits
}

const create = async newObject => {
  const config = {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(newObject)
  }
  const response = await fetch(baseUrl, config)
  const result = await response.json()
  return result
}

const update = async (id, newObject) => {
  const config = {
    method: 'PUT',
    headers: { Authorization: token, 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(newObject)
  }
  const response = await fetch(`${ baseUrl }/${id}`,config)
  console.log(response)
  const result = await response.json()
  return result
  
}

const destroy = async id => {
  const config = {
    method: 'DELETE',
  }
  await fetch(`${ baseUrl }/${id}`, config)
}

export default { getAll, create, destroy, update, setToken } 