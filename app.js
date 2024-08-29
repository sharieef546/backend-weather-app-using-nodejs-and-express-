
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req, res){
    
    const query = req.body.cityName;
    const apiKey = '289facfca57e87078de6a7b0fa9134b0';
    const unit = 'metric';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units="+ unit + "&appid=" + apiKey;

    https.get(url, function(response){        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +".png"
            res.write("<h1>The temperature in " + query + " is " +  temp + " degrees Celsius.</h1>");
            res.write("<h3>The weather is currently " + weatherDescription + ".</h3>");
            res.write("<img src='" + icon + "'/>");
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("Server runing on port 3000!");
})
