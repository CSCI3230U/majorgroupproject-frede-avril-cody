const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/twitterClone.db');

db.serialize(function () {
    db  .run("DROP TABLE IF EXISTS hashtags")
        .run("DROP TABLE IF EXISTS tweets")
        .run("DROP TABLE IF EXISTS tweetHashtags")
        .run("DROP TABLE IF EXISTS users")
        .run("DROP TABLE IF EXISTS followers")
        .run("DROP TABLE IF EXISTS totallyDoesnt");

    db  .run(`CREATE TABLE IF NOT EXISTS tweets (
                                        time DATETIME DEFAULT CURRENT_TIMESTAMP,
                                        sender TEXT NOT NULL,
                                        likes INTEGER DEFAULT 0,
                                        replyTo INTEGER,
                                        nextReply INTEGER,
                                        message TEXT NOT NULL)`)
        .run(`CREATE TABLE IF NOT EXISTS hashtags (
                                        frequency INTEGER DEFAULT 0,
                                        hashtag TEXT NOT NULL UNIQUE)`)
        .run(`CREATE TABLE IF NOT EXISTS tweetHashtags (
                                        hashtagId INTEGER NOT NULL,
                                        tweetId INTEGER NOT NULL,
                                        PRIMARY KEY (hashtagId, tweetId),
                                        FOREIGN KEY (hashtagId) REFERENCES hashtags(rowid),
                                        FOREIGN KEY (tweetId) REFERENCES tweets(rowid))`)
        .run(`CREATE TABLE IF NOT EXISTS users (
                                        username TEXT NOT NULL UNIQUE,
                                        password TEXT NOT NULL,
                                        handle TEXT NOT NULL UNIQUE,
                                        email TEXT NOT NULL)`)
        .run(`CREATE TABLE IF NOT EXISTS followers (
                                        followerId INTEGER NOT NULL,
                                        followedId INTEGER NOT NULL,
                                        PRIMARY KEY (followerId, followedId),
                                        FOREIGN KEY (followerId) REFERENCES users(rowid),
                                        FOREIGN KEY (followedId) REFERENCES users(rowid))`);

    const users = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?)');
    const tweets = db.prepare('INSERT INTO tweets (sender, message) VALUES (?, ?)');
    const hashtags = db.prepare('INSERT INTO hashtags (hashtag) VALUES (?)');
    const tweetHashtags = db.prepare('INSERT INTO tweetHashtags (hashtagId, tweetId) VALUES (?, ?)');
    const followers = db.prepare('INSERT INTO followers (followerId, followedId) VALUES (?, ?)');

    const profs = ["Randy", "Lennart", "Mariana", "Mehran", "Paula", "Ilona",
                    "Ken", "Mihai", "Joe", "Rupinder"];
    for (let i = 0; i < profs.length; i++) {
        users.run(profs[i], "apple", profs[i].toLowerCase(), profs[i].toLowerCase() + "@otu.net");
    }

    users.finalize();

    for (let i = 0; i < 10; i++) {
        let senderIndex = Math.floor(Math.random() * 10);
        let senderUsername = profs[senderIndex];
        db.get(`SELECT rowid FROM users WHERE username = '${senderUsername}'`, (err, user) => {
            if (err) {
                console.error(err.message);
            } else {
                tweets.run(user.rowid, "This is message " + i);
            }
        });
    }
    setTimeout(function() {
        tweets.finalize();

    }, 500);

    hashtags.run("testing");
    hashtags.run("twitter");
    hashtags.run("sqlite3");
    hashtags.finalize();
    tweetHashtags.finalize();
    followers.finalize();

    db.each('SELECT * FROM tweets', function (err, row) {
        console.log(row);
    });
    db.each('SELECT * FROM users', function (err, row) {
        console.log(row);
    });
    db.each('SELECT * FROM hashtags', function (err, row) {
        console.log(row);
    });
});

module.exports.data = db;
