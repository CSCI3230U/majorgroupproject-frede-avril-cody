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

function denyRegistration(message) {
    return {registered: false, message: message};
}

function valid(identifier) {
    const validator = new RegExp(/^[a-zA-Z0-9]+$/);
    return validator.test(identifier);
}

function registerNewUser(session, req, res) {
    const username = req.username;
    const password = req.password;
    const handle = req.handle;
    const email = req.email;

    if (!valid(username)) {
        res.json(denyRegistration("Invalid username"));
        return;
    } else if (!valid(handle)) {
        res.json(denyRegistration("Invalid handle"));
        return;
    }

    db.data.all(`SELECT * FROM users WHERE username = '${username}' OR\
                    handle = '${handle}'`, function(err, users) {
        if (err) {
            console.error("Error retrieving users for registration validation");
        } else {
            if (users.length > 0) {
                console.log("found a match");
            } else {
                console.log("inserted"); // NEED TO APPEND @
            }
        }
        res.json({registered: false, message: "in dev"});
        // db.data.all(`INSERT INTO users VALUES (?, ?, ?, ?)`, [])
    });
}

module.exports.login = handleLogin;
module.exports.register = registerNewUser;
module.exports.getFollowRecommendations = findFollowRecommendations;
