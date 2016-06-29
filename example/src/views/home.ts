import uiRouter from 'angular-ui-router';
import { State } from 'ng-esm';

const template = `
  <h1>Welcome</h1>
  <p>Check the source code for this example for some
    tips on how to use <code>ng-esm</code>.</p>
`;

@State({
  name: 'home',
  url: '/',
  template,
  dependencies: [uiRouter]
})
export default class HomeView {}
