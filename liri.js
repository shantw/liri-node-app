var keys = require("./keys.js");

var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;
var spotifyClientId = keys.spotifyClientId;
var spotifyClientSecret = keys.spotifyClientSecret;
var OMDBAPIKey = 'trilogy';
//var command2 = null;

var command1 = process.argv[2];
var command2 = process.argv[3];

checkCommands();

function checkCommands(){
if (command1 ==="my-tweets"){

    myTweets();
  
} else if (command1 ==="spotify-this-song") {

    spotifyThisSong();

} else if (command1 ==="movie-this") {
       movieThis();
}
else if (command1 ==="do-what-it-says") {
    doWhatItSays();
} 
else 
{
console.log("Not a valid Command");
}

};

function doWhatItSays(){

    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        
        if (error) {
          return console.log(error);
        }

        var dataArr = data.split(",");

        command1 = dataArr[0];
        command2 = dataArr[1];
        checkCommands();     
    });
    
};


function movieThis(){

if (command2 === null || command2 === '' || command2 === undefined ) {
    command2 = 'Mr. Nobody'
}
var request = require("request");

// Run a request to the OMDB API with the movie specified

request("http://www.omdbapi.com/?t=" + command2 + "&y=&plot=short&apikey=" + OMDBAPIKey, function(error, response, body) {
  // If the request is successful 
  if (!error && response.statusCode === 200) {
    // Parse the body of the site

    console.log("Title of the movie is: " + JSON.parse(body).Title); 
    console.log("Year the movie came out is: " + JSON.parse(body).Year); 
    console.log("IMDB Rating of the movie is: " + JSON.parse(body).imdbRating); 
    console.log("Rotten Tomatoes Rating of the movie is: " + JSON.parse(body).Ratings[1].Value); 
    console.log("Country where the movie was produced: " + JSON.parse(body).Country); 
    console.log("Language of the movie: " + JSON.parse(body).Language); 
    console.log("Plot of the movie: " + JSON.parse(body).Plot); 
    console.log("Actors in the movie: " + JSON.parse(body).Actors); 
  }

});
    
};

function spotifyThisSong() {

//var command2 = process.argv[3]; 

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: spotifyClientId,
    secret: spotifyClientSecret
  });
var limit = 5;
var artist = null;

if (command2 === null || command2 === '' || command2 === undefined ) {
    command2 = 'The Sign';
    artist   = 'Ace of Base';
}

if (artist !== null){
    //console.log("dd");
    //limit = 50;
    spotify.search({type: 'track', query: 'The Sign', limit : limit}, function(err, data) {      

        if (err) {
            return console.log('Error occurred: ' + err);
        }       
        for (i=0; i < limit && i < data.tracks.items.length ; i++){
            //console.log(command1 + " sdd " + command2 + "  " + artist);
            for (j=0;j < data.tracks.items[i].artists.length ;j++){
                if (data.tracks.items[i].artists[j].name.toLowerCase()===artist.toLowerCase()) {
                    console.log("Name of the song: "+data.tracks.items[i].name);
                    console.log("Album Name(s): " + data.tracks.items[i].album.name);
                    console.log("Artist(s): " + data.tracks.items[i].album.artists[j].name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);    
                }  
            }
        }         
    });
}
else
{
    spotify.search({type: 'track', query: command2, limit : limit}, function(err, data) {
        
        if (err) {
            return console.log('Error occurred: ' + err);
        }       

        for (i=0; i < limit && i < data.tracks.items.length ; i++){ //data.tracks.items.length
        if (data.tracks.items[i].name.toLowerCase()===command2.toLowerCase()) {
            console.log("Name of the song: "+data.tracks.items[i].name);
            console.log("Album Name(s): " + data.tracks.items[i].album.name);
            console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);      
        }   
    }
    });  
}

};

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
};