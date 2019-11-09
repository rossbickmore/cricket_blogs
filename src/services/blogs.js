const url = "http://localhost:3000/blogs"

const getAll = () => {
  return fetch(url)
    .then( response => response.json())
}

const create = options => {
  return fetch(url, options)
  .then((res) => res.json())
  .then(data =>console.log(data))
}

const update = (id, options) => {
  return fetch(url + "/" + id, options)
  .then( response => response.json())
  .then( data => console.log(data))
}



export default { 
  getAll,
  create,
  update,
}