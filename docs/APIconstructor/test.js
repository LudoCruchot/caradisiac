const { getBrands } = require('node-car-api');
const { getModels } = require('node-car-api');
var fs = require('fs');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


async function exportElasticsearch() {
    const brands = await getBrands();
    //console.log(brands);
    const cars = [];
    for(brand of brands){
        console.log("Extracting "+brand+" ...");
        var carsWithBrand = await getModels(brand);
        for(car of carsWithBrand){
            cars.push(car);
        };
        fs.writeFileSync('TESTcars.json', JSON.stringify(cars),'UTF-8');
        
        client.bulk({"body":cars}, function(err, resp){});
  };
}


exports.insertElastic = exportElasticsearch();
//exports.insertElastic = insertIntoElastic;