import 'angular';
import { Module } from 'ng-esm';

import components from './src/components';
import config from './src/config';
import filters from './src/filters';
import services from './src/services';
import views from './src/views';


@Module([components, config, filters, services, views])
class App {}
