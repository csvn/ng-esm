import ng from 'angular';
import { Ng1StateDeclaration } from 'angular-ui-router';

export type Dependencies = (string | Function)[];

export interface OnInit {
  $onInit(): void;
}

export interface BaseConfig {
  name?: string;
  dependencies?: Dependencies;
}

export interface ModuleOptions extends BaseConfig {
  values?: { [name: string]: any };
  constants?: { [name: string]: any };
}

export interface ComponentOptions extends BaseConfig, ng.IComponentOptions {}

export interface DirectiveOptions extends BaseConfig, ng.IDirective {}

export interface StateOptions extends BaseConfig, Ng1StateDeclaration {
  name: string;
}
