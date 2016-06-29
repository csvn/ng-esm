import { Module } from 'ng-esm';

import homeView from './home';
import componentView from  './component';
import filtersView from  './filters';

@Module([homeView, componentView, filtersView])
export default class Views {}
