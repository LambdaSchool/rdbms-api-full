
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (tbl) {
    tbl.increments('id');
    tbl.string('name', 128).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('users');
};
