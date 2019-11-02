const db = require('./bd');

const Post = db.sequelize.define('historico', {
    Nome: {type: db.Sequelize.STRING},
    Temperatura: {type: db.Sequelize.FLOAT},
    Condicao: {type: db.Sequelize.STRING},
    Quantidade: {type: db.Sequelize.INTEGER}
})
//Post.sync({force: true});

module.exports = Post