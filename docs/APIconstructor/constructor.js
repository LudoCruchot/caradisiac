// cd D:\ESILV\annee4\WebApplication\caradisiac\docs\APIconstructor

const {getBrands} = require('node-car-api');

var express = require('express');

var hostname='localhost';
var port=9292;

var app=express();

var myRouter = express.Router();

myRouter.route('/populate')

//GET
.get(function(req,res){
    res.json({message: "Liste de toute les populations ", methode:req.method});

})

app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://"+hostname+" : "+port+"\n");
});