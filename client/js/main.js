function login(){
  axios.post('http://localhost:3000/request_token', {
    username: $('#username').val(),
    password: $('#pwd').val()
  })
  .then(data => {
    localStorage.setItem('token', data.data.token);
    location.reload();
  })
  .catch(err => {
    console.log(err);
  })
}

function addItem(){
  axios.post(
    'http://localhost:3000/decode',{
      token: localStorage.getItem('token')}
  )
  .then(loggedInUser => {
    return axios.post('http://localhost:3000/items', {
      name: $('#input_name').val(),
      price: $('#input_price').val(),
      stock: $('#input_stock').val(),
      tags: $('#input_tags').val(),
      user: loggedInUser.data._id
    })
    .then(response => {
      location.reload();
    })
  })
  .catch(err=>{
    console.log(err);
  })
}