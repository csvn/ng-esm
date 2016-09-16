import { BaseConfig } from '../common';
import { InjectConstructor, name, createModule } from '../ng';


/** Register the decorated class as an angular service */
export function Service(config: BaseConfig = {}) {
  return function(target: InjectConstructor<any>): void {
    createModule(target, config.dependencies)
      .service(name(target, config), target);
  };
}
