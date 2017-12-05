var keys = require("./keys.js");

var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;

var command = process.argv[2];

if (command ==="my-tweets"){

    myTweets();
  
}





function myTweets(){

    var Twitter = require('twitter');
    
        var client = new Twitter({
         consumer_key: consumer_key,
         consumer_secret: consumer_secret,
         access_token_key: access_token_key,
         access_token_secret: access_token_secret
       });
    
       var count = 20;
       var params = {screen_name: 'Shant Wanes', count : count, trim_user: 't'};
    
       client.get('statuses/user_timeline', params, function(error, tweets, response) {
         if (error) throw error;

        console.log(tweets.length);
        for (i=0; (i < count && i < tweets.length)  ;i++){
         console.log("Tweet: " + tweets[i].text + "   " + "Created at: " + tweets[i].created_at);
         
        }
         //console.log(response);
       });
}