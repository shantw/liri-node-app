var keys = require("./keys.js");

var consumer_key = keys.consumer_key;
var consumer_secret = keys.consumer_secret;
var access_token_key = keys.access_token_key;
var access_token_secret = keys.access_token_secret;
var spotifyClientId = keys.spotifyClientId;
var spotifyClientSecret = keys.spotifyClientSecret;
var OMDBAPIKey = 'trilogy';
var command0   = 'node liri.js';
var artist = null;

var command1 = process.argv[2];
var command2 = process.argv[3];

checkCommands();

function checkCommands(){

   // console.log(command1);
if (command1 ==="my-tweets"){

    myTweets();
    command0 = "\n" + 'command: ' + command0 + " " + command1;
    writeLog(command0);

  
} else if (command1 ==="spotify-this-song") {

    if (command2 === null || command2 === '' || command2 === undefined ) {
        command2 = 'The Sign';
        artist   = 'Ace of Base';
    }

    spotifyThisSong();
    command0 = "\n" + 'command: ' + command0 + " " + command1 + " " + command2;
    writeLog(command0);

} else if (command1 ==="movie-this") {
       movieThis();
       command0 = "\n" + 'command: ' + command0 + " " + command1 + " " + command2;
       writeLog(command0);
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
    writeLog("\n" + "Results: ");

    console.log("Title of the movie is: " + JSON.parse(body).Title); 
    console.log("Year the movie came out is: " + JSON.parse(body).Year); 
    console.log("IMDB Rating of the movie is: " + JSON.parse(body).imdbRating); 
    console.log("Rotten Tomatoes Rating of the movie is: " + JSON.parse(body).Ratings[1].Value); 
    console.log("Country where the movie was produced: " + JSON.parse(body).Country); 
    console.log("Language of the movie: " + JSON.parse(body).Language); 
    console.log("Plot of the movie: " + JSON.parse(body).Plot); 
    console.log("Actors in the movie: " + JSON.parse(body).Actors); 

    writeLog("\n" + "Title of the movie is: " + JSON.parse(body).Title); 
    writeLog("\n" + "Year the movie came out is: " + JSON.parse(body).Year); 
    writeLog("\n" + "IMDB Rating of the movie is: " + JSON.parse(body).imdbRating); 
    writeLog("\n" + "Rotten Tomatoes Rating of the movie is: " + JSON.parse(body).Ratings[1].Value); 
    writeLog("\n" + "Country where the movie was produced: " + JSON.parse(body).Country); 
    writeLog("\n" + "Language of the movie: " + JSON.parse(body).Language); 
    writeLog("\n" + "Plot of the movie: " + JSON.parse(body).Plot); 
    writeLog("\n" + "Actors in the movie: " + JSON.parse(body).Actors); 
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


if (artist !== null){
    //limit = 50;
    spotify.search({type: 'track', query: command2, limit : limit}, function(err, data) {      

        if (err) {
            return console.log('Error occurred: ' + err);
        }     
        writeLog("\n" + "Results: ");  
        for (i=0; i < limit && i < data.tracks.items.length ; i++){
            
            //for (j=0;j < data.tracks.items[i].artists.length ;j++){
                //if (data.tracks.items[i].artists[j].name.toLowerCase()===artist.toLowerCase()) {
                    console.log("Name of the song: "+data.tracks.items[i].name);
                    console.log("Album Name(s): " + data.tracks.items[i].album.name);
                    console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);    

                    writeLog("\n" + "Name of the song: "+data.tracks.items[i].name);
                    writeLog("\n" + "Album Name(s): " + data.tracks.items[i].album.name);
                    writeLog( "\n" + "Artist(s): " + data.tracks.items[i].album.artists[0].name);
                    writeLog("\n" + "Preview Link: " + data.tracks.items[i].preview_url);
              //  }  
            //}
        }         
    });
}
else
{
    
    spotify.search({type: 'track', query: command2, limit : limit}, function(err, data) {
        
    if (err) {
        return console.log('Error occurred: ' + err);
    }   
    writeLog("\n" + "Results: ");
      for (i=0; i < 3 && i < data.tracks.items.length ; i++){ --limit

            //for (j=0;j < data.tracks.items[i].artists.length ;j++){

                    console.log("Name of the song: "+data.tracks.items[i].name);
                    console.log("Album Name(s): " + data.tracks.items[i].album.name);
                    console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);  

                    writeLog("\n" + "Name of the song: "+data.tracks.items[i].name);
                    writeLog("\n" + "Album Name(s): " + data.tracks.items[i].album.name);
                    writeLog( "\n" + "Artist(s): " + data.tracks.items[i].album.artists[0].name);
                    writeLog("\n" + "Preview Link: " + data.tracks.items[i].preview_url);
              //      }   
           // }
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

        //console.log(tweets.length);
        writeLog("\n" + "Results: ");
        for (i=0; (i < count && i < tweets.length)  ;i++){

         console.log("Tweet: " + tweets[i].text + "   " + "Created at: " + tweets[i].created_at);
         writeLog("\n" + "Tweet: " + tweets[i].text + "   " + "Created at: " + tweets[i].created_at);
         
        }
         //console.log(response);
       });
};


function writeLog(data){
    var fs = require("fs");

    var textFile = 'log.txt';

    fs.appendFile(textFile, data, function(err) {
      
      if (err) {
        console.log(err);
      }

    });
}