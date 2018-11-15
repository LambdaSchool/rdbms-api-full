const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);
const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting the students.' });
  }
});

// GET student by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await db
      .select('students.id', 'students.name', 'cohorts.name as cohort')
      .from('students')
      .join('cohorts', 'students.cohort_id', 'cohorts.id')
      .where({ 'students.id': id });
    return !student.length
      ? res.status(404).json({ message: "That student doesn't exist." })
      : res.status(200).json({ ...student[0] });
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting that student.' });
  }
});

// GET students
router.get('/:id/students', async (req, res) => {
  const { id } = req.params;
  try {
    const students = await db
      .select('*')
      .from('students')
      .where({ 'students.id': id })
      .join('students', { 'students.id': 'students.student_id' });

    return !students.length
      ? res.status(404).json({ message: "That student doesn't exist" })
      : res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error getting that student student name.' });
  }
});

// POST new student
router.post('/', async (req, res) => {
  const newstudent = req.body;
  try {
    const id = await db.insert(newstudent).into('students');
    const student = await db('students').where({ id: id[0] });
    res.status(201).json({ ...student[0] });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error creating a new student.' });
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db('students')
      .where({ id })
      .update(changes);
    const student = await db('students').where({ id });
    return count
      ? res.status(200).json({ ...student[0] })
      : res.status(404).json({ message: 'Make sure that id exists.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error updating that student.' });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db('students')
      .where({ id })
      .del();
    return count
      ? res.status(200).json(count)
      : res.status(404).json({ message: 'Not found.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error deleting that student.' });
  }
});

module.exports = router;
