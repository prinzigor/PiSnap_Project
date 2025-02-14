var five = require('johnny-five');
var Raspi = require('raspi-io').RaspiIO;
var board = new five.Board({
  io: new Raspi()
});

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to GPIO');
});

router.get('/read/:pinno', function(req, res, next) {
  console.log('GPIO READ');
  pinno = Number(req.params.pinno);
  readfn(pinno, res);
  console.log('end router');
});

var readfn = function(pinno, res) {
  pin = new five.Pin(''+pinno);
  pin.query(function(state){
    value=(state.value === true)?'true':'false';
    console.log(value);
    res.send(''+value);
  });
}

router.get('/write/:pinno/:value', function(req, res, next) { 
  pinno = Number(req.params.pinno);
  value=(req.params.value.toString().trim() === 'HIGH')?1:0;
  writefn(pinno, value, res);
});

var writefn = function(pinno, value, res) {
  var pin = new five.Pin(''+pinno);
  five.Pin.write(pin, value);
  res.send('');
}

module.exports = router;
