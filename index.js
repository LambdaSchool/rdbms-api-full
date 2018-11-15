
//bring in dependencies 
const express = require('express');
const helmet = require('helmet');
const server = express();
const knexConfig = require('./knexfile')

//call dependencies
server.use(express.json());
server.use(helmet());


//call Route
const cohortRoute = require('./routes/cohortRoute');
server.use('/api/cohorts', cohortRoute);

//endpoints
server.get('/', (req, res) => {
    res.send('it lives!');
});

//export
const port = 3300
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})