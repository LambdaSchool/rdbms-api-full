
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
    tbl.increments('id');
    tbl.string('tag', 16).notNullable().unique('tag');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('tags');
};
