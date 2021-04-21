"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Schedule = use("App/Models/Schedule");
const Maskapai = use("App/Models/Maskapai");
const Bandara = use("App/Models/Bandara");
/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let model = null;
    let fromModel = false;

    if (request.get().cari) {
      fromModel = true;
      model = await Schedule.query()
        .whereRaw("waktuKeberangkatan like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("waktuKedatangan like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("durasiPenerbangan like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("jenisPesawat like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .with("bandaraKeberangkatan")
        .with("bandaraKedatangan")
        .with("maskapai")
        // .with("bandaraKeberangkatan", (bandara) => {
        //   bandara.where("nama", "like", "%" + request.get().cari + "%");
        //   bandara.orWhere("kota", "like", "%" + request.get().cari + "%");
        // })
        // .with("bandaraKedatangan", (bandara) => {
        //   bandara.where("nama", "like", "%" + request.get().cari + "%");
        //   bandara.orWhere("kota", "like", "%" + request.get().cari + "%");
        // })
        // .with("maskapai", (maskapai) => {
        //   maskapai.where("nama", "like", "%" + request.get().cari + "%");
        // })
        .fetch();
      // console.log("disitu", model);
    } else {
      model = await Schedule.query()
        .with("bandaraKeberangkatan")
        .with("bandaraKedatangan")
        .with("maskapai")
        .fetch();
      // console.log("disini", model);
    }
    let result = [];
    let data = model.toJSON();
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]);
    }
    console.log(model.toJSON());
    return view.render("schedule", {
      schedules: result,
      fromModel: fromModel,
    });
  }

  async list({ request, response, view }) {
    let model = null;
    let fromModel = false;

    if (request.get().cari) {
      fromModel = true;
      model = await Schedule.query()
        .whereRaw("waktuKeberangkatan like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("waktuKedatangan like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("durasiPenerbangan like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("jenisPesawat like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .with("bandaraKeberangkatan")
        .with("bandaraKedatangan")
        .with("maskapai")
        // .with("bandaraKeberangkatan", (bandara) => {
        //   bandara.where("nama", "like", "%" + request.get().cari + "%");
        //   bandara.orWhere("kota", "like", "%" + request.get().cari + "%");
        // })
        // .with("bandaraKedatangan", (bandara) => {
        //   bandara.where("nama", "like", "%" + request.get().cari + "%");
        //   bandara.orWhere("kota", "like", "%" + request.get().cari + "%");
        // })
        // .with("maskapai", (maskapai) => {
        //   maskapai.where("nama", "like", "%" + request.get().cari + "%");
        // })
        .fetch();
      // console.log("disitu", model);
    } else {
      model = await Schedule.query()
        .with("bandaraKeberangkatan")
        .with("bandaraKedatangan")
        .with("maskapai")
        .fetch();
      // console.log("disini", model);
    }
    let result = [];
    let data = model.toJSON();
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]);
    }
    console.log(model.toJSON());
    return response.json(result);
  }

  /**
   * Render a form to be used for creating a new schedule.
   * GET schedules/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const model = await Bandara.all();
    const model2 = await Maskapai.all();
    return view.render("add.schedule_add", {
      bandaras: model.toJSON(),
      maskapais: model2.toJSON(),
    });
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const schedule = new Schedule();
    schedule.maskapai_id = request.input("maskapai_id");
    schedule.bandaraKeberangkatan_id = request.input("bandaraKeberangkatan_id");
    schedule.waktuKeberangkatan = request.input("waktuKeberangkatan");
    schedule.durasiPenerbangan = request.input("durasiPenerbangan");
    schedule.bandaraKedatangan_id = request.input("bandaraKedatangan_id");
    schedule.waktuKedatangan = request.input("waktuKedatangan");
    schedule.seatClass = request.input("seatClass");
    schedule.hargaTiket = request.input("hargaTiket");
    schedule.kapasitas = request.input("kapasitas");
    schedule.jenisPesawat = request.input("jenisPesawat");
    await schedule.save();
    return response.redirect("/schedule");
  }

  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const model = await Schedule.find(params.id);
    return view.render("details.schedule_details", {
      schedule: model.toJSON(),
    });
  }

  /**
   * Render a form to update an existing schedule.
   * GET schedules/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const model = await Schedule.find(params.id);
    const modelBandara = await Bandara.all();
    const modelMaskapai = await Maskapai.all();
    return view.render("edit.schedule_edit", {
      schedules: model.toJSON(),
      Bandaras: modelBandara.toJSON(),
      maskapais: modelMaskapai.toJSON(),
    });
  }

  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const model = await Schedule.query()
      .where("id", params.id)
      .update(request.all());

    return response.redirect("/schedule");
  }

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const model = await Schedule.query().where("id", params.id).delete();

    return response.redirect("/schedule");
  }
}

module.exports = ScheduleController;
