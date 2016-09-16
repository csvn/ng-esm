import uiRouter from 'angular-ui-router';
import { State, Resolve } from 'ng-esm';

const template = `
  <h1>Components demo</h1>

  <md-divider></md-divider>

  "{{ vm.foo }}" and "{{ vm.bar }}"

  <ticker></ticker>
`;


@Resolve({
  foo: () => 'fooo!',
  bar: () => Promise.resolve('baaar!')
})
@State({
  name: 'components',
  url: '/components',
  template,
  dependencies: [uiRouter]
})
export default class ComponentView {
  constructor(private foo: string, private bar: string) {}
}
