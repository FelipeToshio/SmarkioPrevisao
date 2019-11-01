//controle da API, metodos de chamada e escrita

var apiURL = "http://api.openweathermap.org/data/2.5/weather";
var apiKEY = "9d7aa8de744de1ab11f692fcb71725ee";

//função de inicialização da chamada
function callAPI(address){
    if(address != ""){
        var nomeCidade = address.trim();
        getData(apiURL, nomeCidade, apiKEY);
    }else{
        alert('Digite a cidade');
    }
    
}
//função de chamada da URL, onde realmente faz a chamada 
function getData(url, cidade, key){
    const request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: cidade, appid: key, units: 'metric',lang: 'pt'},
        jsonpCallback: "fetchData",
        type: "GET",
    }).fail(function(error) {
        console.log(error);
        alert('Erro na função de requisição');
        
    })
}
// função que recebe o dado e altera os valores da view 
function fetchData(forecast){
    console.log(forecast);
    //temperatura
    var str = document.getElementById("tempNumero").innerHTML; 
    var res = str.replace(/(-?\d+(?:\.\d*)?)/, forecast.main.temp);
    document.getElementById("tempNumero").innerHTML = res;
    //nome da cidade
    var str = document.getElementById("nomeCidade").innerHTML; 
    var res = str.replace(/(\w+)/, forecast.name);
    document.getElementById("nomeCidade").innerHTML = res;
    //sigla do país
    var str = document.getElementById("pais").innerHTML; 
    var res = str.replace(/(\w+)/, forecast.sys.country);
    document.getElementById("pais").innerHTML = res;
    
    //hora
    var  d =  new Date();
    var flag =0;
    var h, m;
    var resph;
    m = d.getUTCMinutes();
    h = d.getUTCHours()*3600;
        //pego horas em segundos somo com o timezone e transformo em horas
        resph = (h+forecast.timezone)/3600;

        // corrigir para 1 dia a frente
        if(resph > 24){
            resph -= 24;
            flag = 1;
        }
        //replace horas
        var str = document.getElementById("hora").innerHTML; 
        var res = str.replace(/(-?\d+(?:\.\d*)?)/, resph);
        document.getElementById("hora").innerHTML = res;

        //replace minutos
        var str = document.getElementById("minutos").innerHTML; 
        var res = str.replace(/(-?\d+(?:\.\d*)?)/, m);
        document.getElementById("minutos").innerHTML = res;

    //dia
    var  d =  new Date();
    var x;
    d= d.getDay() + flag;
    if(d == 1){
        x = "Segunda-Feira";
    }else if(d == 2) {
        x = "Terça-Feira";
    }else if(d == 3){
        x = "Quarta-Feira";
    }else if(d == 4){
        x = "Quinta-Feira";
    }else if(d == 5){
        x = "Sexta-Feira";
    }else if(d == 6){
        x = "Sabado";
    }else if(d == 7){
        x = "Domingo";
    }
    var str = document.getElementById("dia").innerHTML; 
    var res = str.replace(/(-?\w+(?:\-\w*)?)/, x);
    document.getElementById("dia").innerHTML = res;
    

    //clima
    var str = document.getElementById("clima").innerHTML; 
    var res = str.replace(/(-?\w+(?:\ \w*)?)/, forecast.weather[0].description);
    document.getElementById("clima").innerHTML = res;
    
    //humidade
    var str = document.getElementById("humidade").innerHTML; 
    var res = str.replace(/(-?\d+(?:\.\d*)?)/, forecast.main.humidity);
    document.getElementById("humidade").innerHTML = res;
    
    //img
}