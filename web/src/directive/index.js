import { vHasRoles } from "./permission";

export function setUpDirective(app) {
  app.directive(vHasRoles.name, vHasRoles.instance);
}
