import { createModule } from './ng';


export function Filter(target: Function) {
  createModule(target)
      .filter(target.name, target);
}


interface ComponentConfig {
  name: string;
  dependencies?: string[];
  controllerAs?: string;
  template?: string | Function;
  templateUrl?: string | Function;
  bindings?: {[binding: string]: string};
  transclude?: boolean | {[slot: string]: string};
  require?: string | string[] | {[controller: string]: string};
}
