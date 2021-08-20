const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  // return results;

  const requestResults = urls.map(async (url) => await(httpGet(url)));

  const results = await Promise.all(requestResults);

  const processResults = results.map(result => {
    if(result.status === 200){
      return processSuccess(JSON.parse(result.body).message);
    }
    else{ // 4xx - 500
      return processFailure(JSON.parse(result.body).message);
    }
  });

  return processResults;
};



const processSuccess = (quote) => {
  return ({"Arnie Quote": quote});
}

const processFailure = (quote) => {
  return ({"FAILURE": quote});
}

module.exports = {
  getArnieQuotes,
};
