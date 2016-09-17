import { NgModule } from 'ng-esm';

import homeView from './home';
import componentView from  './component';
import directivesView from  './directives';
import filtersView from  './filters';
import servicesView from  './services';

@NgModule([homeView, componentView, directivesView, filtersView, servicesView])
export default class Views {}
