// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "",
      port: 3306,
      user: "",
      password: "",
      database: "",
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: "",
      port: 3306,
      user: "",
      password: "",
      database: "",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "",
      port: 3306,
      user: "",
      password: "",
      database: "",
    },
  },
};
