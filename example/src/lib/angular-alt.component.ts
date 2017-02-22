import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';


const template = `
  <style>
  :host {
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    flex-direction: column;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2),
      0 1px 1px 0 rgba(0, 0, 0, .14),
      0 2px 1px -1px rgba(0, 0, 0, .12);
    margin: 8px;
    padding: 16px;
    width: 500px;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 3px;
  }
  p {
    margin: 0;
  }
  p > small {
    color: rgba(0, 0, 0, .54);
    font-size: 14px;
  }
  hr {
    border: 0;
    border-top: solid 1px rgba(0, 0, 0, .12);
    margin: 16px -16px;
  }
  </style>
  <h2>Angular Alt</h2>
  <p><small>Downgraded Angular => AngularJS but not in this component!</small></p>
  <hr />
  <p>Woot woot! This is a Angular ({{ version }}) component!</p>
`;


@Component({
  selector: 'my-angular-alt',
  template
})
export class AngularAltComponent {
  @Input()
  major: number;
  @Input()
  minor: number;
  @Input()
  patch: number;

  @Output()
  foo = new EventEmitter();

  @HostListener('click', ['$event.type'])
  onClick(type: string) {
    this.foo.emit(`"${type}" was fired!`);
  }

  get version() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}
