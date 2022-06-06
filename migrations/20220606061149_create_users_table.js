/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tb_users", (table) => {
    table.increments();
    table.string("name");
    table.string("email");
    table.string("password");
    table.string("salt");
    table.integer("level");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tb_users");
};
