const baseUrl = '/api/users'

const getAll = async () => {
  const response = await fetch(baseUrl)
  const commits = await response.json()
  return commits
}

export default { getAll } 