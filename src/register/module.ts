import ng from 'angular';
import { name, createModule } from '../ng';
import { BaseConfig, Dependencies } from '../common';

declare const angular: ng.IAngularStatic;

export interface NgModuleRegistration {
  register(ngModule: ng.IModule): void;
}

export function NgModule(config: BaseConfig | Dependencies) {
  return function(target: Function | (Function & NgModuleRegistration)): void {
    if (Array.isArray(config)) {
      config = { dependencies: config };
    }

    let ngModule = createModule(target, config.dependencies, name(target, config, false));

    if (angular.isFunction((<NgModuleRegistration>target).register)) {
      (<NgModuleRegistration>target).register(ngModule);
    }
  };
}
