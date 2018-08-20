function listItems(){
  // return axios.get('http://localhost:3000/?query=' + $('#input_name') + $('#input_price') + $('#input_stock') + $('#input_tags'))
  return axios.get('http://localhost:3000')
  .then(response => {
    response.data
  })
}