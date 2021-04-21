"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeleteSomeColumnonScheduleSchema extends Schema {
  up() {
    this.table("schedules", (table) => {
      // alter table
    });
  }

  down() {
    this.table("schedules", (table) => {
      // reverse alternations
      table.dropColumn("keberangkatanKota_id");
      table.dropColumn("kedatanganKota_id");
    });
  }
}

module.exports = DeleteSomeColumnonScheduleSchema;
