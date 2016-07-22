import { Run, OnInit } from 'ng-esm';
import { TransitionService } from 'angular-ui-router';

export interface RootScope extends ng.IRootScopeService {
  currentState: string;
}

@Run()
class Init implements OnInit {
  constructor(
    private $rootScope: RootScope,
    private $transitions: TransitionService
  ) {}

  $onInit() {
    this.$transitions.onSuccess({}, t => {
      this.$rootScope.currentState = t.$to().name;
    });
  }
}

export default Init;
