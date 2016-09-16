const REGISTERED_MODULES: string[] = [];


export function getModuleIds() {
  return REGISTERED_MODULES;
}

export function registerModuleId(moduleId: string) {
  REGISTERED_MODULES.push(moduleId);
}
