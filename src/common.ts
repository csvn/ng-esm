export type Dependencies = (string | Function)[];

export interface OnInit {
  $onInit(): void;
}

export interface BaseConfig {
  name?: string;
  dependencies?: Dependencies;
}

export interface ComponentOptions extends BaseConfig, ng.IComponentOptions {
  controller?: Function;
}

export interface StateOptions extends BaseConfig, ng.ui.IState {
  name: string;
}
