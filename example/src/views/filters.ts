import uiRouter from 'angular-ui-router';
import { State } from 'ng-esm';

const template = `
  <h1>Filters demo</h1>

  <md-divider></md-divider>

  <h3>Reverse filter</h3>
  <p>{{ vm.reverseStr }}</p>
  <p>{{ vm.reverseStr | reverse }}</p>

  <md-divider></md-divider>

  <h3>Lorem filter</h3>
  <pre>{{ null | lorem }}</pre>
`;

@State({
  name: 'filters',
  url: '/filters',
  template,
  controllerAs: 'vm',
  dependencies: [uiRouter]
})
export default class FiltersView {
  reverseStr = 'This string should be reversed!';
}