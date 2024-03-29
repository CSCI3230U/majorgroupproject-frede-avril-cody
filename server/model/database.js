// quotes from: https://blog.hubspot.com/sales/famous-quotes
const fakeTweets = ['Spread #love everywhere you go. Let no one ever come to you without leaving happier.', 'When you reach the end of your rope, tie a knot in it and hang on.', 'Always remember that you are absolutely #unique. Just like everyone else.', "Don't judge each day by the harvest you reap but by the seeds that you plant.", 'The #future belongs to those who believe in the beauty of their dreams.', 'Tell me and I forget. #Teach me and I remember. Involve me and I learn.', 'The best and most #beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', 'It is during our darkest moments that we must focus to see the light.', 'Whoever is #happy will make others happy too.', 'Do not go where the path may lead, go instead where there is no path and leave a trail.', "Don't judge each day by the harvest you reap but by the seeds that you plant.", 'Whoever is #happy will make others happy too.', 'Do not go where the path may lead, go instead where there is no path and leave a trail.', 'The greatest glory in living lies not in never falling, but in rising every time we fall.', "In the end, it's not the years in your life that count. It's the life in your years.", 'Never let the fear of striking out keep you from playing the game.', 'Life is either a daring #adventure or nothing at all.', "Many of life's #failures are people who did not realize how close they were to #success when they gave up.", 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.', 'If life were predictable it would cease to be life and be without flavor.', "In the end, it's not the years in your life that count. It's the life in your years.", '#Life is a succession of lessons which must be lived to be understood.', 'You will face many defeats in #life, but never let yourself be defeated.', '#Life is never fair, and perhaps it is a good thing for most of us that it is not.', 'The only impossible journey is the one you never begin.', 'In this #life we cannot do great things. We can only do small things with great #love.', 'Only a #life lived for others is a life worthwhile.', 'The purpose of our lives is to be happy.', "#Life is what happens when you're busy making other plans.", 'You only live once, but if you do it right, once is enough.', 'Live in the #sunshine, swim the sea, drink the wild air.', "Go confidently in the direction of your dreams! Live the #life you've imagined.", 'The greatest glory in living lies not in never falling, but in rising every time we fall.', 'Life is really simple, but we insist on making it complicated.', 'May you live all the days of your life.', 'Life itself is the most wonderful fairy tale.', 'Do not let making a living prevent you from making a life.', 'Life is ours to be spent, not to be saved.', "Keep smiling, because life is a beautiful thing and there's so much to smile about.", 'Life is a long lesson in humility.', "In three words I can sum up everything I've learned about #life: it goes on.", 'Love the #life you live. Live the life you #love.', '#Life is made of ever so many partings welded together.', "Your #time is limited, so don't waste it living someone else's #life. Don't be trapped by dogma -- which is living with the results of other people's thinking.", '#Life is trying things to see if they work.', '#Success is not final; #failure is not fatal: It is the #courage to continue that counts.', '#Success usually comes to those who are too busy to be looking for it.', 'The way to get started is to quit #talking and begin #doing.', 'If you really look closely, most overnight successes took a long time.', 'The secret of #success is to do the common thing uncommonly well.', 'I find that the harder I #work, the more #luck I seem to have.', "The real test is not whether you avoid this #failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you #learn from it; whether you choose to #persevere.", "Don't be distracted by criticism. Remember -- the only taste of #success some people get is to take a bite out of you.", 'I never #dreamed about #success, I #worked for it.', "#Success seems to be connected with #action. Successful people keep moving. They make mistakes but they don't #quit.", 'There are no secrets to #success. It is the result of #preparation, hard #work, and #learning from #failure.', 'The only limit to our realization of tomorrow will be our doubts of today.', 'It is better to #fail in originality than to #succeed in imitation.', "Successful people do what unsuccessful people are not willing to do. Don't wish it were easier; wish you were better.", 'The road to #success and the road to #failure are almost exactly the same.', 'I #failed my way to #success.', "If you set your goals ridiculously high and it's a #failure, you will #fail above everyone else's #success.", 'A #successful man is one who can lay a firm foundation with the bricks others have thrown at him.', 'Things work out best for those who make the best of how things work out.', 'Try not to become a man of #success. Rather become a man of #value.', "Don't be afraid to give up the good to go for the #great.", 'Always bear in mind that your own resolution to #success is more important than any other one thing.', '#Success is walking from #failure to failure with no loss of #enthusiasm.', 'You know you are on the road to #success if you would do your job and not be paid for it.', 'If you want to achieve #excellence, you can get there today. As of this second, quit doing less-than-excellent work.', "If you genuinely want something, don't wait for it -- #teach yourself to be impatient.", 'The only place where #success comes before #work is in the dictionary.', 'If you are not willing to #risk the usual, you will have to settle for the ordinary.', 'People who #succeed have momentum. The more they succeed, the more they want to succeed and the more they find a way to succeed. Similarly, when someone is #failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.', "You miss 100% of the shots you don't take.", "Whether you think you can or you think you can't, you're right.", "I have #learned over the years that when one's mind is made up, this diminishes fear.", 'I alone cannot change the world, but I can cast a stone across the water to create many ripples.', "Nothing is impossible, the word itself says, ‘I'm possible!'", "The question isn't who is going to let me; it's who is going to stop me.", 'The only person you are destined to become is the person you decide to be.', "Believe you can and you're halfway there.", "I've #learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", "#Winning isn't everything, but wanting to #win is.", 'You become what you #believe.', 'The most difficult thing is the decision to #act, the rest is merely #tenacity.', 'How wonderful it is that nobody need wait a single moment before starting to improve the world.', 'An unexamined #life is not worth living.', "Everything you've ever wanted is on the other side of #fear.", '#Dream big and dare to #fail.', "You may be disappointed if you #fail, but you are doomed if you don't try.", '#Life is 10% what happens to me and 90% of how I react to it.', 'It does not matter how slowly you go as long as you do not stop.', 'When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.', 'Too many of us are not #living our dreams because we are living our fears.', "I didn't #fail the test. I just found 100 ways to do it wrong.", "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.", 'I attribute my #success to this: I never gave or took any excuse.', 'I would rather die of passion than of boredom.', "If you look at what you have in #life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", 'Dreaming, after all, is a form of planning.', 'Whatever the mind of man can conceive and #believe, it can #achieve.', 'First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.', "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So, throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. #Explore, #Dream, #Discover."]

// credit: https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

shuffleArray(fakeTweets);

// imports
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const tweets = require('./tweets.js');
const bcrypt = require('bcrypt');

// initialize with fake data
db.serialize(async function() {
    // they don't exist but in case a file is used in the future
    db  .run("DROP TABLE IF EXISTS hashtags")
        .run("DROP TABLE IF EXISTS tweets")
        .run("DROP TABLE IF EXISTS tweetHashtags")
        .run("DROP TABLE IF EXISTS users")
        .run("DROP TABLE IF EXISTS followers")
        .run("DROP TABLE IF EXISTS messages")

    // create tables
    db  .run(`CREATE TABLE IF NOT EXISTS tweets (
                                        time DATETIME DEFAULT CURRENT_TIMESTAMP,
                                        senderId INTEGER NOT NULL,
                                        sender TEXT NOT NULL,
                                        likes INTEGER DEFAULT 0,
                                        replyTo INTEGER,
                                        nextReply INTEGER,
                                        message TEXT NOT NULL)`)
        .run(`CREATE TABLE IF NOT EXISTS hashtags (
                                        frequency INTEGER DEFAULT 1,
                                        hashtag TEXT NOT NULL UNIQUE)`)
        .run(`CREATE TABLE IF NOT EXISTS tweetHashtags (
                                        hashtag TEXT NOT NULL,
                                        tweetId INTEGER NOT NULL,
                                        PRIMARY KEY (hashtag, tweetId),
                                        FOREIGN KEY (hashtag) REFERENCES hashtags(hashtag),
                                        FOREIGN KEY (tweetId) REFERENCES tweets(rowid))`)
        .run(`CREATE TABLE IF NOT EXISTS users (
                                        username TEXT NOT NULL UNIQUE,
                                        password TEXT NOT NULL,
                                        handle TEXT NOT NULL UNIQUE,
                                        email TEXT NOT NULL)`)
        .run(`CREATE TABLE IF NOT EXISTS followers (
                                        followerId INTEGER NOT NULL,
                                        followedId INTEGER NOT NULL,
                                        PRIMARY KEY (followerId, followedId),
                                        FOREIGN KEY (followerId) REFERENCES users(rowid),
                                        FOREIGN KEY (followedId) REFERENCES users(rowid))`)
        .run(`CREATE TABLE IF NOT EXISTS messages (
                                        senderId INTEGER NOT NULL,
                                        receiverId INTEGER NOT NULL,
                                        time DATETIME DEFAULT CURRENT_TIMESTAMP,
                                        message TEXT,
                                        FOREIGN KEY (senderId) REFERENCES users(rowid),
                                        FOREIGN KEY (receiverId) REFERENCES users(rowid))`);

    // create fake users
    const users = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?)');

    const profs = ["Randy", "Lennart", "Mariana", "Mehran", "Paula", "Ilona",
                    "Ken", "Mihai", "Joe", "Rupinder"];
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("apple", salt);
    for (let i = 0; i < profs.length; i++) {
        users.run(profs[i], password, `@${profs[i].toLowerCase()}`, `${profs[i].toLowerCase()}@otu.net`);
    }

    users.finalize();

    // have each fake user send a fake tweet, time in between tweets is 2 seconds
    fakeTweets.forEach(function(tweet, i) {
        let senderIndex = Math.floor(Math.random() * profs.length);
        let senderUsername = profs[senderIndex];
        db.get(`SELECT rowid, handle FROM users WHERE username = '${senderUsername}'`, (err, user) => {
            if (err) {
                console.error(err.message);
            } else {
                setTimeout(function() {
                    tweets.insert(tweet, user.rowid, user.handle);
                }, i*2000);
            }
        });
    });
});

// export db
module.exports.data = db;
