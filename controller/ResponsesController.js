exports.handleRequest = function(text, callback) {

    // Build request payload
    var payloadToWatson = {};
    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }

    // Built http request
    var http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        callback(http.responseText);
      } else {
          callback();
      }
    };

    var params = JSON.stringify(payloadToWatson);
    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application
    if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
      Api.setRequestPayload(params);
    }

    // Send request
    http.send(params);
}