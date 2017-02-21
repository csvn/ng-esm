import uiRouter from 'angular-ui-router';
import { State, resolve } from 'ng-esm';
import { Lorem, Reverse } from '../lib';


const template = `
  <h1>Filters</h1>

  <md-divider></md-divider>

  <h3>Reverse filter</h3>
  <p>{{ vm.reverseText }}</p>
  <p>{{ vm.reverseText | reverse }}</p>

  <md-divider></md-divider>

  <h3>Lorem filter</h3>
  <pre>{{ null | lorem }}</pre>
`;


@State({
  name: 'filters',
  url: '/filters',
  dependencies: [uiRouter, Lorem, Reverse],
  template
})
export default class ViewFilters {
  constructor(public reverseText: string) {}

  @resolve
  static reverseText() {
    return 'This string should be reversed!';
  }
}
