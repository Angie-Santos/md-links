const axios = require('axios');

axios.get('https://github.com/workshopper/learnyoude')
  .then((response) => {
    // handle success
    console.log(response.status);
  })
  .catch((error) => {
    // handle error
    console.log(error.response.status);
  })
  .finally(() => {
    // always executed
  });
