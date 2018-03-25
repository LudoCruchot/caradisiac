// cd D:\ESILV\annee4\WebApplication\caradisiac\docs\APIconstructor

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

var fs = require('fs');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Everything is ok');
    }
  });

async function exportElasticsearch(){
    console.log("Launch...");

    const brands = await getBrands();

    const modeles=[];

    for(brand of brands){
        console.log("Extracting "+brand+" ...");
        var models = await getModels(brand);
        for(model of models){
            modeles.push(model);
        };
    };
    //fs.writeFileSync('cars.json', JSON.stringify(modeles),'UTF-8');
    //console.log("JSON file created");
    client.bulk({"body":modeles}, function(err, resp){});
}

exports.insertElastic = exportElasticsearch();