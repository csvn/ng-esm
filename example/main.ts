import './vendor';
import './config';
import 'angular';
import { NgModule, getNgModule, getModuleIds } from 'ng-esm';

import components from './src/components';
import config from './src/config';
import directives from './src/directives';
import filters from './src/filters';
import services from './src/services';
import views from './src/views';


@NgModule([components, config, directives, filters, services, views])
class App {}

getNgModule(App)
  .value('global', 'Hello world!')
  .constant('constant', 'Const val!');

console.info('Registered angular modules: ', getModuleIds());
