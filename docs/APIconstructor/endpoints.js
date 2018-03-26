const express = require('express')
const router = express.Router();
const populate = require('./test.js');

// populate
router.get('/',(req,res)=>{
    res.send('<p> Indexing data </p>');
    populate.insertElastic();
    console.log('>>>>>>>>>>> SUCCESS');
});

// suv
router.get('/', (req, res) => {
    var client = new elasticsearch.Client({
        hosts: ['http://localhost:9200']
    });

    client.search(
        {
            "from": 0, "size": 10000,
            "index": "caradisiac",
            "type": "car",
            "body": {
                "query": {
                    "bool": {
                      "must_not": [
                        {
                          "match": {
                            "volume.keyword": ""
                          }
                        }
                      ]
                    }
                  },
                  "size": 1000,
                  "sort": {
                    "volume.keyword": {
                      "order": "desc"
                    }
                  }
            }
        })
        .then((resp) => {
            res.send(resp.hits.hits)
        })
        .catch((err) => {
            res.send(err)
        });
});



router.get('/', (req,res) => {
    res.send('<p> Try populte or suv in the url </p>');
});

module.exports = router;