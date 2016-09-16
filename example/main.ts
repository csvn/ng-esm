import './vendor';
import './config';
import ng from 'angular';
import { NgModule, getModuleIds, controllerAs } from 'ng-esm';

import components from './src/components';
import config from './src/config';
import directives from './src/directives';
import filters from './src/filters';
import services from './src/services';
import views from './src/views';


@NgModule([components, config, directives, filters, services, views])
class App {
  static register(module: ng.IModule) {
    module.value('global', 'Hello world!');
    module.constant('constant', 'Const val!');
  }
}

console.info('Registered angular modules: ', getModuleIds());
