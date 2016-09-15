import ng from 'angular';
import { Dependencies, BaseConfig } from './common';


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

export const config: NgEsmConfig = {
  ctrlAs: '$ctrl'
};


const ID_SYMBOL = Symbol('moduleId');
let currentModuleIndex = 0;

export function name(target: Function, { name = target.name }: BaseConfig) {
  if (!name) {
    throw new Error(`Must provide named class, or 'name' property in config`);
  }

  return name;
}

export function createModule(
  target: Function, deps: Dependencies = [], moduleId: string = generateId()
) {
  let ngDeps = parseDependencies(deps),
      ngModule = angular.module(moduleId, ngDeps);

  Reflect.defineProperty(target, ID_SYMBOL, { value: moduleId });

  return ngModule;
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
  return deps.map(d => angular.isString(d) ? d : getModuleId(d));
}
