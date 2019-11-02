const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');


//configuracao
    //template
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    //Conexão com o BD
    //Banco de dados
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize('historicodeprevisoes', 'root', 'root',{
        host: "localhost",
        dialect: 'mysql'
        })

        sequelize.authenticate().then(function(){
            console.log("Conectado com sucesso!");
        }).catch(function(erro){
            console.log("Falha ao se conectar: "+erro);
        })

        const Historico = sequelize.define('historico', {
            Nome: {type: Sequelize.STRING},
            Temperatura: {type: Sequelize.FLOAT},
            Condicao: {type: Sequelize.STRING},
            Quantidade: {type: Sequelize.INTEGER}
        })
        //Historico.sync({force: true});

        function post(nome, temp, condicao){
            console.log("cheguei na post");
            Historico.create({
                Nome: nome,
                Temperatura: temp,
                Condicao: condicao,
                Quantidade: 1,
            });
        }
        exports.post = post;


    //Public  (css e js) 
    app.use(express.static(path.join(__dirname,"public")));
    
    //Rotas

        app.get('/principal', function(req, res){  
            res.render('principal');
        });

    //sempre no final    
    app.listen(8081, function() { 
        console.log("Server on");
    });