"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddIdbandaraSchema extends Schema {
  up() {
    this.alter("schedules", (table) => {
      table.integer("bandaraKeberangkatan_id");
      table.integer("bandaraKedatangan_id");
    });
  }

  down() {
    this.table("schedules", (table) => {
      // reverse alternations
    });
  }
}

module.exports = AddIdbandaraSchema;
