import { State, Component, resolve } from 'ng-esm';
import { AngularComponent, Greeter, Ticker } from '../lib';


const template = `
  <h1>Components</h1>

  <md-divider></md-divider>

  <my-angular [major]="2" [minor]="4" [patch]="8"></my-angular>

  <my-greeter name="John" greetings="vm.greetings"></my-greeter>

  <my-ticker></my-ticker>
`;


@State({
  name: 'components',
  url: '/components',
  bindings: {},
  dependencies: [AngularComponent, Greeter, Ticker]
})
@Component({
  bindings: {
    greetings: '<'
  },
  template
})
export default class ViewComponent {
  greetings: string;

  @resolve
  static greetings($log: ng.ILogService) {
    return new Promise(resolve => {
      let timestamp = Date.now();
      setTimeout(() => {
        $log.info(`Resolved greetings in ${Date.now() - timestamp}ms`);
        resolve(['Yo', 'Sup', 'Hello', 'Greetings', 'Hejsan', 'Aloha']);
      }, Math.floor(Math.random() * 400));
    });
  }
}
