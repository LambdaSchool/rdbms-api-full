
exports.up = function (knex, Promise) {
    return knex.schema.createTable('posts', function (table) {
        table.increments();

        table.integer('userId');
        table.text('text').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
