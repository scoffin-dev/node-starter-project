let express = require('express');
const logger = require('../log/Logger')(__filename); 
let router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));

// * * * Allows the client to send a GET request with a query string * * * //
// localhost:8080/node-starter-project/example-get?catsAreGreat=true
router.get('/example-get', function (req, res) {
    logger.info('GET request made to /example-get');
    try {
        // Param from the query string in the client's initial request to this service
        let catsAreGreat = req.query.catsAreGreat;

        // Judge the response based on solid logic and respond accordingly
        if(catsAreGreat == "true" || catsAreGreat == "yes") {
            res.send(`Cats ARE great... I'm glad we agree!`);
        } else if (catsAreGreat == "false" || catsAreGreat == "no") {
            res.status(406).send(`${catsAreGreat}? I don't care what you say. Cats ARE great.`);
        } else {
            res.status(412).send(`Precondition failed: Your answer, "${catsAreGreat}," doesn't make sense.`)
        }
    } catch(err) {
        res.status(500).send(`Request failed: ${err.message}`);
    }
});

// * * * Allows the client to send a POST request with a parameter * * * //
// localhost:8080/node-starter-project/example-post {"favoritePokemon":"bellsprout"}
router.post('/example-post', function (req, res) {
    logger.info(`POST request made to /example-post`);
    try {
        // Param from a client's initial request to this service
        let bestPokemonEver = req.body.favoritePokemon;
        res.send(`#FACT: ${bestPokemonEver} is the best Pokemon ever.`);
    } catch(err) {
        res.status(500).send(`Request failed: ${err.message}`);
    }
});

module.exports = router;