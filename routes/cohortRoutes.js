const express = require('express');
const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);
const router = express.Router();


router.get('/api/cohorts', (req, res) => {
    db
     .pull()
     .then((cohorts) => {
      res
      .json(cohorts)
     })
     .catch(() => {
      res
       .status(500)
       .json({error: "There was an error pulling all cohorts from DB."})
     })
   })

router.post('/api/cohorts', (req, res) => {
    const cohort = req.body
    if (cohort.name) {
        db('cohorts')
        .insert(cohort)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(() => {
            res.status.json({ error: 'Failed to insert the cohort into the DB.'})
        })
    } else {
        res.status(400).json({ error: 'Please include a name for the cohort'})
    }
})
