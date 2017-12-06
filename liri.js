var keys = require("./keys.js");

var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;
var spotifyClientId = keys.spotifyClientId;
var spotifyClientSecret = keys.spotifyClientSecret;
var command2 = null;

var command1 = process.argv[2];
command2 = process.argv[3];



if (command1 ==="my-tweets"){

    myTweets();
  
} else if (command1 ==="spotify-this-song") {

    spotifyThisSong();

}

function spotifyThisSong() {

//var command2 = process.argv[3]; 

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: spotifyClientId,
    secret: spotifyClientSecret
  });
var limit = 5;


if (command2 === null || command2 === '' || command2 === undefined ) {
    command2 = 'The Sign'
    var album    = 'Ace of Bace'
}

spotify.search({ type: 'track', query: command2, limit : limit}, function(err, data) {

    if (err) {
      return console.log('Error occurred: ' + err);
    }

for (i=0; i < limit && i < data.tracks.items.length ; i++){ //data.tracks.items.length
console.log("Name of the song: "+data.tracks.items[i].name);
console.log("Album Name(s): " + data.tracks.items[i].album.name);
console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
console.log("Preview Link: " + data.tracks.items[i].preview_url);

//console.log(data.tracks.items[i].name);
}

});


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