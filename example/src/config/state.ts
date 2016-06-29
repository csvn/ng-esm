import { Config, OnInit } from 'ng-esm';


@Config([])
class StateConfig implements OnInit {
  constructor(private $urlRouterProvider: ng.ui.IUrlRouterProvider) {}

  $onInit() {
    this.$urlRouterProvider.when('', '/');
  }
}

export default StateConfig;
