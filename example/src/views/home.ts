import uiRouter from 'angular-ui-router';
import { State, Component, Resolve } from 'ng-esm';


const template = `
  <h1>Welcome to {{ vm.app }}</h1>
  <p>Check the source code for this example for some
    tips on how to use <code>ng-esm</code>.</p>
`;


@Resolve({
  app: (appName) => appName
})
@State({
  name: 'home',
  url: '/',
  dependencies: [uiRouter]
})
@Component({
  bindings: {
    app: '<'
  },
  template
})
export default class ViewHome {}
