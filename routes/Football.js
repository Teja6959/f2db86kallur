var express = require('express'); 
const football_controlers= require('../controllers/football'); 
var football = require('../models/football'); 
var router = express.Router(); 
// A little function to check if we have an authorized user and continue on 
// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
 
/* GET footballs */ 
router.get('/', football_controlers.football_view_all_Page ); 
router.get('/garrettCars/:id', football_controlers.football_detail);


router.put('/garrettCars/:id', football_controlers.football_update_put);
router.get('/detail', football_controlers.football_view_one_Page); 
/* GET create football page */ 
router.get('/create', football_controlers.football_create_Page); 
router.get('/delete', async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await football.findById(req.query.id) 
        res.render('footballdelete', { title: 'football Delete', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}); 
/* GET create update page */ 
router.get('/update', secured,football_controlers.football_update_Page);
 

 
module.exports = router; 