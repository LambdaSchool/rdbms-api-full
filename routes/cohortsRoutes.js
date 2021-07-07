const express = require('express');
const router = express.Router();
const cohorts = require('./cohortsModel.js');


// endpoints here for the zoo

//POST /api/cohorts
router.post('/', async (req, res) => {
    try {
      const cohort = req.body;
      if(cohort.name.length > 0){
        const newCohort = await cohorts.addCohort(cohort);
        res.status(200).json(newCohort);
      } else {
        res.status(404).json({message: "Please enter the name of the cohort"});
      }
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to save a cohort to the data base"});
    }
  });
  
  
  //GET /api/cohorts
  router.get('/', async (req, res) => {
    try {
      const cohortsList  = await cohorts.findCohorts();
      res.status(200).json(cohortsList);
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to connect to the data base"});
    }
  });
  
  //GET /api/cohorts/:id
  router.get('/:cohortId', async (req, res) => {
    try {
      const {cohortId} = req.params;
      const cohortById = await cohorts.findCohortById(cohortId);
      if(cohortById){
        res.status(200).json(cohortById);
      } else {
        res.status(404).json({message: "Please provide the correct ID of the cohort"})
      }
    }
    catch (err){
      res.status(500).json({message: "There was an error while trying to retrieve a zoo from the data base"});
    }
  });
  
  //DELETE /api/cohorts/:id
  router.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const count = await cohorts.removeCohort(id);
  
      if(!count || count < 1){
          res.status(404).json({message: "Cohort was not found to be removed"})
      } else{
          res.status(200).json(count);
      }
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to delete a zoo from the data base"});
      }
  });
  
  //PUT /api/cohorts/:id 
  router.put('/:id', async(req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      if (changes.name.length > 0) {
        const updated = await cohorts.updateCohort(id, changes);
        res.status(200).json(updated);
      } else {
        res.status(404).json({message: "Please enter the name of the cohort"});
      }
    }
    catch (err){
      res.status(500).json({message: "There was an error while trying to update a cohort in the data base"});
    }
  });

  router.get('/:cohortId/students', async(req, res) => {
    try {
        const { cohortId } = req.params;
        const cohort = await cohorts.findCohortById(cohortId);
        if(cohort) {
            const students = await cohorts.findStudents(cohortId);
            res.status(200).json(students);
        } else {
            res.status(404).json({message: "List of students could not be retrieved."})
        }
    }
    catch (err) {

    }
  });

module.exports = router;