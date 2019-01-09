const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

// add to cohorts table

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts')
            .insert(cohort)
            .then(id => {
                res
                    .status(201)
                    .json(id);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The new cohort could not be added at this time.'});
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please include the cohort name.'});
    }
});

// get array of cohorts

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res
                .json(cohorts);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The cohorts' information could not be retrieved at this time.`});
        });
});

// get cohort by id

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where('id', id)
        .then(cohort => {
            if (cohort.length > 0) {
                res
                    .json(cohort);
            }
            else {
                res
                    .status(404)
                    .json({message: 'The cohort with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The cohort's information could not be retrieved at this time.`});
        });
});

const PORT = 4400;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});