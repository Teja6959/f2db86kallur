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
exports.football_detail  = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await football.findById(req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
 
// Handle football create on POST. 
exports.football_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new football(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"football_type":"goat", "cost":12, "size":"large"} 
    document.football_name = req.body.football_name; 
    document.football_type = req.body.football_type; 
    document.football_size = req.body.football_size; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

 
// Handle football delete form on DELETE. 
// Handle football delete on DELETE. 
exports.football_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await football.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
};  
 
// Handle football update form on PUT. 
exports.football_update_put = async function(req, res) {

    console.log(`update on id ${req.params.id} with body

${JSON.stringify(req.body)}`)

    try {

        let toUpdate = await football.findById(req.params.id)
        console.log(toUpdate);

        // Do updates of properties

        if(req.body.football_name) toUpdate.football_name = req.body.football_name;

        if(req.body.football_size) toUpdate.football_size = req.body.football_size;

        if(req.body.football_type) toUpdate.football_type = req.body.football_type;

       

        let result = await toUpdate.save();

        console.log("Sucess " + result)

        res.send(result)

    } catch (err) {

        res.status(500)

        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);

    }

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
// Handle a show one view with id specified by query 
exports.football_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await football.findById( req.query.id) 
        res.render('footballdetail',  
{ title: 'football Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

 // Handle building the view for creating a football. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.football_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('footballcreate', { title: 'football Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

exports.football_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await football.findById(req.query.id) 
        res.render('footballdelete', { title: 'football Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a football. 
// query provides the id 
exports.football_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await football.findById(req.query.id) 
        res.render('footballupdate', { title: 'football Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 