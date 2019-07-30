//leave this up as an example of how to fetch POST
 /* function stuff() {
    
    fetch('http://localhost:5000/login', {
    method: 'POST',
    credentials: 'include',
    withCredentials: true,
    body: JSON.stringify({
      'email': 'allenyang2813@gmail.com',
      'password': '5738Ay@@'
    }),
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json'
    }
  }).then(res => res.json())
  .then(function(res) {
      console.log(res);
    if (res.code == 0) {
        console.log("nice!");
        Promise.resolve(res);
    } else {
        console.log("wtf");
        Promise.reject(res); //needs to catch this
    }
  })
  .catch(err => {
    console.error(err);
    
    alert('Error logging in please try again');
    console.log("why");
  });

  }*/

  //correct example of how to GET
function stuff() {
    
  fetch('http://localhost:5000/dashboard', {
  method: 'GET',
  credentials: 'include',
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json'
  }
}).then(res => res.json())
.then(function(res) {
    console.log(res);
  if (res.code == 0) {
      console.log("nice!");
      Promise.resolve(res);
  } else {
      console.log("wtf");
      Promise.reject(res); //needs to catch this
  }
})
.catch(err => {
  console.error(err);
  
  alert('Error logging in please try again');
  console.log("why");
});

}

module.exports = stuff;