import { BaseConfig, register } from '../ng';


export function Filter(config?: BaseConfig) {
  return function(target: FilterConstructor): void {
    register(target, config)
      .filter(($injector: angular.auto.IInjectorService) => {
        let filter = $injector.instantiate<FilterTransform>(target);

        if (typeof filter.$transform !== 'function') {
          throw new Error('"$transform" method required for Filter class');
        }

        return filter.$transform.bind(filter);
      });
  };
}


export interface FilterTransform {
  $transform(value: any, ...args: any[]): any;
}

export interface FilterConstructor {
  new (...injectables: any[]): FilterTransform;
}
