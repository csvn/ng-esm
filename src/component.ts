import { createModule } from './ng';
import { toCamel } from './case';


export function Component(config: ComponentConfig) {
  return function(target: Function): void {
    let componentConfig: angular.IComponentOptions = config,
        name = toCamel(config.name ? config.name : target.name);

    componentConfig.controller = target;
    console.log('component-name:', name);

    createModule(target, config.dependencies)
      .component(name, componentConfig);
  };
}


interface ComponentConfig {
  name?: string;
  dependencies?: string[];
  controllerAs?: string;
  template?: string | Function;
  templateUrl?: string | Function;
  bindings?: {[binding: string]: string};
  transclude?: boolean | {[slot: string]: string};
  require?: string | string[] | {[controller: string]: string};
}
