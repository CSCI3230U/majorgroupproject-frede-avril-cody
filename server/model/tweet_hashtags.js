const db = require('./database.js');

function insert(hashtag, tweetId) {
    db.data.run(`INSERT INTO tweetHashtags (hashtag, tweetId) VALUES (?, ?)`,
                [hashtag, tweetId], function(err) {
                    if (err) {
                        console.err("Error inserting into tweetHashtags");
                    } else {
                        // Do nothing
                    }
                });
}

function findTweets(hashtag, res) {
    db.data.all(`SELECT tweetId FROM tweetHashtags WHERE hashtag LIKE '%${hashtag}%'`,
        function(err, tweets) {
            if (err) {
                console.error("There was an error finding the tweets with the hashtag");
                return [];
            } else {
                returnTweets(tweets.map(t => t.tweetId), res);
            }
        });
}

function returnTweets(tweets, res) {
    const sqlArray = `(${tweets.join(',')})`;
    db.data.all(`SELECT * FROM tweets WHERE rowid IN ${sqlArray}`, function(err, matches) {
        if (err) {
            console.error("There was an error getting tweets (tweet_hashtags)");
        } else {
            res.json(matches);
        }
    });
}

// function printAll() {
//     db.data.all(`SELECT * FROM tweetHashtags`, function(err, all) {
//         console.log(all)
//     })
// }


module.exports.addTweet = insert;
module.exports.findTweets = findTweets;
