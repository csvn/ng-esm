import ng from 'angular';
import ngMaterial from 'angular-material';
import { Config } from 'ng-esm';


@Config([ngMaterial])
export class MaterialConfig {
  constructor($mdThemingProvider: ng.material.IThemingProvider) {
    console.info('Configuring $mdTheme');

    $mdThemingProvider
      .theme('default')
      .primaryPalette('amber');
  }
}
