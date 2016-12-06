import ng from 'angular';
import { Run } from 'ng-esm';
import uiRouter, { TransitionService } from 'angular-ui-router';


export interface RootScope extends ng.IRootScopeService {
  currentState: string;
}

@Run([uiRouter])
export class CommonRun {
  constructor($rootScope: RootScope, $transitions: TransitionService) {
    $transitions.onSuccess({}, t => {
      $rootScope.currentState = t.to().name as string;
    });
  }
}
