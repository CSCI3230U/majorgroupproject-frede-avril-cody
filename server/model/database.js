const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/twitterClone.db');

db.serialize(function () {
  // db.run(`CREATE TABLE IF NOT EXISTS lorem (info TEXT,
  //                               someNumber TEXT)`)
  // var stmt = db.prepare('INSERT INTO lorem VALUES (?, ?)')
  //
  // for (var i = 0; i < 10; i++) {
  //   stmt.run('Ipsum ' + i, i)
  // }
  //
  // stmt.finalize()
  //
  // db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
  //   console.log(row.id + ': ' + row.info)
  // })
});

module.exports.data = db;
