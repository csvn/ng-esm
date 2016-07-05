import uiRouter from 'angular-ui-router';
import { State, Resolve } from 'ng-esm';

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
@Resolve({
  foo: () => 'fooo!',
  bar: () => Promise.resolve('baaar!')
})
export default class ComponentView {
  constructor(foo: string, bar: string) {
    console.log(foo, bar);
  }
}
