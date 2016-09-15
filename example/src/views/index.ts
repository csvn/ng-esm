import { NgModule } from 'ng-esm';

import homeView from './home';
import componentView from  './component';
import directivesView from  './directives';
import filtersView from  './filters';

@NgModule([homeView, componentView, directivesView, filtersView])
export default class Views {}
