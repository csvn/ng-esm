import { State } from 'ng-esm';
import { ChangeCount } from '../lib';


const template = `
  <h1>Directives demo</h1>

  <md-divider></md-divider>

  <md-input-container model ng-model="vm.test">
    <label>Some input</label>
    <input type="text" ng-model="vm.someInput" change-count="vm.changeCount" />
  </md-input-container>
  <pre style="margin-top: -18px;">Number of changes: {{ vm.changeCount }}</pre>
`;


@State({
  name: 'directives',
  url: '/directives',
  dependencies: [ChangeCount],
  template
})
export default class DirectiveView {
  someInput: string;
  changeCount: number;
}
