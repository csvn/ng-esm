import 'core-js/es7/reflect';
import { Component, Input, Output } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { toCamel } from '../common/case';
import { createModule } from '../common/ng';


type PropMetaPair = [string, Object];

/** `@Downgrade()` Angular component to AngularJS directive */
export function Downgrade() {
  return downgrade;
};

/** `downgrade(component)` Angular component to AngularJS directive */
export function downgrade(component: any): void {
  const { selector, inputs, outputs } = extractMetadata(component);

  if (!selector) {
    throw new Error(`Angular component *selector* missing for @Downgrade()! (${component.name})`);
  }

  createModule(component)
    .directive(toCamel(selector), downgradeComponent({ component, inputs, outputs }));
}


function extractMetadata(component: any) {
  const r = Reflect as any;

  try {
    if (component.decorators) {
      const propPairs = Object.keys(component.propDecorators)
        .map(key => [key, component.propDecorators[key]]) as [string, any[]][];

      return {
        selector: component.decorators
          .filter((d: any) => d.type === Component)
          .map((d: any) => d.args[0].selector)[0] as string,
        inputs: propPairs
          .filter(([, decs]) => decs.filter(d => d.type === Input).length > 0)
          .map(([key]) => key),
        outputs: propPairs
          .filter(([, decs]) => decs.filter(d => d.type === Output).length > 0)
          .map(([key]) => key)
      };
    } else if (r.hasOwnMetadata('annotations', component)) {
      const propMetaMap = r.getOwnMetadata('propMetadata', component) || {};
      const propMetadata = Object.keys(propMetaMap).map<PropMetaPair>(k => [k, propMetaMap[k]]);

      return {
        selector: r.getOwnMetadata('annotations', component)[0].selector as string,
        inputs: decoratorProperties('Input', propMetadata),
        outputs: decoratorProperties('Output', propMetadata)
      };
    }
  } catch (err) {}

  throw new Error(`@Downgrade() must be used on Angular component! (${component.name})`);
}

function decoratorProperties(name: string, list: PropMetaPair[]) {
  return list.filter(decoratorFilter(name)).map<string>(([key]) => key);
}

function decoratorFilter(name: string) {
  return ([, options]: PropMetaPair) => options.toString() === `@${name}`;
}
