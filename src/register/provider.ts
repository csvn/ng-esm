import { name, InjectConstructor, createModule } from '../common/ng';
import { BaseConfig, FactoryCreator } from '../common/interface';


/** Decorate class for service creation via provider. Implement the `FactoryCreator` interface */
export function Provider(config: BaseConfig = {}) {
  return function(target: InjectConstructor<FactoryCreator>): void {
    createModule(target, config.dependencies)
      .provider(name(target, config), target);
  };
}
