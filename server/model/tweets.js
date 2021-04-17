const db = require('./database.js');

function getAll(res) {
    db.data.all('SELECT * FROM tweets', function (err, tweets) {
        if (err) {
            console.error("There was an error retrieving data: " + err);
        } else {
            res.json(tweets);
        }
    });
}

function getFeed(username, res) {
    console.log(`requesting ${username}`)
    db.data.get(`SELECT rowid FROM users WHERE username = '${username}'`, function(err, user) {
        console.log(`got ${user}`)
        if (err) {
            console.error("There was an error getting the feed");
        } else {
            if (user) {
                returnFeed(user.rowid, res);
            } else {
                // if user just registered, user is undefined, but they will have no follows = no feed
                res.json({});
            }
        }
    });
}

function returnFeed(userId, res) {
    db.data.all(`SELECT * FROM tweets WHERE (${userId}, senderId) IN followers\
                ORDER BY time LIMIT 10`, function (err, tweets) {
        if (err) {
            console.error("There was an error retrieving tweets: " + err);
        } else {
            res.json(tweets);
        }
    });
}

module.exports.getAll = getAll;
module.exports.getFeed = getFeed;
