"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BandarasSchema extends Schema {
  up() {
    this.create("bandaras", (table) => {
      table.increments();
      table.string("nama", 50).notNullable();
      table.string("kode", 50).notNullable().unique();
      table.string("provinsi", 40).notNullable();
      table.string("kota", 50).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bandaras");
  }
}

module.exports = BandarasSchema;
