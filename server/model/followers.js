const db = require('./database.js');

function addFollower(session, req) {
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

function follows() {

}

function insert(follower, followed) {
    db.data.run('INSERT INTO followers (followerId, followedId) VALUES (?, ?)',
                [follower, followed]);
}

module.exports.addFollower = addFollower;
