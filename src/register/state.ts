import { StateProvider, Ng1ViewDeclaration, Ng1StateDeclaration } from 'angular-ui-router';
import { config, createModule } from '../ng';
import { BaseConfig } from '../common';
import { componentName } from './component';
import { RESOLVES_SYMBOL } from './resolve';


const UI_ROUTER = 'ui.router';

/**
 * UI-router state declaration. Can be used with @Component() to use the new
 * v.1.0.0 syntax to user component instead of template+controller in UI-router.
 *
 * Can not be used with @Component if multiple views is required.
 *
 * [More information on ui-router docs](
 * https://ui-router.github.io/docs/latest/interfaces/ng1.ng1statedeclaration.html)
 */
export interface StateOptions extends BaseConfig, Ng1StateDeclaration {
  /** The ui-router state name */
  name: string;
  /**
   * Modify which ui-view to target (when used with @Component())
   *
   * `view: 'myView@foo.bar'`
   * The above will result in:
   * `views: { 'myView@foo.bar': 'myComponent' }`
   * When used with @Component() named 'myComponent'
   */
  view?: string;
  /**
   * Map with `Ng1ViewDeclaration`, `string` or `Function`.
   * `Function` can only be used if it is decorated with @Component().
   *
   * [More information on ui-router docs](
   * https://ui-router.github.io/docs/latest/interfaces/ng1.ng1viewdeclaration.html)
   */
  views?: {
    [key: string]: string | Function | Ng1ViewDeclaration;
  };
}

/** Decorate a class (controller) as a new state. TODO: support for simultaneous `@Component()` */
export function State(options: StateOptions) {
  return function(target: Function | any): void {
    function stateRunner($stateProvider: StateProvider): void {
      if (target[RESOLVES_SYMBOL]) {
        options.resolve = target[RESOLVES_SYMBOL];
      }

      decorateComponentOptions(options, target);
      $stateProvider.state(options.name, options);
    }
    stateRunner.$inject = ['$stateProvider'];

    options.controller = target;
    options.controllerAs = options.controllerAs || config.ctrlAs;
    options.dependencies = options.dependencies || [];
    if (options.dependencies.indexOf(UI_ROUTER) < 0) {
      options.dependencies.push(UI_ROUTER);
    }

    createModule(target, options.dependencies)
      .config(stateRunner);
  };
}


/**
 * If the @State() class also has @Component() decorator, add
 * this metadata to the options object (mutates the object).
 */
function decorateComponentOptions(options: StateOptions, target: Function) {
  // If the target is also a @Component(), set the component as a view
  if (componentName(target)) {
    let viewName = options.view || '$default';

    options.views = {
      [viewName]: {
        bindings: options.bindings,
        component: componentName(target),
        resolveAs: options.resolveAs
      }
    };
  } else {
    // Transform `Function` to `string` for any @Component() in the views declaration
    let views = options.views || {};
    Object.keys(views).forEach(k => {
      let val = views[k];
      views[k] = typeof val === 'function' ? componentName(val) : val;
    });
  }
}
