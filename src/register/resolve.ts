export const RESOLVES_SYMBOL = Symbol('resolves');

// For static class members
export function resolve(
  constructor: any, name: string, descriptor: PropertyDescriptor
) {
  constructor[RESOLVES_SYMBOL] = constructor[RESOLVES_SYMBOL] || {};
  constructor[RESOLVES_SYMBOL][name] = descriptor.value;
}

interface Resolver {
  (...injectables: any[]): any | Promise<any>;
}

// For class decoration, needs to be before @State decorator
export function Resolve(resolves: { [name: string]: Resolver }) {
  return function(target: Function | any): void {
    target[RESOLVES_SYMBOL] = resolves;
  };
}
