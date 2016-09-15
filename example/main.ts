import 'angular';
import { NgModule } from 'ng-esm';

import components from './src/components';
import config from './src/config';
import directives from './src/directives';
import filters from './src/filters';
import services from './src/services';
import views from './src/views';


@NgModule([components, config, directives, filters, services, views])
class App {}
