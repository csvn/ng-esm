import { BaseConfig, register } from '../ng';


export function Component(config: ComponentConfig) {
  return function(target: Function): void {
    let componentConfig: angular.IComponentOptions = config;

    componentConfig.controller = target;

    register(target, config).component(componentConfig);
  };
}


export interface ComponentConfig extends BaseConfig {
  controllerAs?: string;
  template?: string | Function;
  templateUrl?: string | Function;
  bindings?: {[binding: string]: string};
  transclude?: boolean | {[slot: string]: string};
  require?: {[controller: string]: string};
}
