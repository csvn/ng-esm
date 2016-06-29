export type Dependencies = (string | Function)[];

export interface OnInit {
  $onInit(): void;
}

export interface BaseConfig {
  name?: string;
  dependencies?: Dependencies;
}

export interface ComponentOptions extends BaseConfig {
  controller?: Function;
  controllerAs?: string;
  template?: string | Function | (string | Function)[];
  templateUrl?: string | Function | (string | Function)[];
  bindings?: {[binding: string]: string};
  transclude?: boolean | string | {[slot: string]: string};
  require?: {[controller: string]: string};
}
