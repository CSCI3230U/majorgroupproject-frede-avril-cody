const db = require('./database.js');

function handleLogin(session, req, res) {
    db.data.get(`SELECT handle FROM users WHERE username = '${req.username}'
                AND password = '${req.password}'`, function (err, user) {
        if (err) {
            console.error("There was an error retrieving data: " + err);
        } else {
            if (user) {
                session.username = req.username;
                user.authenticated = true;
                res.json(user)
            } else {
                res.json({authenticated: false});
            }
        }
    });
}

module.exports.login = handleLogin;
