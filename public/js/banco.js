const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "previsao",
  password: "previsao",
  database: "previsao",
});

con.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
  })

function createTable(conn){
 
      const sql = "CREATE TABLE IF NOT EXISTS Consultas (\n"+
                  "ID int NOT NULL AUTO_INCREMENT,\n"+
                  "Nome varchar(150) NOT NULL,\n"+
                  "Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n"+
                  "PRIMARY KEY (ID)\n"+
                  ");";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('criou a tabela!');
      });
}