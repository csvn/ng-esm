import * as ng from 'angular';
import { Directive } from 'ng-esm';


@Directive({
  restrict: 'A',
  require: { ngModel: 'ngModel' },
  scope: {},
  bindToController: {
    changeCount: '='
  }
})
export class ChangeCount {
  changeCount: number;
  ngModel: ng.INgModelController;

  $onInit() {
    this.changeCount = 0;
    this.ngModel.$viewChangeListeners.push(() => {
      this.changeCount++;
    });
  }
}
