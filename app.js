const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');


//configuracao
    //template
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    //Conexão com o BD
    
    //Public  sem BS 
    app.use(express.static(path.join(__dirname,"public")));
//Rotas

    app.get('/principal', function(req, res){  
        res.render('principal');
    });




app.listen(8081, function() { 
    console.log("Server on");
 });