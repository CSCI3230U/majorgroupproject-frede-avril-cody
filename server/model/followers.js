const db = require('./database.js');

// given usernames, insert a row in the followers table
function addFollowerByName(req) {
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
// pt 2 of above, can be called directly if req.followed is already a users rowid
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
// pt 3 of above, can be called directly if both rowids are already known
// will delete the row if it exists, else will insert a new row (unfollow/follow)
function insert(follower, followed) {
    db.data.get(`SELECT * FROM followers WHERE (followerId, followedId) IN \
                (SELECT '${follower}', '${followed}')`, function(err, row) {
                    if (err) {
                        console.error(err);
                    } else if (!row) {
                        db.data.run(`INSERT INTO followers (followerId, followedId) \
                                    VALUES (?, ?)`, [follower, followed]);
                    } else {
                        db.data.run(`DELETE FROM followers WHERE (followerId, \
                                    followedId) IN (SELECT '${follower}', '${followed}')`);
                    }
    });
}

// exports
module.exports.insert = insert;
module.exports.addFollower = addFollower;
module.exports.addFollowerByName = addFollowerByName;
