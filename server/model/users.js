const db = require('./database.js');
const emailValidator = require('validator');
const bcrypt = require('bcrypt');

function handleLogin(session, req, res) {
    db.data.get(`SELECT username, handle, password FROM users WHERE username\
                = '${req.username}'`, async function (err, user) {
        if (err) {
            console.error("There was an error retrieving data: " + err);
        } else {
            if (user) {
                const authenticated = await bcrypt.compare(req.password, user.password);
                if (authenticated) {
                    session.username = user.username;
                    delete user.password;
                    user.authenticated = true;
                    res.json(user);
                } else {
                    res.json({authenticated: false});
                }
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
            if (user) {
                if (user.rowid) {
                    retrieveRandomProfiles(user.rowid, req.profiles, res);
                } else {
                    console.error("That user wasn't found (follow recs)");
                    return;
                }
            } else {
                res.json([]);
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

function verifyUniqueIdentifier(req, res) {
    let type = '';
    let identifier = '';
    if (req.username) {
        type = 'username';
        identifier = req.username;
    } else if (req.handle) {
        type = 'handle';
        identifier = `@${req.handle}`;
    } else {
        /*  this entire routine is for client convenience, we are not concerned
            with the case where a modified client sends nonsense requests
            Our concern is to not query a non-existent column in our table */
        res.json({unique: true});
        return;
    }

    db.data.get(`SELECT rowid FROM users WHERE ${type} =\
                '${identifier}'`, function(err, user) {
        if (user) {
            res.json({unique: false});
        } else {
            res.json({unique: true});
        }
    });
}

function validPassword(password) {
    return password.length > 3 && password.search(/\d/) !== -1 && password.search(/[a-zA-z]/) !== -1;
}

function registerNewUser(session, req, res) {
    const username = req.username;
    const password = req.password;
    let handle = req.handle;
    const email = req.email;

    if (!valid(username)) {
        res.json(denyRegistration("Invalid username"));
        return;
    } else if (!validPassword(password)) {
        res.json(denyRegistration("Invalid password"));
        return;
    } else if (!valid(handle)) {
        res.json(denyRegistration("Invalid handle"));
        return;
    } else if (!emailValidator.isEmail(email)) {
        res.json(denyRegistration("Invalid email"));
        return;
    }

    handle = `@${handle}`;
    // TODO have people follow themselves - simplifies application logic considerably
    // eg for FollowRecommendations and Feed

    db.data.all(`SELECT username FROM users WHERE username = '${username}' OR\
                    handle = '${handle}'`, async function(err, users) {
        if (err) {
            console.error("Error retrieving users for registration validation");
        } else {
            if (users.length > 0) {
                if (users[0].username == username) {
                    res.json(denyRegistration("That username is already taken!"));
                } else {
                    res.json(denyRegistration("That handle is already in use."));
                }
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                db.data.run(`INSERT INTO users VALUES (?, ?, ?, ?)`,
                            [username, hashedPassword, handle, email]);
                res.json({registered: true, username: username, handle: handle,
                    message: "Registration success!"});
            }
        }
        // db.data.all()
    });
}

module.exports.verifyUnique = verifyUniqueIdentifier;
module.exports.login = handleLogin;
module.exports.register = registerNewUser;
module.exports.getFollowRecommendations = findFollowRecommendations;
