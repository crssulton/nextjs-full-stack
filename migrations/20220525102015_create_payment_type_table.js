/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tb_payments_type", (table) => {
    table.increments();
    table.string("name");
    table.string("img");
    table.string("AccountNo");
    table.string("accountName");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tb_payments_type");
};
