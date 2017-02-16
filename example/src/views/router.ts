import { Component, State, Resolve } from 'ng-esm';

const template = createTemplate();

// Combined @State/@Component class
@Resolve({
  color: () => 'steelblue'
})
@State({
  name: 'router.row.foo',
  url: '/foo',
  view: 'main@router'
})
@Component({ bindings: { color: '<' }, template })
class ViewRouterRowFoo {
  name = 'FOO';
  view = 'MAIN';
}


// @State with separate @Component
@Component({ bindings: { color: '<' }, template })
class Bar {
  name = 'BAR';
  view = 'MAIN';
}

@Resolve({
  color: () => 'firebrick'
})
@State({
  name: 'router.row.bar',
  url: '/bar',
  dependencies: [Bar],
  views: {
    'main@router': Bar
  }
})
class ViewRouterRowBar {}

// @State with separate controller/template
@Resolve({
  color: () => 'goldenrod'
})
@State({
  name: 'router.row.baz',
  url: '/baz',
  view: 'main@router',
  controllerAs: 'foo',
  resolveAs: '$rao',
  template: createTemplate('foo')
})
class ViewRouterRowBaz {
  $rao: { color: string };
  color: string;
  name = 'BAZ';
  view = 'MAIN';

  $onInit() {
    this.color = this.$rao.color;
  }
}


// Multiple views has to have its own @State decorator
@Component({ template })
class Left {
  color = 'black';
  name = 'ROW';
  view = 'RIGHT';
}

@Component({ template })
class Right {
  color = 'black';
  name = 'ROW';
  view = 'RIGHT';
}

@State({
  name: 'router.row',
  url: '/row',
  dependencies: [Left, Right],
  views: {
    left: Left,
    right: Right
  }
})
class ViewRouterRow {}


@State({
  name: 'router',
  url: '/router',
  dependencies: [ViewRouterRow, ViewRouterRowFoo, ViewRouterRowBar, ViewRouterRowBaz],
  template: `
    <h1>Router</h1>

    <md-divider></md-divider>

    <h4>Sub-states</h4>

    <a ui-sref="router">router</a>
    <a ui-sref="router.row">router.row</a>
    <a ui-sref="router.row.foo">router.row.foo</a>
    <a ui-sref="router.row.bar">router.row.bar</a>
    <a ui-sref="router.row.baz">router.row.baz</a>

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
export default class ViewRouter {
  constructor($stateRegistry) {
    console.log($stateRegistry);
  }
}


function createTemplate(ctrl = 'vm') {
  return `<h2 ng-style="{ color: ${ctrl}.color }">
    {{ ${ctrl}.name }} &ndash; {{ ${ctrl}.view }}
  </h2>`;
}
