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

export interface ComponentOptions extends BaseConfig, ng.IComponentOptions {}

export interface StateOptions extends BaseConfig, Ng1StateDeclaration {
  name: string;
}
