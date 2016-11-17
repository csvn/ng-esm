import * as ng from 'angular';

declare const angular: ng.IAngularStatic;


export const RESOLVES_SYMBOL = Symbol('resolves');

/** Decorate static class method as a resolve property (prop name => resolve name) */
export function resolve(
  constructor: any | Resolver, name: string, descriptor: PropertyDescriptor
) {
  if (!angular.isFunction(descriptor.value)) {
    throw new Error('@resolve can only be used on static class methods');
  }
  constructor[RESOLVES_SYMBOL] = constructor[RESOLVES_SYMBOL] || {};
  constructor[RESOLVES_SYMBOL][name] = descriptor.value;
}

/** Injectable function that will resolve to a value or a Promise */
export interface Resolver {
  (...injectables: any[]): any | Promise<any>;
}

/** Decorate a class (that is decorated with `@State()`) with it's resolve values */
export function Resolve(resolves: { [name: string]: Resolver }) {
  // target requires type "any" due to symbol properties not being supported
  return function(target: Function | any): void {
    target[RESOLVES_SYMBOL] = resolves;
  };
}
