const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');

//configuracao
    //template
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
        //bodyparser
        app.use(bodyparser.urlencoded({extended: false}));
        app.use(bodyparser.json());
    //BD
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
        const historico = sequelize.define('historico', {
            Nome: {type: Sequelize.STRING},
            Temperatura: {type: Sequelize.FLOAT},
            Condicao: {type: Sequelize.STRING},
            Quantidade: {type: Sequelize.INTEGER}
        })
        
        module.exports = {
            Sequelize: Sequelize,
            sequelize: sequelize,
            historico
        }
        //historico.sync({force: true});

    //Public  (css e js) 
    app.use(express.static(path.join(__dirname,"public")));
    
    //Rotas
    
        app.get('/principal', function(req, res){ 
            historico.findAll({
                order: [['createdAt', 'DESC']]
            }).then(function(cidades){
                res.render('principal', {cidades :cidades});
            })
        });
        app.post('/', function(req, res){
            
            var qtd = 1;
            historico.count({
                where: {
                    Nome: "'"+req.body.Nome+"'"
                }}).then(function(count){
                    qtd += count;
                })
            historico.create({                
                Nome: req.body.Nome,
                Temperatura: req.body.Temperatura,
                Condicao: req.body.Condicao,
                Quantidade: qtd,
            })
            res.render('principal');

        })
    //sempre no final    
    app.listen(8081, function() { 
        console.log("Server on");
    });