import { NgModule } from 'ng-esm';

import home from './home';
import component from  './component';
import directives from  './directives';
import filters from  './filters';
import services from  './services';
import router from  './router';

@NgModule([home, component, directives, filters, services, router])
export default class Views {}
