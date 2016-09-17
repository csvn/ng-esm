import { NgModule } from 'ng-esm';
import { Color } from './color';
import { Null } from './null';
import { LoggerConfig } from './logger';

@NgModule([Color, Null, LoggerConfig])
export default class Services {}
