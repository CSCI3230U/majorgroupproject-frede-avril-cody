const db = require('./database.js');


function addFollowerByName(req) {
    console.log(req)
    db.data.get(`SELECT rowid FROM users WHERE username = '${req.followed}'`, function(err, user) {
        if (err) {
            console.error(`There was an error while adding a follower: ${err}`);
        } else {
            if (user) {
                req.followed = user.rowid;
                addFollower(req);
            } else {
                console.error(`We got bad data from the client`);
            }
        }
    });
}

function addFollower(req) {
    db.data.get(`SELECT rowid FROM users WHERE username = '${req.follower}'`, function(err, user) {
        if (err) {
            console.error(`There was an error while adding a follower: ${err}`);
        } else {
            if (user) {
                insert(user.rowid, req.followed);
            } else {
                console.error(`We got bad data from the client`);
            }
        }
    });
}

function insert(follower, followed) {
    db.data.run('INSERT OR IGNORE INTO followers (followerId, followedId) VALUES (?, ?)',
                [follower, followed]);
}

module.exports.insert = insert;
module.exports.addFollower = addFollower;
module.exports.addFollowerByName = addFollowerByName;
