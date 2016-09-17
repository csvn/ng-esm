import uiRouter from 'angular-ui-router';
import { State } from 'ng-esm';
import { Color } from '../services/color';

const template = `
  <h1>Services demo</h1>

  <md-divider></md-divider>

  <h3>Color service test</h3>
  <div layout="row">
    <md-input-container>
      <label>Hex => Rgb => Hex</label>
      <input type="text" ng-model="vm.hexModel" />
    </md-input-container>
    <pre flex>{{ vm.Color.rgb(vm.hexModel) }}  =>  {{ vm.Color.hex(vm.Color.rgb(vm.hexModel)) }}</pre>
  </div>

  <div layout="row">
    <md-input-container>
      <label>Rgb => Hex => Rgb</label>
      <input type="text" ng-model="vm.rgbModel" />
    </md-input-container>
    <pre flex>{{ vm.Color.hex(vm.rgbModel) }}  =>  {{ vm.Color.rgb(vm.Color.hex(vm.rgbModel)) }}</pre>
  </div>

  <h3>Null service</h3>
  <pre>null === {{ vm.Null }} // {{ 'null' === vm.Null }}</pre>
`;

@State({
  name: 'services',
  url: '/services',
  template,
  dependencies: [uiRouter]
})
export default class ServicesView {
  hexModel = '#0077ff';
  rgbModel = 'rgb(255, 120, 0)';

  constructor(private Color: Color, private Null: string, private Logger: Function) {}

  $onInit() {
    this.Logger('Services view, woot!');
  }
}
