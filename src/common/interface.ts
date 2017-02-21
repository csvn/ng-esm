/** If a dependency is a function, it must be decorated with `ng-esm` */
export type Dependencies = (string | Function)[];

export interface OnInit {
  /** This method will be executed after the class has been instantiated */
  $onInit?(): void;
}

/** Will be injected when instantiated */
export interface FactoryCreator {
  $get(...injectables: any[]): any;
}

/** Standard config for many decorators */
export interface BaseConfig {
  /** Name of the registered component/service/etc */
  name?: string;
  /** Dependencies require for this component/service/etc */
  dependencies?: Dependencies;
}
