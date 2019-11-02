const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');
const Post = require('./models/Post')

//configuracao
    //template
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
        //bodyparser
        app.use(bodyparser.urlencoded({extended: false}));
        app.use(bodyparser.json());
        

    //Public  (css e js) 
    app.use(express.static(path.join(__dirname,"public")));
    
    //Rotas

        app.get('/principal', function(req, res){  
            res.render('principal');
        });
        app.post('/add', function(req, res){
            Post.create({
                Nome: req.body.formNome,
                Temperatura: req.body.formTemp,
                Condicao: req.body.formClima,
                Quantidade: 1,
            }).then(function(){
                res.send('Post criado');
            }).catch(function(erro){
                res.send('houve um erro'+ erro);
            })
        });


    //sempre no final    
    app.listen(8081, function() { 
        console.log("Server on");
    });