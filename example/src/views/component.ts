import { State, Component, resolve } from 'ng-esm';
import { Downgrade } from 'ng-esm/dist/upgrade';
import { AngularComponent, AngularAltComponent, Greeter, Ticker } from '../lib';


const template = `
  <h1>Components</h1>

  <md-divider></md-divider>

  <my-angular [major]="2" [minor]="4" [patch]="8" (foo)="vm.log('my-angular', $event)">
  </my-angular>

  <my-angular-alt [major]="4" [minor]="0" [patch]="0" (foo)="vm.log('my-angular-alt', $event)">
  </my-angular-alt>

  <my-greeter name="John" greetings="vm.greetings"></my-greeter>

  <my-ticker></my-ticker>
`;

Downgrade()(AngularAltComponent);


@State({
  name: 'components',
  url: '/components',
  bindings: {},
  dependencies: [AngularComponent, AngularAltComponent, Greeter, Ticker]
})
@Component({
  bindings: {
    greetings: '<'
  },
  template
})
export default class ViewComponent {
  greetings: string;

  log(type: string, ...msgs: string[]) {
    console.log(type, ...msgs);
  }

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
