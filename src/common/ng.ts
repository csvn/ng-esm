import * as ng from 'angular';
import { Dependencies, BaseConfig } from './interface';
import { registerModuleId } from './debug';


let currentModuleIndex = 0;
const ID_SYMBOL = Symbol('moduleId');

export interface InjectFn {
  (...injectables: any[]): void;
}

export interface InjectConstructor<T> {
  new (...injectables: any[]): T;
}

export interface NgEsmConfig {
  ctrlAs: string | undefined;
}

/** (internal) */
export const config: NgEsmConfig = {
  ctrlAs: '$ctrl'
};

/** (internal) */
export function name(target: Function, { name = target.name }: BaseConfig) {
  if (!name) {
    throw new Error(`Must provide named class, or 'name' property in config`);
  }

  return name;
}

/** (internal) */
export function createModule(target: Function, deps: Dependencies = [], name: string = '') {
  // If target already has a ng.module, will allow new one with the previous as dependency
  // (i.e. for registering @State and @Component together)
  const prevNgId = getModuleId(target);
  if (ng.isString(prevNgId)) {
    deps.push(prevNgId);
  }

  const parsedDeps = deps.map(d => getModuleId(d));
  const ngId = !name ? generateId() : name;
  const ngDeps = parsedDeps.filter(d => ng.isString(d)) as string[];

  validateUniqueNgModule(ngId);
  const ngModule = ng.module(ngId, ngDeps);

  registerModuleId(ngId);
  validateDependencies(target, parsedDeps, ngDeps);
  Reflect.defineProperty(target, ID_SYMBOL, { value: ngId, writable: true });

  return ngModule;
}

/** Create a new angular module, where name will be automatically generated if not provided */
export function ngModule(name?: string, deps?: Dependencies) {
  return createModule(() => {}, deps, name);
}

/** Retrieve a angular module from a string or decorated class/function */
export function getNgModule(value: string | Function) {
  const id = getModuleId(value);

  if (ng.isFunction(id)) {
    const msg = `Missing ngModule id, as function "${id.name}" is not decorated by 'ng-esm'.`;
    console.error(msg);
  }

  // Let angular handle invalid values
  return ng.module(id as string);
}


function generateId() {
  currentModuleIndex++;
  return `ng-esm:${currentModuleIndex}`;
}

function getModuleId<T>(value: T): T | string {
  if (ng.isFunction(value) && Reflect.get(value, ID_SYMBOL)) {
    return Reflect.get(value, ID_SYMBOL) as string;
  }

  return value;
}

function validateUniqueNgModule(name: string): void {
  try {
    ng.module(name);
  } catch (err) {
    return;
  }
  throw new Error(`Can't create ng module: "${name}" already exists!`);
}

/** Log errors if any dependencies in `parsedDeps` are invalid */
function validateDependencies(
  target: Function, parsedDeps: Dependencies, ngDeps: string[]
) {
  if (ngDeps.length === parsedDeps.length) return;

  const errors: string[] = parsedDeps
    .filter(d => !ng.isString(d))
    .map(d => ng.isFunction(d) ?
      `\n  - '${d.name}' function (not decorated by 'ng-esm').` :
      `\n  - ${d} (with type '${typeof d}').`
    );
  const errorsMsg = `List of invalid dependency values:${errors.join('')}`;

  if (target) {
    const msg = `[ng-esm]: Invalid angular dependencies in decorated class "${target.name}":`;
    console.error(msg, target, '\n\n', errorsMsg, '\n\nDependencies:', parsedDeps);
  } else {
    console.error(errorsMsg, '\n\nDependencies:', parsedDeps);
  }
}
