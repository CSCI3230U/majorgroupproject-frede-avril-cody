const express = require('express');
const tweets = require('./model/tweets.js');
const cors = require('cors');
const app = express();

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

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function() {
    console.log(`Server listening on port ${app.get('port')}`)
});
