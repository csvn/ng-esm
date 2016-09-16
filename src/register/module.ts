import ng from 'angular';
import { name, createModule } from '../ng';
import { BaseConfig, Dependencies } from '../common';

declare const angular: ng.IAngularStatic;

export interface NgModuleRegistration {
  register(ngModule: ng.IModule): void;
}

export interface NgModuleSignature {
  (): Function;
  (config: BaseConfig): Function;
  (moduleId: string): Function;
  (moduleId: string, dependencies?: Dependencies): Function;
}

export const NgModule: NgModuleSignature = NgModuleDecorator;


function NgModuleDecorator(val: string | Dependencies | BaseConfig = {}, deps: Dependencies = []) {
  return function(target: Function | (Function & NgModuleRegistration)): void {
    let config: BaseConfig;

    if (Array.isArray(val)) {
      config = { dependencies: val };
    } else if (typeof val === 'string') {
      config = { name: val, dependencies: deps };
    } else {
      config = val;
    }

    let ngModule = createModule(target, config.dependencies, name(target, config));

    if (angular.isFunction((<NgModuleRegistration>target).register)) {
      (<NgModuleRegistration>target).register(ngModule);
    }
  };
}
