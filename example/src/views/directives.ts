import { State } from 'ng-esm';

const template = `
  <h1>Directives demo</h1>

  <md-divider></md-divider>

  <div>This is a &lt;div&gt; with * directive!</div>
`;


@State({
  name: 'directives',
  url: '/directives',
  template
})
export default class DirectiveView {
  constructor() {}
}
