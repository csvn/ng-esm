import { BaseConfig } from '../common/interface';
import { InjectConstructor, name, createModule } from '../common/ng';


const SERVICE_NAME = Symbol('serviceName');

/** Register the decorated class as an AngularJS service */
export function Service(config: BaseConfig = {}) {
  return function(target: InjectConstructor<any>): void {
    const diName = name(target, config);

    Reflect.defineProperty(target, SERVICE_NAME, { value: diName });

    createModule(target, config.dependencies)
      .service(diName, target);
  };
}

/** Get the `name` of a @Service decorated class/function */
export function serviceName(target: Function): string | undefined {
  return Reflect.get(target, SERVICE_NAME);
}
