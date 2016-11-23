import * as ng from 'angular';
import { IInjectable } from 'angular-ui-router';

declare const angular: ng.IAngularStatic;


export const RESOLVES_SYMBOL = Symbol('resolves');
export type ResolveTarget = Function;

namespace ResolveTarget {}

/** Decorate static class method as a resolve property (prop name => resolve name) */
export function resolve(
  constructor: Function, name: string, descriptor: PropertyDescriptor
) {
  if (!angular.isFunction(descriptor.value)) {
    throw new Error('@resolve can only be used on static class methods');
  }
  const target: any = constructor;
  target[RESOLVES_SYMBOL] = target[RESOLVES_SYMBOL] || {};
  target[RESOLVES_SYMBOL][name] = descriptor.value;
}

/** Decorate a class (that is decorated with `@State()`) with it's resolve values */
export function Resolve(resolves: { [name: string]: IInjectable }) {
  // target requires type "any" due to symbol properties not being supported
  return function(constructor: Function): void {
    const target: any = constructor;
    target[RESOLVES_SYMBOL] = resolves;
  };
}
