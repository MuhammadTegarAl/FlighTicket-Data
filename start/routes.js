"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.resource("/bandara", "BandaraController");
Route.resource("/maskapai", "MaskapaiController");
Route.resource("/schedule", "ScheduleController");

Route.post("/bandara/:id", "BandaraController.update");
Route.get("/bandara/:id/destroy", "BandaraController.destroy");

Route.post("/maskapai/:id", "MaskapaiController.update");
Route.get("/maskapai/:id/destroy", "MaskapaiController.destroy");

Route.post("/schedule/:id", "ScheduleController.update");
Route.get("/schedule/:id/destroy", "ScheduleController.destroy");

Route.group(() => {
  Route.get("/schedules", "ScheduleController.list");
}).prefix("api/v1");
