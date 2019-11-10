const baseUrl = "/api/blogs"

const getAll = () => {
  return fetch(baseUrl)
    .then( response => response.json())
}

const create = options => {
  return fetch(baseUrl, options)
  .then((res) => res.json())
  .then(data =>console.log(data))
}

const update = (id, options) => {
  return fetch(baseUrl + "/" + id, options)
  .then( response => response.json())
  .then( data => console.log(data))
}

export default { 
  getAll,
  create,
  update,
}