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
            Temperatura: {type: Sequelize.INTEGER},
            Condicao: {type: Sequelize.STRING},
            Tempo: {type: Sequelize.DATE}
        })
        Historico.sync({force: true});

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