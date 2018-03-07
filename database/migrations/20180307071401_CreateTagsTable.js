exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tbl => {
    tbl.increments();

    tbl
      .string('tag', 16)
      .notNullable()
      .unique('tag');

    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
