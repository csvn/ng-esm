import { Component } from 'ng-esm';


const template = `
  <md-card style="max-width: 500px;">
    <md-card-header>
      <md-card-header-text>
        <h3 class="md-title">Greeter</h3>
        <p class="md-subhead">Let's greet {{ vm.name }}</p>
      </md-card-header-text>
    </md-card-header>
    <md-divider></md-divider>
    <md-card-content class="md-display-2">
      {{ vm.greeting }} {{ vm.name }}!
    </md-card-content>
    <md-card-actions>
      <md-button class="md-primary" ng-click="vm.selectRandom()">Gimme another greeting!</md-button>
    </md-card-actions>
  </md-card>
`;


@Component({
  name: 'myGreeter',
  bindings: {
    name: '@',
    greetings: '<'
  },
  template
})
export class Greeter {
  name: string;
  selected: number;
  greetings: string[];

  $onInit() {
    this.selectRandom();
  }

  selectRandom() {
    if (this.size < 2) {
      return;
    }

    let original = this.selected;
    do {
      this.selected = Math.floor(this.size * Math.random());
    } while (original === this.selected);
  }

  get greeting() {
    return this.greetings[this.selected];
  }

  private get size() {
    return this.greetings.length;
  }
}
