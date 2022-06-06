/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("tb_refresh_token", (table) => {
        table.increments();
        table.string("userId");
        table.string("expiredAt");
        table.string("isRevoked");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("tb_refresh_token");
};
