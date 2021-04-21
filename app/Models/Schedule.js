"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Schedule extends Model {
  bandaraKeberangkatan() {
    return this.belongsTo(
      "App/Models/Bandara",
      "bandaraKeberangkatan_id",
      "id"
    );
  }
  bandaraKedatangan() {
    return this.belongsTo("App/Models/Bandara", "bandaraKedatangan_id", "id");
  }
  maskapai() {
    return this.belongsTo("App/Models/Maskapai");
  }
}

module.exports = Schedule;
