import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import { Config, OnInit } from 'ng-esm';


@Config([uiRouter, ngMaterial])
class MaterialConfig implements OnInit {
  constructor(private $mdThemingProvider: ng.material.IThemingProvider) {}

  $onInit() {
    console.log('Configuring $mdTheme');
    this.$mdThemingProvider
      .theme('default')
      .primaryPalette('amber');
  }
}

export default MaterialConfig;
