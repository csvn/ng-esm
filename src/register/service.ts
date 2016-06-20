import { BaseConfig, InjectConstructor, register } from '../ng';


export function Service(config?: BaseConfig) {
  return function(target: InjectConstructor<any>): void {
    register(target, config).service(target);
  };
}
