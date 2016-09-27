import uiRouter from 'angular-ui-router';
import { State } from 'ng-esm';
import { Color, Null, NullFactory, Logger, LoggerProvider } from '../lib';


const template = `
  <h1>Services demo</h1>

  <md-divider></md-divider>

  <h3>Color service test</h3>
  <div layout="row">
    <md-input-container>
      <label>Hex => Rgb => Hex</label>
      <input type="text" ng-model="vm.hexModel" />
    </md-input-container>
    <pre flex>{{ vm.c.rgb(vm.hexModel) }}  =>  {{ vm.c.hex(vm.c.rgb(vm.hexModel)) }}</pre>
  </div>

  <div layout="row">
    <md-input-container>
      <label>Rgb => Hex => Rgb</label>
      <input type="text" ng-model="vm.rgbModel" />
    </md-input-container>
    <pre flex>{{ vm.c.hex(vm.rgbModel) }}  =>  {{ vm.c.rgb(vm.c.hex(vm.rgbModel)) }}</pre>
  </div>

  <h3>Null service</h3>
  <pre>null === {{ vm.Null }} // {{ 'null' === vm.Null }}</pre>
`;


@State({
  name: 'services',
  url: '/services',
  dependencies: [uiRouter, Color, NullFactory, LoggerProvider],
  template
})
export default class ServicesView {
  c: Color;
  hexModel = '#0077ff';
  rgbModel = 'rgb(255, 120, 0)';

  constructor(Color: Color, private Null: Null, private Logger: Logger) {
    this.c = Color;
  }

  $onInit() {
    this.Logger('Null service:', this.Null);
    this.Logger('Color service:', this.c);
  }
}
