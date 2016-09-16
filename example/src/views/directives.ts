import ng from 'angular';
import { State } from 'ng-esm';

const template = `
  <h1>Directives demo</h1>

  <md-divider></md-divider>

  <div model ng-model="vm.test">
    This is a &lt;div&gt; with "model" directive! ({{ vm.test }})
  </div>
`;


@State({
  name: 'directives',
  url: '/directives',
  template
})
export default class DirectiveView {
  test = 1;

  constructor(private $interval: ng.IIntervalService) {}

  $onInit() {
    this.$interval(() => this.test++, 300);
  }
}
