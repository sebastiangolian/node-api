var express = require('express')
var router = express.Router();

const games = [
  {id: 1, title: 'FIFA', price: 100},
  {id: 2, title: 'PES', price: 150},
  {id: 3, title: 'WOT', price: 0},
];

// GET http://localhost:3000/api/games
router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundGames = games.filter(
      (game) => game.name.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundGames);
  }
  return res.status(200).json(games);
});

// GET http://localhost:3000/api/games/1
router.get('/:id', (req, res) => {
  let gameCode = req.params.id;
  let foundGame = games.find(each => each.id == gameCode);
  if (foundGame) {
    return res.status(200).json(foundGame);
  }
  return res.status(400).json({msg: 'Game with id ' + gameCode + ' not found!'});
});

// POST http://localhost:3000/api/games {"id":4,"title":"Unreal","price":100}   Content-Type: application/json
router.post('/', (req, res) => {
  let game = req.body;
  let foundGame = games.find(each => each.id == game.id);
  if (foundGame) {
    return res.status(400).json({msg: 'Game with id ' + game.id + ' already exists'});
  }
  games.push(game);
  return res.status(200).json({msg: 'Game with id ' + game.id + ' successfully created'});
});

// PATCH http://localhost:3000/api/games/1 {"id":1,"title":"FIFA 2019","price":100}   Content-Type: application/json
router.patch('/:id', (req, res) => {
  let gameId = req.params.id;
  let index = games.findIndex(game => game.id == gameId);
  if (index > -1) {
    games[index] = req.body;
    return res.status(200).json({msg: 'Game with id ' + gameId + ' is updated!'});
  }
  return res.status(400).json({msg: 'Game with id ' + gameId + ' not found!'});
});

// DELETE http://localhost:3000/api/games/1 
router.delete('/:id', (req, res) => {
  let gameId = req.params.id;
  let index = games.findIndex(game => game.id == gameId);
  if (index > -1) {
    games.splice(index,1);
    return res.status(200).json({msg: 'Game with id ' + gameId + ' is deleted!'});
  }
  return res.status(400).json({msg: 'Game with id ' + gameId + ' not found!'});
});

module.exports = router;