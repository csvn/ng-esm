import './vendor';
import './config';
import 'angular';
import { NgModule, getModuleIds } from 'ng-esm';

import components from './src/components';
import config from './src/config';
import directives from './src/directives';
import filters from './src/filters';
import services from './src/services';
import views from './src/views';


@NgModule({
  dependencies: [components, config, directives, filters, services, views],
  values: { global: 'Hello world!' },
  constants: { constant: 'Const val!' }
})
class App {}

console.info('Registered angular modules: ', getModuleIds());
