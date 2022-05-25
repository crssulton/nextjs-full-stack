/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tb_ielts_material", (table) => {
    table.increments();
    table.string("title");
    table.string("transcripts");
    table.string("questions");
    table.string("options");
    table.string("answer");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tb_ielts_material");
};
