"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Maskapai = use("App/Models/Maskapai");
/**
 * Resourceful controller for interacting with maskapais
 */
class MaskapaiController {
  /**
   * Show a list of all maskapais.
   * GET maskapais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let model = null;
    console.log(request.get().cari);
    if (request.get().cari) {
      model = await Maskapai.query()
        .whereRaw("nama like :cari", { cari: "%" + request.get().cari + "%" })
        .orWhereRaw("kode like :cari", { cari: "%" + request.get().cari + "%" })
        .orWhereRaw("callsign like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .fetch();
    } else model = await Maskapai.all();
    return view.render("maskapai", { maskapais: model.toJSON() });
  }

  /**
   * Render a form to be used for creating a new maskapai.
   * GET maskapais/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render("add.maskapai_add");
  }

  /**
   * Create/save a new maskapai.
   * POST maskapais
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    console.log("request", request.all());
    const maskapai = await Maskapai.create(request.all());
    return response.redirect("/maskapai");
  }

  /**
   * Display a single maskapai.
   * GET maskapais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing maskapai.
   * GET maskapais/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const model = await Maskapai.find(params.id);
    return view.render("edit.maskapai_edit", {
      maskapai: model.toJSON(),
    });
  }

  /**
   * Update maskapai details.
   * PUT or PATCH maskapais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const model = await Maskapai.query()
      .where("id", params.id)
      .update(request.all());

    return response.redirect("/maskapai");
  }

  /**
   * Delete a maskapai with id.
   * DELETE maskapais/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const model = await Maskapai.query().where("id", params.id).delete();

    return response.redirect("/maskapai");
  }
}

module.exports = MaskapaiController;
