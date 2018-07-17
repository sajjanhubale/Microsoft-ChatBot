var builder = require('botbuilder');
var restify = require('restify');
var Client=require('node-rest-client').Client
var recognizer = require ('recognizer');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
  appId: 'wffffwf',
  appPassword: 'fsfsfsf'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
// You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
var luisUrl="LUIS URL";
const LuisModelUrl = process.env.LUIS_MODEL_URL || luisURL;
// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
bot.dialog('/WELCOME',function(session){
 session.send("Welcome to Bot!!!");
 session.beginDialog('/');
});
bot.dialog('/',intents);
intents.matches('Greetings',function(session){
session.send("Hello,How can i help you?");
});
intents.matches('getSAPData',function(session){
session.send("Sure, we can provide requested details");
 accessODataService(session);
});
 function accessODataService(session){ // execute any function in SAP by calling Odata services
  var OdataUrl="Odata service URL";
  client.get(OdataUrl,function(data,response){
   session.send(data);
   session.beginDialog('/');
   });
  }