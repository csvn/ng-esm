import ng from 'angular';
import { InjectConstructor, createModule } from '../ng';
import { BaseConfig } from '../common';


export function Filter(config: BaseConfig = {}) {
  return function(target: InjectConstructor<FilterTransform>): void {
    function filterRunner($injector: ng.auto.IInjectorService): Function {
      let filter = $injector.instantiate<FilterTransform>(target);

      if (typeof filter.transform !== 'function') {
        throw new Error('"transform" method required for Filter class');
      }

      return filter.transform.bind(filter);
    }
    filterRunner.$inject = ['$injector'];

    createModule(target, config.dependencies)
      .filter(filterRunner);
  };
}


export interface FilterTransform {
  transform(value: any, ...args: any[]): any;
}
