const db = require('./database.js');
const tweetHashtags = require('./tweet_hashtags.js');

function insert(hashtags, tweetId) {
    [...new Set(hashtags)].forEach(hashtag => {
        db.data.run(`INSERT INTO hashtags (hashtag) VALUES ('${hashtag}') ON \
                    CONFLICT (hashtag) DO UPDATE SET frequency=frequency + 1`, function(err) {
                if (err) {
                    console.error("There was an error updating the hashtags");
                } else {
                    tweetHashtags.addTweet(hashtag, tweetId);
                }
            });
    })
}

function printHashtags() {
    db.data.all(`SELECT * FROM hashtags`, function(err, tags) {
        console.log(tags);
    })
}

module.exports.addHashtags = insert;
