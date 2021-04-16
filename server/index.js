const express = require('express');
const tweets = require('./model/tweets.js');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tweets', (request, response) => {
    tweets.getAll(response);
});

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}`)
});
