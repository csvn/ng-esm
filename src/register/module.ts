import ng from 'angular';
import { name, createModule } from '../ng';
import { ModuleOptions, Dependencies } from '../common';


declare const angular: ng.IAngularStatic;

export interface NgModuleSignature {
  (): Function;
  (config: ModuleOptions): Function;
  (moduleId: string): Function;
  (moduleId: string, dependencies?: Dependencies): Function;
}

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
