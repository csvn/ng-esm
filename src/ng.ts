import * as ng from 'angular';
import { Dependencies, BaseConfig } from './common';
import { registerModuleId } from './debug';


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


const ID_SYMBOL = Symbol('moduleId');
let currentModuleIndex = 0;

/** (internal) */
export function name(target: Function, { name = target.name }: BaseConfig) {
  if (!name) {
    throw new Error(`Must provide named class, or 'name' property in config`);
  }

  return name;
}

/** (internal) */
export function createModule(
  target?: null | Function, deps: Dependencies = [], name: null | string = null
) {
  // If target already has a ng.module, will allow new one with the previous as dependency
  // (i.e. for registering @State and @Component together)
  let prevNgId: string | undefined = target && (<any> target)[ID_SYMBOL];
  if (prevNgId) {
    deps.push(prevNgId);
  }

  const parsedDeps = deps.map(d => ng.isString(d) ? d : getModuleId(d));
  const ngId = name === null ? generateId() : name;
  const ngDeps = parsedDeps.filter(d => ng.isString(d)) as string[];

  validateDependencies(target, parsedDeps, ngDeps);

  const ngModule = ng.module(ngId, ngDeps);

  registerModuleId(ngId);
  if (ng.isFunction(target)) {
    Reflect.defineProperty(target, ID_SYMBOL, { value: ngId, writable: true });
  }

  return ngModule;
}

/** Create a new angular module, where name will be automatically generated if not provided */
export function ngModule(name?: string | null, deps?: Dependencies) {
  return createModule(null, deps, name);
}

/** Retrieve a angular module from a string or decorated class/function */
export function getNgModule(value: string | Function) {
  const id = getModuleId(value);

  if (ng.isFunction(id)) {
    const msg = `Missing ngModule id, as function "${id.name}" is not decorated by 'ng-esm'.`;
    console.error(msg);
  }

  return ng.module(id as string);
}


function generateId() {
  currentModuleIndex++;
  return `ng-esm:${currentModuleIndex}`;
}

function getModuleId(value: string | Function): string | Function {
  if (ng.isString(value) || !value) {
    return value;
  }

  const { [ID_SYMBOL]: moduleId } = value;

  return moduleId ? moduleId : value;
}

function validateDependencies(
  target: null | undefined | Function, parsedDeps: Dependencies, ngDeps: string[]
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
