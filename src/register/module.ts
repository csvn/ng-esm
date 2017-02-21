import * as ng from 'angular';
import { name, createModule } from '../common/ng';
import { BaseConfig, Dependencies } from '../common/interface';


/** Used for `@NgModule()` decorator. Option bag variant of `angular.module()` */
export interface ModuleOptions extends BaseConfig {
  /** The name of the ng module. If not provided, the class name will be used instead */
  name?: string;
  /** Register these key/value pairs as a value in AngularJS */
  values?: { [name: string]: any };
  /** Register these key/value pairs as a constant in AngularJS */
  constants?: { [name: string]: any };
}

/** Signature for `@NgModule()` */
export interface NgModuleSignature {
  (config: ModuleOptions): Function;
  (dependencies: Dependencies): Function;
  (moduleId: string, dependencies: Dependencies): Function;
}

/** Decorate a class as being an AngularJS module */
export const NgModule: NgModuleSignature = function NgModuleDecorator(val: any, deps?: any) {
  return function(target: Function): void {
    initializeModule(target, normalizeConfig(val, deps));
  };
};


/** (internal) */
export function normalizeConfig(
  val: string | Dependencies | ModuleOptions = {},
  deps: Dependencies = []
) {
  if (Array.isArray(val)) {
    return { dependencies: val };
  } else if (typeof val === 'string') {
    return { name: val, dependencies: deps };
  }
  return val;
}

/** (internal) */
export function initializeModule(target: Function, options: ModuleOptions) {
  const ngMod = createModule(target, options.dependencies, name(target, options));

  // Register values and constants
  ng.forEach(options.values, (val, key) => ngMod.value(key, val));
  ng.forEach(options.constants, (val, key) => ngMod.constant(key, val));
}
