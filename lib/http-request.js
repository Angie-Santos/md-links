const axios = require('axios');

function httpRequest(objLinks) {
  const links = objLinks.map((link) => axios.get(link.href.toString())
    .then((response) => {
      link.status = response.status;
      link.ok = response.statusText;
      return link;
    })
    .catch((error) => {
      if (error.response) {
        link.status = error.response.status;
        link.ok = 'Fail';
        return link;
      }
      link.status = 'Server error';
      link.ok = 'Fail';
      return link;
    }));
  return Promise.all(links);
}

module.exports = {
  httpRequest,
};
