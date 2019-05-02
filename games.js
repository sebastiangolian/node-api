var express = require('express')
var router = express.Router();

const games = [
  {id: 1, title: 'FIFA', price: 100},
  {id: 2, title: 'PES', price: 150},
  {id: 3, title: 'WOT', price: 0},
];

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundGames = games.filter(
      (game) => game.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundGames);
  }
  return res.status(200).json(games);
});

router.post('/', (req, res) => {
  let game = req.body;
  let foundGame = games.find(each => each.id === game.id);
  if (foundGame) {
    return res.status(400).json({msg: 'Game with id ' + game.id + ' already exists'});
  }
  games.push(game);
  return res.status(200).json({msg: 'Game with id ' + game.id + ' successfully created'});
});

router.patch('/:id', (req, res) => {
  let gameCode = req.params.id;
  let foundGame = games.find(each => each.id === gameCode);
  if (foundGame) {
    foundGame.favorite = req.body.favorite;
    let msg = 'Game with id ' + gameCode + ' is now ';
    msg += foundGame.favorite ? ' favorited.' : ' unfavorited';
    return res.status(200).json({msg: msg});
  }
  return res.status(400).json({msg: 'Game with id ' + gameCode + ' not found!'});
});

module.exports = router;