const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const followers = require('./model/followers.js');
const tweets = require('./model/tweets.js');
const users = require('./model/users.js');
const messages = require('./model/messages.js');
const tweetHashtags = require('./model/tweet_hashtags.js');
const cors = require('cors');
const app = express();

app.use(session({
    id: () => uuidv4(),
    saveUnitialized: false, // could make true if have time to block too many bad login attempts
    resave: false,
    secret: 'dishwasher purple orangutan'
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use(cors());

app.post('/tweets', (request, response) => {
    console.log(request.body);
    tweets.getAll(response);
});

app.post('/login', (request, response) => {
    console.log(request.body);
    users.login(request.session, request.body, response);
});

app.post('/register', (request, response) => {
    console.log(request.body);
    users.register(request.session, request.body, response);
});

app.post('/whoToFollow', (request, response) => {
    console.log(request.body);
    users.getFollowRecommendations(request.session, request.body, response);
});

app.post('/follow', (request, response) => {
    console.log(request.body);
    followers.addFollower(request.session, request.body);
    response.json({response: "received"});
});

app.post('/populateFeed', (request, response) => {
    console.log(request.body);
    tweets.getFeed(request.body.username, response);
});

app.post('/verifyUnique', (request, response) => {
    console.log(request.body);
    users.verifyUnique(request.body, response);
});

app.post('/tweet', (request, response) => {
    console.log(request.body);
    tweets.tweet(request.body);
    response.json({});
});

app.post('/saveMessage', (request, response) => {
    console.log(request.body);
    messages.saveMessage(request.body, response);
});

app.post('/getMessages', (request, response) => {
    console.log(request.body);
    messages.getMessages(request.body, response);
});

app.post('/searchTwitter', (request, response) => {
    console.log(request.body);
    tweetHashtags.findTweets(request.body.query, response);
});

app.get('/getMostTweeted', (request, response) => {
    tweets.getMostTweeted(response);
});

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}`)
});
