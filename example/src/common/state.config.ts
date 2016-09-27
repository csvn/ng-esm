import { Config } from 'ng-esm';
import { UrlRouterProvider } from 'angular-ui-router';


@Config()
export class StateConfig {
  constructor($urlRouterProvider: UrlRouterProvider) {
    $urlRouterProvider.when('', '/');
  }
}
