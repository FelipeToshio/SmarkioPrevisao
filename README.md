SmarkioPrevisao
npm install
baixar o BD
1) https://dev.mysql.com/downloads/mysql/
2) server only -> developement computer 
3) dados do BD - Nesse ponto você so define a senha, mas segue todos os dados:- localhost user: root senha: root 
4) Configurar a variavel de ambiente path: " C:\Program Files\MySQL\MySQL Server 8.0\bin"
5) Entrar no MySql command line e criar o banco de daodos "historicodeprevisoes"
    Comando: CREATE DATABASE historicodeprevisoes;
    Outros comandos:    SHOW DATABASES; 
                        USE 'nome_do_banco'
                        SHOW TABLES;
                        DESCRIBE 'nome_da_tabela'
6) Em app.js na linha 38 existe um comando que so deve ser executado na primeira execução do banco, caso seja executado outra vez ele sobrescrevera a tabela, recomendado que comente essa linha                   
7) Instalar nodemon(faz o codigo atualizar automaticamente):
        obs: No meu caso eu instalo globalmente
            npm install nodemon -g
8) A partir de um terminal administrador rodar direto da pasta SmarkioPrevisao
            nodemon app.js
9) Acessar o link http://localhost:8081/principal

Possiveis bugs do codigo:

Em algumas ocasiões o nodejs exclui uma parte do codigo devida a um espaço, no caso da substituição do nome da cidade se não tratamos o espaço para ser ignorado, ele substituira todas as palavras por nossa nova string, para corrigir isso basta arrumar essa parte: arquivo = './js/api.js'(linhas 26 e 30), esse espaço no argumento do replace é que ignora o espaço e substitui corretamente

    //nome da cidade
    var str = document.getElementById("nomeCidade").innerHTML; 
    var res = str.replace(/(-?\w+(?:\ \w*)?)/, forecast.name);
    document.getElementById("nomeCidade").innerHTML = res;
    //sigla do país
    var str = document.getElementById("pais").innerHTML; 
    var res = str.replace(/(-?\w+(?:\ \w*)?)/, forecast.sys.country);
    document.getElementById("pais").innerHTML = res;
