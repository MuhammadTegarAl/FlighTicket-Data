"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SchedulesSchema extends Schema {
  up() {
    this.create("schedules", (table) => {
      table.increments();
      table.integer("maskapai_id");
      table.integer("keberangkatanKota_id");
      table.datetime("waktuKeberangkatan");
      table.integer("durasiPenerbangan");
      table.integer("kedatanganKota_id");
      table.datetime("waktuKedatangan");
      table.string("seatClass", 20);
      table.integer("hargaTiket");
      table.timestamps();
    });
  }

  down() {
    this.drop("schedules");
  }
}

module.exports = SchedulesSchema;
