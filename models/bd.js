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
    
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}