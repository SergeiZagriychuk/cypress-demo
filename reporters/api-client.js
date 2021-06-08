var http = require('https');

const requestData = {
    refreshToken: ''
};

var options = {
  host: '',
  path: '/api/iam/v1/auth/refresh',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }
};

callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

const request = http.request(options, callback);
request.write(JSON.stringify(requestData));
request.end();