"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bandara = use("App/Models/Bandara");
/**
 * Resourceful controller for interacting with bandaras
 */
class BandaraController {
  /**
   * Show a list of all bandaras.
   * GET bandaras
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
      model = await Bandara.query()
        .whereRaw("nama like :cari", { cari: "%" + request.get().cari + "%" })
        .orWhereRaw("kode like :cari", { cari: "%" + request.get().cari + "%" })
        .orWhereRaw("provinsi like :cari", {
          cari: "%" + request.get().cari + "%",
        })
        .orWhereRaw("kota like :cari", { cari: "%" + request.get().cari + "%" })
        .fetch();
    } else model = await Bandara.all();
    return view.render("bandara", { bandaras: model.toJSON() });
  }

  /**
   * Render a form to be used for creating a new bandara.
   * GET bandaras/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    return view.render("add.bandara_add");
  }

  /**
   * Create/save a new bandara.
   * POST bandaras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    console.log("request", request.all());
    const bandara = await Bandara.create(request.all());
    return response.redirect("/bandara");
  }

  /**
   * Display a single bandara.
   * GET bandaras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing bandara.
   * GET bandaras/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
    const model = await Bandara.find(params.id);
    return view.render("edit.bandara_edit", {
      bandara: model.toJSON(),
    });
  }

  /**
   * Update bandara details.
   * PUT or PATCH bandaras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const model = await Bandara.query()
      .where("id", params.id)
      .update(request.all());

    return response.redirect("/bandara");
  }

  /**
   * Delete a bandara with id.
   * DELETE bandaras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const model = await Bandara.query().where("id", params.id).delete();

    return response.redirect("/bandara");
  }
}

module.exports = BandaraController;
