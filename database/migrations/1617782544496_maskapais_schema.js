"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MaskapaisSchema extends Schema {
  up() {
    this.create("maskapais", (table) => {
      table.increments();
      table.string("nama", 20).notNullable();
      table.string("logo", 255);
      table.string("kode", 20).notNullable().unique();
      table.string("callsign", 20).notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("maskapais");
  }
}

module.exports = MaskapaisSchema;
