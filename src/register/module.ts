import { name, createModule } from '../ng';
import { BaseConfig, Dependencies } from '../common';


export interface NgModuleSignature {
  (): Function;
  (config: BaseConfig): Function;
  (moduleId: string): Function;
  (moduleId: string, dependencies?: Dependencies): Function;
}

export const NgModule: NgModuleSignature = NgModuleDecorator;


function NgModuleDecorator(val: string | Dependencies | BaseConfig = {}, deps: Dependencies = []) {
  return function(target: Function): void {
    let config: BaseConfig;

    if (Array.isArray(val)) {
      config = { dependencies: val };
    } else if (typeof val === 'string') {
      config = { name: val, dependencies: deps };
    } else {
      config = val;
    }

    createModule(target, config.dependencies, name(target, config));
  };
}
