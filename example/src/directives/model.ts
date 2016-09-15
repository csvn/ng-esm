import ng from 'angular';
import { Directive } from 'ng-esm';

@Directive({
  restrict: 'A',
  require: { ngModel: 'ngModel' },
  scope: {},
  bindToController: true
})
export default class Model {
  ngModel: ng.INgModelController;

  $onInit() {
    this.ngModel.$formatters.push(v => console.log(`"model" updated; ${v}!`));
  }
}
