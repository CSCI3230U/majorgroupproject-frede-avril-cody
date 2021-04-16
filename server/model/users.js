const db = require('./database.js');

function handleLogin(session, req, res) {
    db.data.get(`SELECT username, handle FROM users WHERE username = '${req.username}'
                AND password = '${req.password}'`, function (err, user) {
        if (err) {
            console.error("There was an error retrieving data: " + err);
        } else {
            if (user) {
                session.username = user.username;
                user.authenticated = true;
                res.json(user)
            } else {
                res.json({authenticated: false});
            }
        }
    });
}

function findFollowRecommendations(session, req, res) {
    const thisUser = req.username;
        // const numProfiles = req.profiles;

    db.data.get(`SELECT rowid FROM users WHERE username = '${thisUser}'`, function(err, user) {
        if (err) {
            console.error("Couldn't get the rowid for follow recs");
        } else {
            if (user.rowid) {
                retrieveRandomProfiles(user.rowid, req.profiles, res);
            } else {
                console.error("That user wasn't found (follow recs)");
                return;
            }
        }
    });
    // .all(`SELECT rowid, username, handle FROM users ORDER BY RANDOM() LIMIT ${numProfiles}`, function(err, users) {
    //     console.log(rowid);
    //     if (err) {
    //         console.error("Error retrieving users to recommend");
    //     } else {
    //         const data = [];
    //         users.forEach(function(user) {
    //             data.push(user);
    //         });
    //         console.log("sending follow recommendations");
    //         console.log(data);
    //         res.json(data);
    //     }
    // });
}

function retrieveRandomProfiles(userId, numProfiles, res) {
    db.data.all(`SELECT rowid, username, handle FROM users WHERE (${userId}, \
                rowid) NOT IN followers ORDER BY RANDOM() LIMIT ${numProfiles}`,
                 function(err, users) {
        if (err) {
            console.error("Error retrieving users to recommend");
            console.error(err)
        } else {
            const data = [];
            users.forEach(function(user) {
                if (user.rowid != userId) {
                    data.push(user);
                }
            });
            res.json(data);
        }
    });
}

module.exports.login = handleLogin;
module.exports.getFollowRecommendations = findFollowRecommendations;
