import * as ng from 'angular';
import { Component } from 'ng-esm';


const template = `
  <md-card style="max-width: 500px;">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title">Ticker</h3>
        <p class="md-subhead">Displays the current time</p>
      </md-card-header-text>
    </md-card-header>
    <md-divider></md-divider>
    <md-card-content class="md-title">
      {{ vm.time | date:'longDate' }}
    </md-card-content>
    <md-card-content class="md-display-3">
      {{ vm.time | date:'HH:mm:ss.sss' }}
    </md-card-content>
  </md-card>
`;


@Component({
  name: 'myTicker',
  template
})
export class Ticker {
  time: number;
  continue: boolean;

  constructor(private $scope: ng.IScope) {}

  $onInit() {
    this.continue = true;
    this.tick();
  }

  $onDestroy() {
    this.continue = false;
  }

  tick() {
    requestAnimationFrame(() => {
      if (!this.continue) return;

      this.$scope.$apply(() => {
        this.time = Date.now();
      });
      this.tick();
    });
  }
}
