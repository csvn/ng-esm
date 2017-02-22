import 'core-js/es7/reflect';
import { downgradeComponent } from '@angular/upgrade/static';
import { toCamel } from '../common/case';
import { createModule } from '../common/ng';


/** Settings for `@Downgrade()` decorator */
export interface DowngradeOptions {
  name?: string;
  inputs?: string[];
  outputs?: string[];
}

/** Downgrade Angular component to AngularJS directive */
export function Downgrade({ name, inputs, outputs }: DowngradeOptions = {}) {
  return function(component: any): void {
    const r = Reflect as any;

    if (!r.hasMetadata('annotations', component)) {
      throw new Error(`@Downgrade() must be used on Angular component! (${component.name})`);
    }

    const selector = r.getMetadata('annotations', component)[0].selector;
    const directiveName = name || toCamel(selector);

    if (!directiveName) {
      throw new Error(`Angular component *selector* missing for @Downgrade()! (${component.name})`);
    }

    createModule(component)
      .directive(directiveName, downgradeComponent({ component, inputs, outputs }));
  };
};
