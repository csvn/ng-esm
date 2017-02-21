const REGISTERED_MODULES: string[] = [];

/** List all the angular module id's that have been created via `ng-esm` */
export function getModuleIds() {
  return REGISTERED_MODULES;
}

/** (internal) */
export function registerModuleId(moduleId: string) {
  REGISTERED_MODULES.push(moduleId);
}
