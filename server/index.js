const express = require('express');
const { v4: uuidv4 } = require('uuid');
const followers = require('./model/followers.js');
const tweets = require('./model/tweets.js');
const users = require('./model/users.js');
const messages = require('./model/messages.js');
const tweetHashtags = require('./model/tweet_hashtags.js');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use(cors());

app.post('/tweets', (request, response) => {
    tweets.getAll(response);
});

app.post('/login', (request, response) => {
    users.login(request.body, response);
});

app.post('/register', (request, response) => {
    users.register(request.body, response);
});

app.post('/whoToFollow', (request, response) => {
    users.getFollowRecommendations(request.body, response);
});

app.post('/follow', (request, response) => {
    followers.addFollower(request.body);
    response.json({response: "received"});
});

app.post('/followByName', (request, response) => {
    followers.addFollowerByName(request.body);
    response.json({response: "received"});
});

app.post('/populateFeed', (request, response) => {
    tweets.getFeed(request.body.username, response);
});

app.post('/verifyUnique', (request, response) => {
    users.verifyUnique(request.body, response);
});

app.post('/tweet', (request, response) => {
    tweets.tweet(request.body);
    response.json({});
});

app.post('/getUserId', (request, response) => {
    users.getId(request.body, response);
});

app.post('/saveMessage', (request, response) => {
    messages.saveMessage(request.body, response);
});

app.post('/getMessages', (request, response) => {
    messages.getMessages(request.body, response);
});

app.post('/searchTwitter', (request, response) => {
    tweetHashtags.findTweets(request.body.query, response);
});

app.post('/searchUsers', (request, response) => {
    users.findUsers(request.body.username, response);
});

app.post('/getProfile', (request, response) => {
    users.getProfile(request.body, response);
});

app.post('/like', (request, response) => {
    tweets.like(request.body);
    response.json({});
});

app.post('/getFollowed', (request, response) => {
    users.getFollowed(request.body, response);
});

app.get('/getMostTweeted', (request, response) => {
    tweets.getMostTweeted(response);
});

app.get('/getMostLiked', (request, response) => {
    tweets.getMostLiked(response);
});

app.get('/analytics', (request, response) => {
    response.sendFile(__dirname + '/public/analytics.html');
});

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}`)
});
