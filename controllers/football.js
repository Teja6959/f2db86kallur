var football = require('../models/football'); 
 
// List of all footballs 
exports.football_list = async function(req, res) { 
    try{ 
        thefootballs = await football.find(); 
        res.send(thefootballs); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
// for a specific football. 
exports.football_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: football detail: ' + req.params.id); 
}; 
 
// Handle football create on POST. 
exports.football_create_post = function(req, res) { 
    res.send('NOT IMPLEMENTED: football create POST'); 
}; 
 
// Handle football delete form on DELETE. 
exports.football_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: football delete DELETE ' + req.params.id); 
}; 
 
// Handle football update form on PUT. 
exports.football_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: football update PUT' + req.params.id); 
}; 

// VIEWS 
// Handle a show all view 
exports.football_view_all_Page = async function(req, res) { 
    try{ 
        thefootballs = await football.find();      
        console.log(thefootballs)  ; 
        res.render('Football', { title: 'football Search Results', results: thefootballs }); 
       // res.send(thefootballs); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
// Handle football create on POST. 
exports.football_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new football(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"costume_type":"goat", "cost":12, "size":"large"} 
    document.football_name = req.body.football_name; 
    document.football_size = req.body.football_size; 
    document.football_type = req.body.football_type; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 