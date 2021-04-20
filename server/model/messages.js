const db = require('./database.js');

// given a new message (with usernames), get the rowids so we can insert into table
function newMessage(content, res) {
    const sender = content.sender;
    const receiver = content.receiver;
    const message = content.message;

    db.data.all(`SELECT rowid, username FROM users WHERE username = '${sender}'\
                OR\ username = '${receiver}'`, function(err, users) {
        if (err || users.length < 1) {
            console.error("There was an error finding the users for a message insert");
        } else if (users.length < 2) {
            insert(users[0].rowid, users[0].rowid, message, res);
        } else {
            const flag = users[0].username === sender;
            const senderId = flag ? users[0].rowid : users[1].rowid;
            const receiverId = flag ? users[1].rowid : users[0].rowid;

            insert(senderId, receiverId, message, res);
        }
    });
}
// part 2 of inserting a new message to the table
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
// given the rowids of the sender and receiver, send all the messages between them
function sendMessages(senderId, receiverId, res) {
    db.data.all(`SELECT * FROM messages WHERE (senderId, receiverId) IN (SELECT \
                '${senderId}', '${receiverId}' UNION SELECT '${receiverId}', \
                '${senderId}')`, function(err, messages) {
                    if (err) {
                        console.error("There was an error retrieving the messages");
                    } else {
                        res.json({id: senderId, messages: messages});
                    }
                });
}
// given the usernames of the sender and receiver, send all the messages between them
function getMessages(content, res) {
    const sender = content.sender;
    const receiver = content.receiver;

    db.data.all(`SELECT rowid, username FROM users WHERE username = '${sender}'\
                OR\ username = '${receiver}'`, function(err, users) {
        if (err) {
            console.error("There was an error finding the users for a messages request");
        } else if (users.length < 1) { // shouldn't happen unless modified client
            res.json({id: 0, messages: []});
        } else if (users.length < 2) { // user messages themself - can happen
            sendMessages(users[0].rowid, users[0].rowid, res);
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
