var express = require('express'); 
const football_controlers= require('../controllers/football'); 
var router = express.Router(); 
 
/* GET footballs */ 
router.get('/', football_controlers.football_view_all_Page ); 
module.exports = router; 