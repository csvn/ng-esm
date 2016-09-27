import { NgModule } from 'ng-esm';
import { CommonRun } from './common.run';
import { LoggerConfig } from './logger.config';
import { MaterialConfig } from './material.config';
import { StateConfig } from './state.config';


@NgModule([CommonRun, LoggerConfig, MaterialConfig, StateConfig])
export default class Common {}
