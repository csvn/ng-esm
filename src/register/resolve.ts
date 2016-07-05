export const RESOLVES_SYMBOL = Symbol('resolves');

// For static class members
export function resolve(
  constructor: any, name: string, descriptor: PropertyDescriptor
) {
  constructor[RESOLVES_SYMBOL] = constructor[RESOLVES_SYMBOL] || {};
  constructor[RESOLVES_SYMBOL][name] = descriptor.value;
}

export interface Resolver {
  (...injectables: any[]): any | Promise<any>;
}

// For class decoration
export function Resolve(resolves: { [name: string]: Resolver }) {
  return function(target: Function | any): void {
    target[RESOLVES_SYMBOL] = resolves;
  };
}
