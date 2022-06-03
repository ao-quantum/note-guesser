const express = require("express");
const session = require('express-session');
const app = express();

const freqs = require('./frequencies.json');

app.use(express.static("public"));
app.use(session({
    secret: 'pitch',
    cookie: {
        maxAge: 600_000,
    },
    saveUninitialized: false,
    resave: false,
}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/new', (req, res) => {
    const keys = Object.keys(freqs);
    const key = keys[Math.floor(Math.random() * keys.length)];

    const octave = Math.floor(Math.random() * freqs[key].length);
    const frequency = freqs[key][octave];

    req.session.ans = {
        key,
        octave,
        frequency
    };

    res.redirect('/quiz', 302);
});

app.get('/quiz', (req, res) => {
    if (!req.session.ans) {
        res.redirect('/', 302);
        return;
    }

    res.render('quiz')
});

app.get('/quizInfo', (req, res) => {
    return res.json(req.session?.ans);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
