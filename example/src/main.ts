import './config';
import { NgModule, getModuleIds } from 'ng-esm';

import common from './common';
import views from './views';


@NgModule({
  dependencies: [common, views],
  values: { appName: 'ng-esm' },
  constants: { constant: 'Const val!' }
})
class App {}

console.info('Registered angular modules: ', getModuleIds());
