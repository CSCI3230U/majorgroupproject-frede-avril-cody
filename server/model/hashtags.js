const db = require('./database.js');
const tweetHashtags = require('./tweet_hashtags.js');

/*  given an array of hashtags (that may contain dupes in the array), insert the
    hashtag into the table if it does not exist otherwise increment the count */
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
    });
}

module.exports.addHashtags = insert;
