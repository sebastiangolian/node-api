const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser());
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));
app.use('/api/games', require('./resources/games'));

app.listen(3000, () => {
    console.log('home: http://localhost:3000');
    console.log('api/games: http://localhost:3000/api/games');
    console.log('api/fail: http://localhost:3000/api/fail');
});