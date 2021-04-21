"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddKapasitasSchema extends Schema {
  up() {
    this.alter("schedules", (table) => {
      table.integer("kapasitas");
      table.integer("jenisPesawat");
    });
  }

  down() {
    this.table("schedules", (table) => {
      // reverse alternations
    });
  }
}

module.exports = AddKapasitasSchema;
