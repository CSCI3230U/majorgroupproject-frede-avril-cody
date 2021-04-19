const db = require('./database.js');

function newMessage(content, res) {
    const sender = content.sender;
    const receiver = content.receiver;
    const message = content.message;

    db.data.all(`SELECT rowid, username FROM users WHERE username = '${sender}'\
                OR\ username = '${receiver}'`, function(err, users) {
                    if (err || users.length < 2) {
                        console.error("There was an error finding the users for a message insert");
                    } else {
                        const flag = users[0].username === sender;
                        const senderId = flag ? users[0].rowid : users[1].rowid;
                        const receiverId = flag ? users[1].rowid : users[0].rowid;

                        insert(senderId, receiverId, message, res);
                    }
                });

    // {message: "FakeMessage2", time: "2020-02-02", sender: true} array of this

}

function insert(senderId, receiverId, message, res) {
    db.data.run(`INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)`,
                [senderId, receiverId, message], function(err) {
                    if (err) {
                        console.error("There was an error inserting the message");
                    } else {
                        sendMessages(senderId, receiverId, res);
                    }
                });
}

function sendMessages(senderId, receiverId, res) {
    db.data.all(`SELECT * FROM messages WHERE (senderId, receiverId) IN (SELECT \
                '${senderId}', '${receiverId}' UNION SELECT '${receiverId}', \
                '${senderId}')`, function(err, messages) {
                    if (err) {
                        console.error("There was an error retrieving the messages");
                    } else {
                        console.log(messages);
                        res.json(messages);
                    }
                });
}

function getMessages(content, res) {
    const sender = content.sender;
    const receiver = content.receiver;

    db.data.all(`SELECT rowid, username FROM users WHERE username = '${sender}'\
                OR\ username = '${receiver}'`, function(err, users) {
                    if (err || users.length < 2) {
                        console.error("There was an error finding the users for a messages request");
                    } else {
                        const flag = users[0].username === sender;
                        const senderId = flag ? users[0].rowid : users[1].rowid;
                        const receiverId = flag ? users[1].rowid : users[0].rowid;

                        sendMessages(senderId, receiverId, res);
                    }
                });
}

module.exports.saveMessage = newMessage;
module.exports.getMessages = getMessages;
