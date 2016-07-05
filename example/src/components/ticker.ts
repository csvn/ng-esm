import { Component } from 'ng-esm';


const template = `
  <md-card style="max-width: 500px;">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title" style="margin: 0;">Ticker</h3>
        <p class="md-subhead" style="margin: 0;">Displays the current time</p>
      </md-card-header-text>
    </md-card-header>
    <md-divider></md-divider>
    <md-card-content class="md-display-1">
      {{ $ctrl.time | date:'longDate' }}
    </md-card-content>
    <md-card-content class="md-display-3">
      {{ $ctrl.time | date:'HH:mm:ss.sss' }}
    </md-card-content>
  </md-card>
`;


@Component({ template })
export default class Ticker {
  time: Number;
  promise: ng.IPromise<any>;

  constructor(private $interval: ng.IIntervalService) {}

  $onInit() {
    this.promise = this.$interval(() => {
      this.time = Date.now();
    }, 16);
  }

  $onDestroy() {
    this.$interval.cancel(this.promise);
  }
}
