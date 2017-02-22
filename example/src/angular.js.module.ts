import { NgModule, getModuleIds } from 'ng-esm';
import common from './common';
import views from './views';


@NgModule({
  dependencies: [common, views],
  values: { appName: 'ng-esm' },
  constants: { constant: 'Const val!' }
})
export class App {}

console.info('Registered AngularJS modules: ', getModuleIds());
