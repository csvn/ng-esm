import * as ng from 'angular';
import { name, createModule } from '../common/ng';
import { BaseConfig, Dependencies } from '../common/interface';


declare const angular: ng.IAngularStatic;

/** Used for `@NgModule()` decorator. Option bag variant of `angular.module()` */
export interface ModuleOptions extends BaseConfig {
  /** The name of the ng module. If not provided, the class name will be used instead */
  name?: string;
  /** Register these key/value pairs as a value in angular */
  values?: { [name: string]: any };
  /** Register these key/value pairs as a constant in angular */
  constants?: { [name: string]: any };
}

/** Signature for `@NgModule()` */
export interface NgModuleSignature {
  (config: ModuleOptions): Function;
  (dependencies: Dependencies): Function;
  (moduleId: string, dependencies: Dependencies): Function;
}

/** Decorate a class as being an angular module */
export const NgModule: NgModuleSignature = ModuleDecorator;


function ModuleDecorator(val: string | Dependencies | ModuleOptions = {}, deps: Dependencies = []) {
  return function(target: Function): void {
    let config: ModuleOptions;

    if (Array.isArray(val)) {
      config = { dependencies: val };
    } else if (typeof val === 'string') {
      config = { name: val, dependencies: deps };
    } else {
      config = val;
    }

    let ngMod = createModule(target, config.dependencies, name(target, config));

    // Register values and constants
    angular.forEach(config.values, (val, key) => ngMod.value(key, val));
    angular.forEach(config.constants, (val, key) => ngMod.constant(key, val));
  };
}
