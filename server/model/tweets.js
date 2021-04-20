const db = require('./database.js');
const tags = require('./hashtags.js');

// Get all the tweets. Easy. No callback hell.
function getAll(res) {
    db.data.all('SELECT * FROM tweets', function (err, tweets) {
        if (err) {
            console.error("There was an error retrieving data: " + err);
        } else {
            res.json(tweets);
        }
    });
}
// given a username, get their feed based on their followers pt1
function getFeed(username, res) {
    db.data.get(`SELECT rowid FROM users WHERE username = '${username}'`, function(err, user) {
        if (err) {
            console.error("There was an error getting the feed");
        } else {
            if (user) {
                returnFeed(user.rowid, res);
            } else {
                // if user just registered, user is undefined, but they will have no follows = no feed
                res.json([]);
            }
        }
    });
}
// given a username, get their feed based on their followers pt2
function returnFeed(userId, res) {
    db.data.all(`SELECT rowid, * FROM (SELECT rowid, * FROM tweets WHERE (${userId}, senderId) IN followers\
                ORDER BY time DESC LIMIT 30) ORDER BY time ASC`, function (err, tweets) {
        if (err) {
            console.error("There was an error retrieving tweets: " + err);
        } else {
            res.json(tweets);
        }
    });
}
// insert a new tweet into the database, and call the hashtag handler for any hashtags
function insert(content, userId, username) {
    const hashtagRegex = new RegExp(/(\s#|^#)[a-zA-z0-9]+/g);
    const hashtags = Array.from(content.matchAll(hashtagRegex), r => r[0].trim().toLowerCase());

    db.data.run(`INSERT INTO tweets (senderId, sender, message) VALUES (?, ?, ?)`,
        [userId, username, content], function (err) {
            if (err) {
                console.error("There was an error inserting a tweet into the db");
            } else {
                const tweetId = this.lastID;
                tags.addHashtags(hashtags, tweetId);
            }
        });
}
// prep for function above
function tweet(req) {
    const username = req.username;
    const content = req.content;
    if (!content || content.length > 140) {
        return;
    }
    db.data.get(`SELECT rowid FROM users WHERE username = '${username}'`, function(err, user) {
        if (err || !user) {
            console.error("The sender wasn't found in the database");
        } else {
            insert(content, user.rowid, username);
        }
    });
}
// get the 5 users who have sent the most tweets
function getMostTweeted(res) {
    db.data.all(`SELECT sender, COUNT(message) FROM tweets GROUP BY senderId\
                ORDER BY COUNT(message) DESC LIMIT 5`, function(err, users) {
        if (err) {
            console.error("There was an error getting data for the analytics page");
        } else {
            res.json(users);
        }
    })
}
// get the 5 users who have earned the most likes
function getMostLiked(res) {
    db.data.all(`SELECT sender, SUM(likes) FROM tweets GROUP BY senderId\
                ORDER BY SUM(likes) DESC LIMIT 5`, function(err, users) {
        if (err) {
            console.error("There was an error getting data for the analytics page");
        } else {
            res.json(users);
        }
    });
}
// add a like to the tweet
function like(req) {
    db.data.run(`UPDATE tweets SET likes=likes + 1 WHERE rowid = ${req.tweetid}`,
        function(err) {
            if (err) {
                console.error("Error updating the number of likes");
            }
        });
}

module.exports.tweet = tweet;
module.exports.like = like;
module.exports.getAll = getAll;
module.exports.getFeed = getFeed;
module.exports.getMostTweeted = getMostTweeted;
module.exports.getMostLiked = getMostLiked;
module.exports.insert = insert;
