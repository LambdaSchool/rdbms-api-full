// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/lambda.sqlite3" // update path
    },
    useNullAsDefault: true,
    migrations: {
      // add this line
      directory: "./db/migrations"
    },
    seeds: {
      // add this line
      directory: "./db/seeds"
    }
  }
};
