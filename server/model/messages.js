const db = require('./database.js');

function newMessage(content, res) {
    const sender = content.sender;
    const receiver = content.receiver;
    const message = content.message;
    console.log(sender);
    console.log(receiver);
    console.log(message);

    // {message: "FakeMessage2", time: "2020-02-02", sender: true} array of this

}

function insert(senderId, receiverId, message) {
    db.data.run(`INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)`,
                [senderId, receiverId, message]);
}

module.exports.saveMessage = newMessage;
