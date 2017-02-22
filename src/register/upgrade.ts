import 'core-js/es7/reflect';
import { downgradeComponent } from '@angular/upgrade/static';
import { toCamel } from '../common/case';
import { createModule } from '../common/ng';


type PropMetaPair = [string, Object];

/** Downgrade Angular component to AngularJS directive */
export function Downgrade() {
  return function(component: any): void {
    const r = Reflect as any;

    if (!r.hasOwnMetadata('annotations', component)) {
      throw new Error(`@Downgrade() must be used on Angular component! (${component.name})`);
    }

    const selector = r.getOwnMetadata('annotations', component)[0].selector;

    if (!selector) {
      throw new Error(`Angular component *selector* missing for @Downgrade()! (${component.name})`);
    }

    const propMetaMap = r.getOwnMetadata('propMetadata', component) || {};
    const propMetadata = Object.keys(propMetaMap).map<PropMetaPair>(k => [k, propMetaMap[k]]);

    const inputs = decoratorProperties('Input', propMetadata);
    const outputs = decoratorProperties('Output', propMetadata);

    createModule(component)
      .directive(toCamel(selector), downgradeComponent({ component, inputs, outputs }));
  };
};


function decoratorProperties(name: string, list: PropMetaPair[]) {
  return list.filter(decoratorFilter(name)).map<string>(([key]) => key);
}

function decoratorFilter(name: string) {
  return ([, options]: PropMetaPair) => options.toString() === `@${name}`;
}
