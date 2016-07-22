import { register } from '../ng';
import { BaseConfig, Dependencies } from '../common';


export function Module(config: BaseConfig | Dependencies) {
  return function(target: Function): void {
    if (Array.isArray(config)) {
      config = { dependencies: config };
    }

    register(target, config, true);
  };
}
