import uiRouter from 'angular-ui-router';
import { State, resolve } from 'ng-esm';

const template = `
  <h1>Components demo</h1>

  <md-divider></md-divider>

  <ticker></ticker>
`;

@State({
  name: 'components',
  url: '/components',
  template,
  dependencies: [uiRouter]
})
export default class ComponentView {
  @resolve
  static foo() {
    return 'bar';
  }
}
