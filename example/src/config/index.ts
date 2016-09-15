import { NgModule } from 'ng-esm';

import init from './init';
import material from './material';
import state from './state';


@NgModule([init, material, state])
export default class Config {}
