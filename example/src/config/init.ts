import { Run, OnInit } from 'ng-esm';

export interface RootScope extends ng.IRootScopeService {
  currentState: string;
}

@Run()
class Init implements OnInit {
  constructor(private $rootScope: RootScope) {}

  $onInit() {
    let rs = this.$rootScope;

    rs.$on('$stateChangeSuccess', (e, to: ng.ui.IState) =>
      rs.currentState = to.name
    );

    rs.$on('$stateChangeError', (e, to, params, from: ng.ui.IState) =>
      rs.currentState = from.name
    );
  }
}

export default Init;
