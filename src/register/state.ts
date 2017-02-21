import * as ng from 'angular';
import { StateProvider, Ng1ViewDeclaration, Ng1StateDeclaration } from 'angular-ui-router';
import { config, createModule } from '../common/ng';
import { BaseConfig } from '../common/interface';
import { componentName } from './component';
import { RESOLVES_SYMBOL } from './resolve';


const UI_ROUTER = 'ui.router';
const VIEW_PROPERTIES = Object.freeze([
  'bindings',
  'component',
  'componentProvider',
  'controller',
  'controllerAs',
  'controllerProvider',
  'resolveAs',
  'template',
  'templateProvider',
  'templateUrl'
]);

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

      const isComponent = !!componentName(target);
      if (isComponent) {
        options.component = componentName(target);
      } else if (hasTemplate(options)) {
        options.controller = target;
        options.controllerAs = options.controllerAs || config.ctrlAs;
      }

      migrateViewProperties(options);

      $stateProvider.state(options);
    }
    stateRunner.$inject = ['$stateProvider'];

    options.dependencies = options.dependencies || [];
    if (options.dependencies.indexOf(UI_ROUTER) < 0) {
      options.dependencies.push(UI_ROUTER);
    }

    createModule(target, options.dependencies)
      .config(stateRunner);
  };
}


function migrateViewProperties(options: StateOptions) {
  const views = options.views = options.views || {};
  const viewName = options.view || '$default';
  const viewProperties = spliceValues(options, ...VIEW_PROPERTIES);

  if (Object.keys(viewProperties).length) {
    views[viewName] = viewProperties;
  }

  const list = Object.keys(views)
    .map(key => ({ key, val: views[key] }))
    .filter(({ val }) => ng.isFunction(val)) as { key: string, val: Function }[];

  list.forEach(({ key, val }) => {
    const name = componentName(val);
    if (!name) {
      throw new Error(`Function at \`views.${key}\` must be decorated by @Component()`);
    } else {
      views[key] = name;
    }
  });
}

function spliceValues(source: any, ...keys: string[]) {
  let result: any = {};

  keys.forEach(k => {
    if (source[k]) result[k] = source[k];
    delete source[k];
  });

  return result;
}

function hasTemplate({ template, templateUrl, templateProvider }: StateOptions) {
  return !!(template || templateUrl || templateProvider);
}
