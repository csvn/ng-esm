import { BaseConfig, register } from '../ng';


export function Filter(config?: BaseConfig) {
  return function(target: FilterConstructor): void {
    register(target, config)
      .filter(($injector: angular.auto.IInjectorService) => {
        let filter = $injector.instantiate<FilterTransform>(target);

        return (value, ...args) => filter.$transform(value, ...args);
      });
  };
}


export interface FilterTransform {
  $transform(value: any, ...args: any[]): any;
}

interface FilterConstructor {
  new (...injectables: any[]): FilterTransform;
}
