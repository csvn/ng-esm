import uiRouter from 'angular-ui-router';
import { Component, State } from 'ng-esm';


// Combined @State/@Component class
@State({
  name: 'router.row.foo',
  view: 'main@router'
})
@Component({
  template: '<h2 style="color: steelblue;">FOO &ndash; MAIN</h2>'
})
class ViewRouterRowFoo {}


// @State with separate @Component
@Component({
  template: '<h2 style="color: firebrick;">BAR &ndash; MAIN</h2>'
})
class Bar {}

@State({
  name: 'router.row.bar',
  dependencies: [Bar],
  views: {
    'main@router': Bar
  }
})
class ViewRouterRowBar {}


// Multiple views has to have its own @State decorator
@Component({
  template: '<h2>ROW &ndash; LEFT</h2>'
})
class Left {}

@Component({
  template: '<h2>ROW &ndash; RIGHT</h2>'
})
class Right {}

@State({
  name: 'router.row',
  dependencies: [Left, Right, ViewRouterRowFoo, ViewRouterRowBar],
  views: {
    left: Left,
    right: Right
  }
})
class ViewRouterRow {}


@State({
  name: 'router',
  url: '/router',
  dependencies: [uiRouter, ViewRouterRow],
  template: `
    <h1>Router</h1>

    <md-divider></md-divider>

    <h4>Sub-states</h4>

    <a ui-sref="router">router</a>
    <a ui-sref="router.row">router.row</a>
    <a ui-sref="router.row.foo">router.row.foo</a>
    <a ui-sref="router.row.bar">router.row.bar</a>

    <p>Try out the links above to open components in different <code>ui-views</code></p>

    <md-divider></md-divider>

    <section layout="row" style="height: 160px;">
      <ui-view name="left" flex>Empty</ui-view>
      <md-divider></md-divider>
      <ui-view name="main" flex>Empty</ui-view>
      <md-divider></md-divider>
      <ui-view name="right" flex>Empty</ui-view>
    </section>`
})
export default class ViewRouter {}
