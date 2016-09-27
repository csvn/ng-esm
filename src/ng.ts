import ng from 'angular';
import { Dependencies, BaseConfig } from './common';
import { registerModuleId } from './debug';


declare let angular: ng.IAngularStatic;

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
  let ngId = name === null ? generateId() : name,
      ngDeps = parseDependencies(deps),
      ngModule = angular.module(ngId, ngDeps);

  registerModuleId(ngId);
  if (angular.isFunction(target)) {
    Reflect.defineProperty(target, ID_SYMBOL, { value: ngId });
  }

  return ngModule;
}

/** Create a new angular module, where name will be automatically generated if not provided */
export function ngModule(name?: string | null, deps?: Dependencies) {
  return createModule(null, deps, name);
}

/** Retrieve a angular module from a string or decorated class/function */
export function getNgModule(value: string | Function) {
  return angular.module(getModuleId(value));
}


function generateId() {
  currentModuleIndex++;
  return `ng-esm:${currentModuleIndex}`;
}

function getModuleId({ [ID_SYMBOL]: moduleId }): string {
  if (!moduleId) {
    throw new Error(`Function missing property Symbol('moduleId'). ` +
      `Make sure all function dependencies are decorated by ng-esm`);
  }

  return moduleId;
}

function parseDependencies(deps: Dependencies): string[] {
  return deps.map(d => {
    if (angular.isString(d)) {
      return d;
    } else if (angular.isFunction(d)) {
      return getModuleId(d);
    }

    throw new Error(`Only 'string' & 'Function' (decorated by 'ng-esm') are ` +
      `supported as dependencies. Was '${typeof d}'.`);
  });
}
