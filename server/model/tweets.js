const db = require('./database.js');

function getAll(res) {
    db.data.all('SELECT info, someNumber FROM lorem', function (err, tweets) {
        if (err) {
            console.error("There was an error retrieving data: " + err);
        } else {
            res.json(tweets)
        }
    });
}

module.exports.getAll = getAll;
