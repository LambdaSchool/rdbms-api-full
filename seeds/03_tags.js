
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { 
          tag: 'fun', 
          postId: '1'
        },
        { 
          tag: 'cool', 
          postId: '2'
        },
        { 
          tag: 'wow', 
          postId: '3'
        }
      ]);
    });
};
