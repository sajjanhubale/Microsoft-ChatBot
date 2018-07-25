The rising wave of Artificial Intelligence (AI) in the last couple of years has given a massive push to the idea if conversational interfaces, commonly known as Chatbots.

Chatbots are exactly what they sound like: a chat with a bot. It's a form of conversational Artificial Intelligence (AI) in which a user interacts with a virtual agent through natural language processing ( LUIS/API.AI).

These types of chatbots helps customers to automate SAP Operations.

##### Let’s get started.....

### Microsoft Bot Framework

Microsoft Bot Framework can help us in developing the chat bots, that can be integrated with platforms such as Skype, Slack, Telegram, Email and the Web. 

Bot Builder for Node.js

The Bot Builder SDK is an open source SDK, hosted on GitHub, that provides everything you need to build great dialogs within your Node.js, .NET or REST API-based bot Application.

##### To get started, you need to set up the node project and install the proper node modules and emulator:

1.Create a folder for the project workspace

2.Install Node.js

##### Run the following command:npm init to start the node project and follow the prompt in your terminal, which will create a package.json file.

3. Install the Bot SDK (for Node.js specifically! There’s also an SDK for .NET)
```
npm install --save botbuilder
```
4. Install Restify (or Express, if you’d like)
```
npm install --save restify
```
5. Install node-rest-client to call OData services
```
npm install --save node-rest-client
```
6. Install recognizer to integrate LUIS into boatbuilder 
```
npm install --save recognizer
```
7. Download the Bot emulator

8. Create an app.js file in your project directory

##### Add the following code to your app.js file to set up the bot and connector listening on an API endpoint
```
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
```
9. Test your bot out in the emulator

Run node app.js to run your bot locally. Start the emulator and connect your bot to it. Type http://localhost:3978/api/ messages (default endpoint when running locally) into the address bar, leave MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD blank for now. Click Connect!

### Register and Deploy

This entire time the bot has been running locally with an emulator. Now, let’s use Azure to deploy our bot.

. Push all your code to GitHub (you can also deploy from a local git repo or Visual Studio) and follow these steps

. Set up an Azure account

. Create a web app on Azure

. Register your bot

When registering your bot, the HTTPS Message Endpoint is the URL from your Azure web app (found in the Web Apps Overview section). You will need to add /api/messages to the end of the URL.

You will also need to add the generated MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD to your Web App’s Application Settings. You can do this by going to the App settings section where the Key is MICROSOFT_APP_ID and Value is the generated ID. Repeat for MICROSOFT_APP_PASSWORD.

Finally, add your bot’s MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD to your code where you declare your chat connector variable, replacing process.env.MICROSOFT_APP_ID and process.env.MICROSOFT_APP_PASSWORD.

### Finally

From the Bot Framework portal where you registered your bot, you can now add multiple channels that you can talk to your bot through. You can start with the Skype and Web Chat channels since those two are turned on by default.

