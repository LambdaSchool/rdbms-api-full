exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments(); // id
    tbl
      .string("student_name")
      .notNullable()
      .unique("student_name");
    tbl
      .integer("cohort_id")
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
