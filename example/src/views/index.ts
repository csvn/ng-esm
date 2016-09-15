import { NgModule } from 'ng-esm';

import homeView from './home';
import componentView from  './component';
import filtersView from  './filters';

@NgModule([homeView, componentView, filtersView])
export default class Views {}
