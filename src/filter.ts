import { BaseConfig, register } from './ng';


export function Filter(config?: BaseConfig) {
  return function(target: FilterConstructor): void {
    register(target, config)
      .filter(($controller: angular.IControllerService) => {
        let filter = $controller(target);

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
