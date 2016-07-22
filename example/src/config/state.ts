import { Config, OnInit } from 'ng-esm';
import { UrlRouterProvider } from 'angular-ui-router';


@Config()
class StateConfig implements OnInit {
  constructor(private $urlRouterProvider: UrlRouterProvider) {}

  $onInit() {
    this.$urlRouterProvider.when('', '/');
  }
}

export default StateConfig;
