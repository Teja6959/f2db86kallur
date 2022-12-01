var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var football_controller = require('../controllers/football'); 
 
/// API ROUTE /// 
 
// GET resources base. 
router.get('/', api_controller.api); 
 
/// football ROUTES /// 
 
// POST request for creating a football.  
router.post('/footballs', football_controller.football_create_post); 
 
// DELETE request to delete football. 
router.delete('/footballs/:id', football_controller.football_delete); 
 
// PUT request to update football. 
router.put('/footballs/:id', football_controller.football_update_put); 
 
// GET request for one football. 
router.get('/footballs/:id', football_controller.football_detail); 
 
// GET request for list of all football items. 
router.get('/footballs', football_controller.football_list); 
 
module.exports = router;