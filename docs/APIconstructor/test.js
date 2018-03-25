// cd D:\ESILV\annee4\WebApplication\caradisiac\docs\APIconstructor

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

const express = require('express');
var fs = require('fs');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var hostname='localhost';
var port=9292;

var app=express();

var myRouter = express.Router();


async function exportElasticsearch(){
    console.log("Launch...");

    const brands = await getBrands();

    const modeles=[];

    for(brand of brands){
        console.log("Extracting "+brand+" ...");
        var models = await getModels(brand);
        for(model of models){
            modeles.push({index:{_index:"cardisiac",_type:"car",_id: model.uuid}})
            modeles.push(model);
        };
    };

    console.log(">>>>> DEBUT");
    console.log(modeles);
    console.log(">>>>> FIN");
    //fs.writeFileSync('cars.json', JSON.stringify(modeles),'UTF-8');
    //console.log("JSON file created");
    //client.bulk({"body":modeles}, function(err, resp){});
    client.bulk({

        body: modeles
    },function(error, response){
        if(error){
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> ECHEC "+error);
            return;
        }
        else{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> REUSSI")
            //console.log(response);
        }
    });

    // route /populate
    app.get('/populate',(req,res)=>{
        populate
        res.send('Populate completed')
    });

    // route /suv
    app.get('/suv',(req,res)=>{
        res.send('Hello')
    });

    app.listen(port, hostname, function(){
        console.log("Mon serveur fonctionne sur http://"+hostname+" : "+port+"\n");
    });

}

exports.insertElastic = exportElasticsearch();