

var server = require('websocket').server, http = require('http');
let properties = require('./properties');
var apiai = require(properties.apiKey);
var app = apiai();
var Client=require('node-rest-client').Client

var flagIntent=0;

var socket = new server({
    httpServer: http.createServer().listen(1337)
});
var options_auth = { user: properties.username, password: properties.password };
var client=new Client(options_auth);

socket.on('request', function(request) {
var connection = request.accept(null, request.origin);
console.log("client connected");
connection.on('message', function(message) {
  console.log(message.utf8Data);
  var request = app.textRequest(message.utf8Data, {
  sessionId: properties.sessionId
  });

  request.on('response', function(response) {

      if(response.result.metadata.intentName=='ResetPassword')
      {
        if(flagIntent==0)
        {
        connection.sendUTF('Ok... sure, I can help you to reset the password. But before proceeding, I need more details from you.');
        connection.sendUTF('Please enter the system id.');
        flagIntent++;
        setOfQuestions(connection);
        }
        else{
        //  flag=1;

        }
      }else {
        if(flagIntent==0)
        {
        var send_message='sorry i did not get that';
        connection.sendUTF(send_message);
        }

      }

  });

  request.on('error', function(error) {
  console.log(error);
  });
request.end();
// setTimeout(function() {
//     connection.sendUTF('this is a websocket example');
// }, 1000);
});

  connection.on('close', function(connection) {
    console.log('connection closed');
  });
});
function setOfQuestions(connection)
{
connection.on('message', function(message) {
  if(flagIntent==1)
  {
    if(message.utf8Data=='ise' || message.utf8Data=='Ise')
    {

      console.log("Flag in system info: "+flagIntent);
        connection.sendUTF("Please enter the client number.");
        flagIntent++;
    }
    else
    {
      console.log("Flag in system info: "+flagIntent);
        connection.sendUTF("You have entred wrong system");
    }
  }
});

connection.on('message', function(message) {
if(flagIntent==2)
{
    if(message.utf8Data=='100' || message.utf8Data=='200')
    {
      flagIntent++;
      console.log("Flag in client info: "+flagIntent);
        connection.sendUTF("Please enter your userid.");
    }
    else
    {
      console.log("Flag in client info: "+flagIntent);
        connection.sendUTF("You have entred wrong client number");
    }
}

});

}

