import { create } from './ng';


export function Component(config: ComponentConfig) {
  return function(target: Function) {
    console.log(target);
  };
}

interface ComponentConfig {
  name: string;
  controllerAs?: string;
  template?: string | Function;
  templateUrl?: string | Function;
  bindings?: {[binding: string]: string};
  transclude?: boolean | {[slot: string]: string};
  require?: string | string[] | {[controller: string]: string};
}
