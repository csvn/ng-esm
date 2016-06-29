import { Module } from 'ng-esm';

import init from './init';
import material from './material';
import state from './state';


@Module([init, material, state])
export default class Config {}
