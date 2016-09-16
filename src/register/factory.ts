import ng from 'angular';
import { name, InjectConstructor, createModule } from '../ng';
import { BaseConfig, FactoryCreator } from '../common';


/** Decorate class for service creation via factory. Implement the `FactoryCreator` interface */
export function Factory(config: BaseConfig = {}) {
  return function(target: InjectConstructor<FactoryCreator>): void {
    function factoryRunner($injector: ng.auto.IInjectorService): void {
      let instance = $injector.instantiate<FactoryCreator>(target);
      return $injector.invoke(instance.$get, instance);
    }
    factoryRunner.$inject = ['$injector'];

    createModule(target, config.dependencies)
      .factory(name(target, config), factoryRunner);
  };
}
